// Cópia de lmt-site/src/data/locais.ts (convertida com esbuild) + cidades do interior que só a Sampaio's atende.
// Para atualizar: rodar de novo a conversão e reaplicar o bloco "Só na Sampaio's".
const slugify = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const grupo = (tipo, zona, agrupamento, linhas) => linhas.map(([nome, perfis, destaque]) => ({ slug: slugify(nome), nome, tipo, zona, agrupamento, perfis, destaque }));
const distritos = (zona, sub, linhas) => grupo("distrito", zona, sub, linhas);
const locais = [
  // ── Centro ──
  ...distritos("Centro", "Sé", [
    ["Bela Vista", ["predios", "gastronomia", "antigo", "comercio"], true],
    ["Bom Retiro", ["comercio", "industria", "antigo"]],
    ["Cambuci", ["casas", "antigo", "comercio"]],
    ["Consolação", ["predios", "gastronomia", "comercio"], true],
    ["Liberdade", ["predios", "gastronomia", "comercio", "antigo"], true],
    ["República", ["predios", "comercio", "antigo", "gastronomia"]],
    ["Santa Cecília", ["predios", "antigo", "gastronomia"]],
    ["Sé", ["comercio", "antigo", "predios"]]
  ]),
  // ── Zona Oeste ──
  ...distritos("Zona Oeste", "Butantã", [
    ["Butantã", ["casas", "predios"], true],
    ["Morumbi", ["predios", "casas"]],
    ["Raposo Tavares", ["casas"]],
    ["Rio Pequeno", ["casas", "predios"]],
    ["Vila Sônia", ["predios", "casas"]]
  ]),
  ...distritos("Zona Oeste", "Lapa", [
    ["Barra Funda", ["industria", "predios", "comercio", "varzea"]],
    ["Jaguara", ["casas", "industria"]],
    ["Jaguaré", ["industria", "casas"]],
    ["Lapa", ["comercio", "casas", "predios", "varzea"], true],
    ["Perdizes", ["predios", "gastronomia"]],
    ["Vila Leopoldina", ["predios", "industria", "comercio"]]
  ]),
  ...distritos("Zona Oeste", "Pinheiros", [
    ["Alto de Pinheiros", ["casas"]],
    ["Itaim Bibi", ["predios", "gastronomia", "comercio"]],
    ["Jardim Paulista", ["predios", "gastronomia", "comercio"]],
    ["Pinheiros", ["predios", "gastronomia", "comercio"], true]
  ]),
  ...grupo("bairro", "Zona Oeste", "Pinheiros", [["Vila Madalena", ["casas", "gastronomia", "predios"], true]]),
  // ── Zona Sul ──
  ...distritos("Zona Sul", "Vila Mariana", [
    ["Moema", ["predios", "gastronomia"], true],
    ["Saúde", ["predios", "casas"], true],
    ["Vila Mariana", ["predios", "gastronomia", "comercio"], true]
  ]),
  ...grupo("bairro", "Zona Sul", "Pinheiros", [
    ["Vila Olímpia", ["predios", "comercio", "gastronomia"], true],
    ["Brooklin", ["predios", "comercio", "gastronomia"], true]
  ]),
  ...distritos("Zona Sul", "Ipiranga", [
    ["Cursino", ["casas"]],
    ["Ipiranga", ["casas", "predios", "comercio", "antigo"], true],
    ["Sacomã", ["casas", "comercio"]]
  ]),
  ...distritos("Zona Sul", "Jabaquara", [["Jabaquara", ["casas", "predios"]]]),
  ...distritos("Zona Sul", "Santo Amaro", [
    ["Campo Belo", ["predios", "casas", "gastronomia"], true],
    ["Campo Grande", ["predios", "casas"]],
    ["Santo Amaro", ["comercio", "predios", "industria"], true]
  ]),
  ...distritos("Zona Sul", "Cidade Ademar", [
    ["Cidade Ademar", ["casas"]],
    ["Pedreira", ["casas"]]
  ]),
  ...distritos("Zona Sul", "Campo Limpo", [
    ["Campo Limpo", ["casas", "predios"]],
    ["Capão Redondo", ["casas"]],
    ["Vila Andrade", ["predios"], true]
  ]),
  ...distritos("Zona Sul", "M'Boi Mirim", [
    ["Jardim Ângela", ["casas", "fossa"]],
    ["Jardim São Luís", ["casas"]]
  ]),
  ...distritos("Zona Sul", "Capela do Socorro", [
    ["Cidade Dutra", ["casas"]],
    ["Grajaú", ["casas", "fossa"]],
    ["Socorro", ["casas", "industria"]]
  ]),
  ...distritos("Zona Sul", "Parelheiros", [
    ["Marsilac", ["fossa"]],
    ["Parelheiros", ["fossa", "casas"]]
  ]),
  // ── Zona Norte ──
  ...distritos("Zona Norte", "Santana/Tucuruvi", [
    ["Mandaqui", ["casas", "predios"]],
    ["Santana", ["predios", "comercio", "gastronomia"], true],
    ["Tucuruvi", ["predios", "casas", "comercio"]]
  ]),
  ...distritos("Zona Norte", "Jaçanã/Tremembé", [
    ["Jaçanã", ["casas"]],
    ["Tremembé", ["casas", "fossa"]]
  ]),
  ...distritos("Zona Norte", "Vila Maria/Vila Guilherme", [
    ["Vila Guilherme", ["casas", "comercio", "varzea"]],
    ["Vila Maria", ["casas", "industria", "varzea"]],
    ["Vila Medeiros", ["casas"]]
  ]),
  ...distritos("Zona Norte", "Casa Verde", [
    ["Cachoeirinha", ["casas"]],
    ["Casa Verde", ["casas", "comercio"]],
    ["Limão", ["casas", "industria", "varzea"]]
  ]),
  ...distritos("Zona Norte", "Freguesia/Brasilândia", [
    ["Brasilândia", ["casas"]],
    ["Freguesia do Ó", ["casas", "comercio"]]
  ]),
  ...distritos("Zona Norte", "Pirituba/Jaraguá", [
    ["Jaraguá", ["casas"]],
    ["Pirituba", ["casas", "predios"]],
    ["São Domingos", ["casas"]]
  ]),
  ...distritos("Zona Norte", "Perus", [
    ["Anhanguera", ["casas", "fossa"]],
    ["Perus", ["casas"]]
  ]),
  // ── Zona Leste ──
  ...distritos("Zona Leste", "Mooca", [
    ["Água Rasa", ["casas"]],
    ["Belém", ["casas", "antigo", "industria"]],
    ["Brás", ["comercio", "antigo", "industria"]],
    ["Mooca", ["predios", "casas", "antigo", "gastronomia"], true],
    ["Pari", ["comercio", "antigo"]],
    ["Tatuapé", ["predios", "comercio", "gastronomia"], true]
  ]),
  ...distritos("Zona Leste", "Aricanduva", [
    ["Aricanduva", ["casas", "comercio"]],
    ["Carrão", ["casas", "predios"]],
    ["Vila Formosa", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Penha", [
    ["Artur Alvim", ["casas"]],
    ["Cangaíba", ["casas"]],
    ["Penha", ["casas", "comercio", "antigo"]],
    ["Vila Matilde", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Vila Prudente", [
    ["São Lucas", ["casas"]],
    ["Vila Prudente", ["casas", "predios", "comercio"], true]
  ]),
  ...distritos("Zona Leste", "Sapopemba", [["Sapopemba", ["casas"]]]),
  ...distritos("Zona Leste", "Ermelino Matarazzo", [
    ["Ermelino Matarazzo", ["casas"]],
    ["Ponte Rasa", ["casas"]]
  ]),
  ...distritos("Zona Leste", "São Miguel", [
    ["Jardim Helena", ["casas", "varzea"]],
    ["São Miguel", ["casas", "comercio"]],
    ["Vila Jacuí", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Itaim Paulista", [
    ["Itaim Paulista", ["casas"]],
    ["Vila Curuçá", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Guaianases", [
    ["Guaianases", ["casas"]],
    ["Lajeado", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Itaquera", [
    ["Cidade Líder", ["casas"]],
    ["Itaquera", ["casas", "comercio", "predios"]],
    ["José Bonifácio", ["predios"]],
    ["Parque do Carmo", ["casas"]]
  ]),
  ...distritos("Zona Leste", "São Mateus", [
    ["Iguatemi", ["casas", "fossa"]],
    ["São Mateus", ["casas", "comercio"]],
    ["São Rafael", ["casas"]]
  ]),
  ...distritos("Zona Leste", "Cidade Tiradentes", [["Cidade Tiradentes", ["predios"]]]),
  // ── Grande SP ──
  ...grupo("cidade", "Grande ABC", "Grande ABC", [
    ["Santo André", ["predios", "comercio", "industria"], true],
    ["São Bernardo do Campo", ["industria", "predios", "casas"], true],
    ["São Caetano do Sul", ["predios", "comercio"], true],
    ["Diadema", ["industria", "casas"], true],
    ["Mauá", ["casas", "industria"], true],
    ["Ribeirão Pires", ["casas", "fossa"]],
    ["Rio Grande da Serra", ["casas", "fossa"]]
  ]),
  ...grupo("cidade", "Região Norte e Leste da Grande SP", "Guarulhos e Alto Tietê", [
    ["Guarulhos", ["industria", "comercio", "casas"], true],
    ["Arujá", ["casas"]],
    ["Itaquaquecetuba", ["casas"]],
    ["Poá", ["casas"]],
    ["Ferraz de Vasconcelos", ["casas"]],
    ["Suzano", ["casas", "industria"]],
    ["Mogi das Cruzes", ["casas", "comercio"]]
  ]),
  ...grupo("cidade", "Região Oeste da Grande SP", "Osasco e região", [
    ["Osasco", ["comercio", "predios", "casas"], true],
    ["Barueri", ["comercio", "predios", "industria"], true],
    ["Carapicuíba", ["casas"]],
    ["Santana de Parnaíba", ["casas", "fossa"]],
    ["Cotia", ["casas", "fossa"]]
  ]),
  ...grupo("cidade", "Região Sudoeste da Grande SP", "Taboão e região", [
    ["Taboão da Serra", ["casas", "predios"]],
    ["Embu das Artes", ["casas", "fossa"]],
    ["Itapecerica da Serra", ["casas", "fossa"]]
  ]),
  ...grupo("cidade", "Região Norte da Grande SP", "Franco da Rocha e região", [
    ["Caieiras", ["casas"]],
    ["Franco da Rocha", ["casas"]],
    ["Mairiporã", ["casas", "fossa"]]
  ]),
  ...grupo("cidade", "Interior de SP", "Interior", [
    ["Jundiaí", ["industria", "comercio"], true],
    ["Campinas", ["comercio", "industria", "predios"], true]
  ]),
  // Só na Sampaio's (a LMT não atende), em sub-regiões para os "vizinhos" fazerem sentido
  ...grupo("cidade", "Interior de SP", "Região de Jundiaí", [
    ["Itupeva", ["casas", "fossa"]],
    ["Várzea Paulista", ["casas"]],
    ["Campo Limpo Paulista", ["casas"]]
  ]),
  ...grupo("cidade", "Interior de SP", "Região Bragantina", [
    ["Itatiba", ["casas", "industria"]],
    ["Atibaia", ["casas", "fossa"]],
    ["Bragança Paulista", ["casas", "comercio"]]
  ]),
  ...grupo("cidade", "Interior de SP", "Região de Sorocaba", [
    ["Itu", ["casas", "comercio", "antigo"]],
    ["Salto", ["casas", "industria"]],
    ["São Roque", ["casas", "fossa"]]
  ])
];
const localPorSlug = new Map(locais.map((l) => [l.slug, l]));
const ondeFica = (l) => {
  if (l.tipo === "cidade") {
    if (l.zona === "Grande ABC") return "no Grande ABC";
    if (l.zona === "Interior de SP") return "no interior de São Paulo";
    return `na ${l.zona}`;
  }
  return l.zona === "Centro" ? "no Centro de São Paulo" : `na ${l.zona} de São Paulo`;
};
const COM_ARTIGO = {
  "Bela Vista": "na",
  Consolação: "na",
  Liberdade: "na",
  República: "na",
  Sé: "na",
  Lapa: "na",
  "Barra Funda": "na",
  Saúde: "na",
  "Vila Mariana": "na",
  "Vila Madalena": "na",
  "Vila Olímpia": "na",
  "Vila Sônia": "na",
  "Vila Leopoldina": "na",
  "Vila Andrade": "na",
  Mooca: "na",
  Penha: "na",
  "Vila Formosa": "na",
  "Vila Matilde": "na",
  "Vila Prudente": "na",
  "Vila Guilherme": "na",
  "Vila Maria": "na",
  "Vila Medeiros": "na",
  "Vila Jacuí": "na",
  "Vila Curuçá": "na",
  "Freguesia do Ó": "na",
  Cachoeirinha: "na",
  "Casa Verde": "na",
  "Água Rasa": "na",
  "Cidade Ademar": "na",
  "Cidade Dutra": "na",
  "Cidade Líder": "na",
  "Cidade Tiradentes": "na",
  Pedreira: "na",
  Brooklin: "no",
  Brás: "no",
  Belém: "no",
  Pari: "no",
  Cambuci: "no",
  "Bom Retiro": "no",
  Butantã: "no",
  Morumbi: "no",
  "Rio Pequeno": "no",
  Jaguaré: "no",
  Limão: "no",
  Jabaquara: "no",
  Ipiranga: "no",
  Sacomã: "no",
  Cursino: "no",
  "Campo Belo": "no",
  "Campo Grande": "no",
  "Campo Limpo": "no",
  "Capão Redondo": "no",
  "Jardim Ângela": "no",
  "Jardim São Luís": "no",
  "Jardim Paulista": "no",
  "Jardim Helena": "no",
  Grajaú: "no",
  Socorro: "no",
  Mandaqui: "no",
  Tucuruvi: "no",
  Jaçanã: "no",
  Tremembé: "no",
  Jaraguá: "no",
  Carrão: "no",
  "Itaim Bibi": "no",
  "Itaim Paulista": "no",
  Tatuapé: "no",
  "Alto de Pinheiros": "no",
  "Parque do Carmo": "no",
  Iguatemi: "no",
  Lajeado: "no",
  Aricanduva: "no",
  Cangaíba: "no",
  Anhanguera: "no"
};
const emLocal = (l) => `${COM_ARTIGO[l.nome] ?? "em"} ${l.nome}`;
const oLocal = (l, inicioDeFrase = false) => {
  const art = COM_ARTIGO[l.nome] === "na" ? "a" : COM_ARTIGO[l.nome] === "no" ? "o" : "";
  if (!art) return l.nome;
  return `${inicioDeFrase ? art.toUpperCase() : art} ${l.nome}`;
};
const ARTIGO_EXTRA = { Freguesia: "na", "Capela do Socorro": "na" };
const deNome = (nome) => {
  const art = COM_ARTIGO[nome.split("/")[0]] ?? ARTIGO_EXTRA[nome.split("/")[0]];
  return `${art === "na" ? "da" : art === "no" ? "do" : "de"} ${nome}`;
};
const locaisProximos = (l, max = 8) => {
  const pos = (o) => locais.indexOf(o);
  const perto = (a, b) => Math.abs(pos(a) - pos(l)) - Math.abs(pos(b) - pos(l));
  const mesmoGrupo = locais.filter((o) => o.slug !== l.slug && o.agrupamento === l.agrupamento);
  const mesmaZona = locais.filter((o) => o.slug !== l.slug && o.agrupamento !== l.agrupamento && o.zona === l.zona).sort(perto);
  return [...mesmoGrupo, ...mesmaZona].slice(0, max);
};
export {
  deNome,
  emLocal,
  locais,
  locaisProximos,
  localPorSlug,
  oLocal,
  ondeFica
};
