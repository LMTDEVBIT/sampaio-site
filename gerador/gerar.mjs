// Gera as páginas locais da Sampaio's em public/ (HTML estático, servido pelo Cloudflare sem build).
//   node gerador/gerar.mjs
// Cabeçalho, rodapé, GTM e botões flutuantes vêm do public/index.html, então mudanças lá valem para todas as páginas
// na próxima geração. As páginas saem como public/<slug>.html e o Cloudflare serve em /<slug>.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locais, localPorSlug, emLocal, ondeFica, locaisProximos } from "./locais.mjs";
import { SERVICOS, SERVICOS_SIMPLES, diagnosticos, introServico, fraseVizinhos, introDesentupidora, faqLocal, porDestaque } from "./textos.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(RAIZ, "public");
const SITE = "https://desentupidorasampaios.com.br";
const WA = "https://wa.me/558005916275?text=";

const indexHtml = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf8");
const entre = (ini, fim) => {
  const i = indexHtml.indexOf(ini);
  const j = indexHtml.indexOf(fim, i);
  if (i < 0 || j < 0) throw new Error(`Trecho não encontrado no index.html: ${ini}`);
  return indexHtml.slice(i, j + fim.length);
};
// Links do index apontam para âncoras e arquivos relativos; nas páginas internas viram absolutos
const absolutos = (html) => html.replace(/href="#/g, 'href="/#').replace(/src="(?!https?:|\/)/g, 'src="/');

const GTM = entre("<!-- Google Tag Manager -->", "<!-- End Google Tag Manager -->");
const GTM_NOSCRIPT = entre("<!-- Google Tag Manager (noscript) -->", "<!-- End Google Tag Manager (noscript) -->");
const ESTILO_FAQ = entre("<style>", "</style>");
const HEADER = absolutos(entre("<!-- HEADER -->", "</header>"));
const FOOTER = absolutos(entre("<!-- FOOTER -->", "</footer>"));
const FLOATING_BRUTO = entre("<!-- FLOATING -->", '<script src="script.js">');
const FLOATING_LIMPO = FLOATING_BRUTO.slice(0, FLOATING_BRUTO.lastIndexOf("</div>") + 6);

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const wa = (msg) => WA + encodeURIComponent(`Olá! Vim pelo site Desentupidora Sampaio's ${msg}`);
const ICONE_WA = indexHtml.match(/<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17\.472[^"]*"\/><\/svg>/)[0];
const ICONE_TEL = indexHtml.match(/<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path d="M22 16\.92[^"]*"\/><\/svg>/)[0];

const botoes = (msg) => `
      <div class="hero-btns">
        <a href="${esc(wa(msg))}" target="_blank" rel="noopener noreferrer" class="btn-wpp-lg">${ICONE_WA} Chamar no WhatsApp</a>
        <a href="tel:08005916275" class="btn-tel-lg">${ICONE_TEL} 0800 591 6275</a>
      </div>`;

const pagina = ({ slug, titulo, descricao, h1, subtitulo, migalhas, corpo, jsonLd, msgWa }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descricao)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${SITE}/${slug}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE}/${slug}" />
  <meta property="og:title" content="${esc(titulo)}" />
  <meta property="og:description" content="${esc(descricao)}" />
  <meta property="og:image" content="${SITE}/logo.png" />

  ${GTM}

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/style.css" />
  <link rel="stylesheet" href="/local.css" />
  ${ESTILO_FAQ}
</head>
<body>
${GTM_NOSCRIPT}

  ${HEADER}

  <section class="local-hero">
    <div class="container">
      <nav class="local-migalhas">${migalhas.map(([t, u]) => (u ? `<a href="${u}">${esc(t)}</a>` : `<span>${esc(t)}</span>`)).join(" › ")}</nav>
      <h1>${h1}</h1>
      <p class="local-sub">${esc(subtitulo)}</p>
      ${botoes(msgWa)}
    </div>
  </section>

${corpo}

  <section class="section-final">
    <div class="container final-inner">
      <h2>Fale com a Sampaio's agora</h2>
      <p>Atendimento 24 horas, visita sem custo e orçamento antes de começar.</p>
      ${botoes(msgWa)}
    </div>
  </section>

  ${FOOTER}

  ${FLOATING_LIMPO}

  <script src="/script.js"></script>
</body>
</html>
`;

const faqHtml = (itens) => `
      <div class="faq-list">
${itens
  .map(
    (f) => `        <div class="faq-item">
          <button class="faq-q" onclick="this.parentElement.classList.toggle('open')">${esc(f.q)}<span class="faq-icon">+</span></button>
          <div class="faq-a"><p>${esc(f.a)}</p></div>
        </div>`,
  )
  .join("\n")}
      </div>`;

const chips = (links) =>
  `<div class="local-chips">${links.map(([t, u]) => `<a href="${u}">${esc(t)}</a>`).join("")}</div>`;

const servicoJsonLd = (nome, slug, area) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: nome,
  serviceType: nome,
  url: `${SITE}/${slug}`,
  ...(area ? { areaServed: area } : {}),
  provider: {
    "@type": "LocalBusiness",
    name: "Desentupidora Sampaio's",
    url: SITE,
    telephone: "08005916275",
    email: "desentupidorasampaios@gmail.com",
    openingHours: "Mo-Su 00:00-23:59",
  },
});
const areaDe = (l) => (l.tipo === "cidade" ? { "@type": "City", name: l.nome } : { "@type": "Place", name: `${l.nome}, São Paulo - SP` });
const sufixoSP = (l) => (l.tipo === "cidade" ? "" : " SP");

const porZona = () => {
  const m = new Map();
  for (const l of locais) m.set(l.zona, [...(m.get(l.zona) ?? []), l]);
  return [...m.entries()];
};

const paginas = [];

// ── <serviço>-<local> ──
for (const [chave, s] of Object.entries(SERVICOS)) {
  for (const l of locais) {
    const slug = `${s.prefixo}-${l.slug}`;
    const outros = Object.values(SERVICOS).filter((o) => o !== s);
    const corpo = `
  <section class="section">
    <div class="container local-texto">
      <p class="local-lead">${esc(introServico(chave, l))}</p>
      <h2>O que costuma acontecer ${esc(emLocal(l))}</h2>
      <div class="local-diag">
${diagnosticos(chave, l)
  .map(
    (d) => `        <div class="local-diag-item">
          <div><strong>O sinal</strong><p>${esc(d.sinal)}</p></div>
          <div><strong>A causa provável</strong><p>${esc(d.causa)}</p></div>
          <div><strong>Como resolvemos</strong><p>${esc(d.solucao)}</p></div>
        </div>`,
  )
  .join("\n")}
      </div>
      <h2>Como é o atendimento</h2>
      <ol class="local-passos">${s.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
      <p>${esc(fraseVizinhos(l))}</p>
      <h2>Perguntas frequentes</h2>
      ${faqHtml(faqLocal(l))}
      <h2>${esc(s.nome)} em regiões próximas</h2>
      ${chips(locaisProximos(l, 10).map((o) => [o.nome, `/${s.prefixo}-${o.slug}`]))}
      <h2>Outros serviços ${esc(emLocal(l))}</h2>
      ${chips([[`Desentupidora ${emLocal(l)}`, `/desentupidora-${l.slug}`], ...outros.map((o) => [o.nome, `/${o.prefixo}-${l.slug}`])])}
    </div>
  </section>`;
    paginas.push({
      slug,
      prioridade: "0.7",
      html: pagina({
        slug,
        titulo: `${s.nome} ${emLocal(l)}${sufixoSP(l)} | Sampaio's 24h`,
        descricao: `${introServico(chave, l)}`.slice(0, 158),
        h1: `${esc(s.nome)} <span>${esc(emLocal(l))}</span>`,
        subtitulo: `Atendimento 24h ${ondeFica(l)} · visita sem custo · garantia no serviço`,
        migalhas: [["Início", "/"], [s.nome, `/${s.slugPagina}`], [l.nome]],
        corpo,
        jsonLd: servicoJsonLd(`${s.nome} ${emLocal(l)}`, slug, areaDe(l)),
        msgWa: `e preciso de ${s.keyword} ${emLocal(l)}.`,
      }),
    });
  }
}

