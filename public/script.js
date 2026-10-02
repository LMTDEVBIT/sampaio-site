// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Zona accordion
document.querySelectorAll('.zona-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.zona-card');
    const toggle = header.querySelector('.zona-toggle');
    const isOpen = card.classList.toggle('open');
    toggle.textContent = isOpen ? '−' : '+';
  });
});

// Header scroll shadow
window.addEventListener('scroll', () => {
  document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 10);
});

// GTM dataLayer — clique em telefone e WhatsApp
window.dataLayer = window.dataLayer || [];

// Conversões do Google Ads direto no site, na conta oficial da Sampaio's (841-259-8398 = AW-18485376135).
// Ficam aqui e não no GTM porque o contêiner GTM-KL5BSTLR aponta para a conta antiga 210-705-9903 (AW-18485384738).
// Se um dia as tags da conta oficial forem para o GTM, remover este bloco para não contar cada clique duas vezes.
const ADS_ID = 'AW-18485376135';
const ADS_CONVERSAO = { whatsapp: `${ADS_ID}/7fnkCLaSiI0dEIfpwe5E`, telefone: `${ADS_ID}/0yywCLmSiI0dEIfpwe5E` };
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', ADS_ID);
(() => {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(s);
})();
const conversao = (tipo) => gtag('event', 'conversion', { send_to: ADS_CONVERSAO[tipo], transport_type: 'beacon' });

document.querySelectorAll('a[href^="tel:"]').forEach(a => {
  a.addEventListener('click', () => {
    window.dataLayer.push({ event: 'click_telefone' });
    conversao('telefone');
  });
});

document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
  a.addEventListener('click', () => {
    window.dataLayer.push({ event: 'click_whatsapp' });
    conversao('whatsapp');
  });
});

// Rastreio de origem dos leads (FenonBase) — mesmo esquema do site da LMT (lmt-site/src/lib/rastreio.ts).
// 1) Na entrada guarda gclid/gbraid/wbraid/UTMs da URL (90 dias; um clique novo em anúncio substitui) e, se veio de
//    anúncio, registra a visita (detector de cliques suspeitos).
// 2) Em cada clique no WhatsApp gera um código #S + 6 dígitos, coloca na mensagem ("protocolo #S123456") e registra o
//    clique. Quando a mensagem chega, o CRM liga o lead ao anúncio/campanha que trouxe a pessoa.
(() => {
  const CHAVE = 'sampaios_origem';
  const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000;
  const API = 'https://fenonbase-anuncios-sync.rwnqlh.easypanel.host/api/';
  const PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const enviar = (rota, dados) => {
    try {
      navigator.sendBeacon?.(API + rota, new Blob([JSON.stringify(dados)], { type: 'text/plain' }));
    } catch {
      // sem rastreio: o WhatsApp abre normalmente
    }
  };

  const ler = () => {
    try {
      const o = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      return o.em && Date.now() - o.em < VALIDADE_MS ? o : {};
    } catch {
      return {};
    }
  };

  try {
    const url = new URL(window.location.href);
    const daUrl = {};
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) daUrl[p] = v;
    }
    const atual = ler();
    const referencia = document.referrer && !document.referrer.includes(window.location.hostname) ? document.referrer : undefined;
    if (Object.keys(daUrl).length || !atual.em) {
      localStorage.setItem(CHAVE, JSON.stringify({ ...daUrl, entrada: url.pathname, referencia, em: Date.now() }));
    }
    if (daUrl.gclid || daUrl.gbraid || daUrl.wbraid) enviar('visita', { empresa: 'S', ...daUrl, pagina: url.pathname });
  } catch {
    // sem localStorage (modo privado etc.): segue sem rastreio
  }

  const novoCodigo = () => {
    const n = new Uint32Array(1);
    crypto.getRandomValues(n);
    return `#S${String(n[0] % 1000000).padStart(6, '0')}`;
  };

  // O link original fica guardado; cada clique gera um código novo antes de o navegador abrir o WhatsApp.
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    const original = a.href;
    a.addEventListener('click', () => {
      try {
        const codigo = novoCodigo();
        const url = new URL(original);
        const texto = `${url.searchParams.get('text') || ''} (protocolo ${codigo})`.trim();
        url.searchParams.delete('text');
        // encodeURIComponent (espaço = %20): o "+" do URLSearchParams nem sempre vira espaço no WhatsApp
        a.href = `${url.toString()}${url.search ? '&' : '?'}text=${encodeURIComponent(texto)}`;
        enviar('clique', { codigo, ...ler(), pagina: window.location.pathname });
      } catch {
        a.href = original;
      }
    });
  });
})();