// ── desentupidora-<local> ──
const SINAIS_GERAIS = {
  predios: "Esgoto voltando nos apartamentos de baixo",
  casas: "Caixa de inspeção do quintal transbordando",
  comercio: "Banheiro de loja ou escritório interditado",
  gastronomia: "Gordura entupindo a cozinha de bar ou restaurante",
  industria: "Redes longas e caixas grandes de galpões",
  antigo: "Entupimento que volta em tubulação antiga",
  fossa: "Fossa séptica cheia em imóvel sem rede de esgoto",
  varzea: "Esgoto subindo pelos ralos em dia de chuva forte",
};
for (const l of locais) {
  const slug = `desentupidora-${l.slug}`;
  const corpo = `
  <section class="section">
    <div class="container local-texto">
      <p class="local-lead">${esc(introDesentupidora(l))}</p>
      <h2>Chamados mais comuns ${esc(emLocal(l))}</h2>
      <ul class="local-lista">${porDestaque(l).map((p) => `<li>${esc(SINAIS_GERAIS[p])}</li>`).join("")}</ul>
      <h2>Serviços ${esc(emLocal(l))}</h2>
      <div class="local-servicos">
${Object.values(SERVICOS)
  .map((s) => `        <a href="/${s.prefixo}-${l.slug}"><strong>${esc(s.nome)}</strong><span>${esc(s.resumo)}</span></a>`)
  .join("\n")}
      </div>
      <p>${esc(fraseVizinhos(l))}</p>
      <h2>Perguntas frequentes</h2>
      ${faqHtml(faqLocal(l))}
      <h2>Regiões próximas</h2>
      ${chips(locaisProximos(l, 12).map((o) => [o.nome, `/desentupidora-${o.slug}`]))}
    </div>
  </section>`;
  paginas.push({
    slug,
    prioridade: "0.8",
    html: pagina({
      slug,
      titulo: `Desentupidora ${emLocal(l)}${sufixoSP(l)} 24h | Sampaio's`,
      descricao: introDesentupidora(l).slice(0, 158),
      h1: `Desentupidora <span>${esc(emLocal(l))}</span>`,
      subtitulo: `Atendimento 24h ${ondeFica(l)} para casas, condomínios e empresas`,
      migalhas: [["Início", "/"], ["Regiões atendidas", "/regioes-atendidas"], [l.nome]],
      corpo,
      jsonLd: servicoJsonLd(`Desentupidora ${emLocal(l)}`, slug, areaDe(l)),
      msgWa: `e preciso de desentupidora ${emLocal(l)}.`,
    }),
  });
}

// ── páginas de serviço ──
const listaRegioes = (prefixo) =>
  porZona()
    .map(([zona, ls]) => `<h3>${esc(zona)}</h3>${chips(ls.map((l) => [l.nome, `/${prefixo}-${l.slug}`]))}`)
    .join("\n      ");

for (const [chave, s] of Object.entries(SERVICOS)) {
  const sinais = Object.values(s.perfis).slice(0, 6);
  const corpo = `
  <section class="section">
    <div class="container local-texto">
      <p class="local-lead">${esc(s.resumo)} Atendimento 24 horas em São Paulo, Grande SP e interior, com visita sem custo.</p>
      <h2>Quando chamar</h2>
      <div class="local-diag">
${sinais
  .map(
    (d) => `        <div class="local-diag-item">
          <div><strong>O sinal</strong><p>${esc(d.sinal)}</p></div>
          <div><strong>A causa provável</strong><p>${esc(d.causa)}</p></div>
          <div><strong>Como resolvemos</strong><p>${esc(d.solucao)}</p></div>
        </div>`,
  )
  .join("\n")}
      </div>
      <h2>Como é o atendimento</h2>
      <ol class="local-passos">${s.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
      <h2>${esc(s.nome)} por região</h2>
      ${listaRegioes(s.prefixo)}
    </div>
  </section>`;
  paginas.push({
    slug: s.slugPagina,
    prioridade: "0.9",
    html: pagina({
      slug: s.slugPagina,
      titulo: `${s.nome} 24h em SP e Grande SP | Sampaio's`,
      descricao: `${s.resumo} Atendimento 24h, visita sem custo e garantia.`.slice(0, 158),
      h1: `${esc(s.nome)} <span>24 horas</span>`,
      subtitulo: "São Paulo, Grande SP e interior · visita sem custo · garantia no serviço",
      migalhas: [["Início", "/"], [s.nome]],
      corpo,
      jsonLd: servicoJsonLd(s.nome, s.slugPagina),
      msgWa: `e preciso de ${s.keyword}.`,
    }),
  });
}
for (const s of SERVICOS_SIMPLES) {
  const corpo = `
  <section class="section">
    <div class="container local-texto">
      <p class="local-lead">${esc(s.resumo)} Atendimento 24 horas, visita sem custo e orçamento antes de começar.</p>
      <h2>Atendemos em toda a região</h2>
      ${porZona()
        .map(([zona, ls]) => `<h3>${esc(zona)}</h3>${chips(ls.map((l) => [l.nome, `/desentupidora-${l.slug}`]))}`)
        .join("\n      ")}
    </div>
  </section>`;
  paginas.push({
    slug: s.slug,
    prioridade: s.destaque === false ? "0.5" : "0.9",
    html: pagina({
      slug: s.slug,
      titulo: `${s.nome} 24h em SP | Sampaio's`,
      descricao: `${s.resumo} Atendimento 24h em São Paulo e Grande SP.`,
      h1: `${esc(s.nome)} <span>24 horas</span>`,
      subtitulo: "São Paulo, Grande SP e interior · visita sem custo",
      migalhas: [["Início", "/"], [s.nome]],
      corpo,
      jsonLd: servicoJsonLd(s.nome, s.slug),
      msgWa: `e preciso de ${s.nome.toLowerCase()}.`,
    }),
  });
}

// ── regiões atendidas ──
paginas.push({
  slug: "regioes-atendidas",
  prioridade: "0.8",
  html: pagina({
    slug: "regioes-atendidas",
    titulo: "Regiões Atendidas | Desentupidora Sampaio's 24h",
    descricao: "Bairros de São Paulo e cidades da Grande SP e do interior atendidos pela Desentupidora Sampaio's, 24 horas por dia.",
    h1: "Regiões <span>atendidas</span>",
    subtitulo: "Todos os distritos de São Paulo, Grande SP e interior",
    migalhas: [["Início", "/"], ["Regiões atendidas"]],
    corpo: `
  <section class="section">
    <div class="container local-texto">
      ${porZona()
        .map(([zona, ls]) => `<h2>${esc(zona)}</h2>${chips(ls.map((l) => [l.nome, `/desentupidora-${l.slug}`]))}`)
        .join("\n      ")}
    </div>
  </section>`,
    jsonLd: servicoJsonLd("Desentupidora", "regioes-atendidas"),
    msgWa: "e quero saber se vocês atendem a minha região.",
  }),
});

// ── grava ──
const slugsAtuais = new Set(paginas.map((p) => `${p.slug}.html`));
// Remove páginas geradas antes que não existem mais (só arquivos .html marcados como gerados)
for (const f of fs.readdirSync(PUBLIC)) {
  if (f.endsWith(".html") && f !== "index.html" && !slugsAtuais.has(f)) {
    if (fs.readFileSync(path.join(PUBLIC, f), "utf8").includes('<link rel="stylesheet" href="/local.css" />')) fs.unlinkSync(path.join(PUBLIC, f));
  }
}
for (const p of paginas) fs.writeFileSync(path.join(PUBLIC, `${p.slug}.html`), p.html);

// Home: bloco de regiões com links para as páginas (entre os marcadores do index.html)
const blocoRegioes = porZona()
  .map(
    ([zona, ls]) => `        <div class="zona-card">
          <div class="zona-header"><span class="zona-dot" style="background:${zona.includes("São Paulo") || zona === "Centro" || zona.startsWith("Zona") ? "#f59e0b" : "#3b82f6"}"></span>${esc(zona === "Centro" ? "Centro de São Paulo" : zona.startsWith("Zona") ? `${zona} de São Paulo` : zona)}<span class="zona-toggle">+</span></div>
          <div class="zona-pills">
            ${ls.map((l) => `<a href="/desentupidora-${l.slug}">${esc(l.nome)}</a>`).join("")}
          </div>
        </div>`,
  )
  .join("\n");
const INI = "<!-- REGIOES:INICIO (gerado por gerador/gerar.mjs) -->";
const FIM = "<!-- REGIOES:FIM -->";
const iIni = indexHtml.indexOf(INI);
const iFim = indexHtml.indexOf(FIM, iIni);
if (iIni < 0 || iFim < 0) throw new Error("Marcadores de regiões não encontrados no index.html");
fs.writeFileSync(
  path.join(PUBLIC, "index.html"),
  `${indexHtml.slice(0, iIni)}${INI}\n${blocoRegioes}\n        ${indexHtml.slice(iFim)}`,
);

// Sitemap
const hoje = new Date().toISOString().slice(0, 10);
const urls = [{ slug: "", prioridade: "1.0" }, ...paginas];
fs.writeFileSync(
  path.join(PUBLIC, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${SITE}/${p.slug}</loc><lastmod>${hoje}</lastmod><priority>${p.prioridade}</priority></url>`).join("\n")}
</urlset>
`,
);

console.log(`${paginas.length} páginas geradas + sitemap com ${urls.length} URLs`);
if (!localPorSlug.size) throw new Error("sem locais");
