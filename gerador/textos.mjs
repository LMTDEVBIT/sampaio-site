// Textos da Sampaio's para as páginas por local. Escritos de propósito em outro formato que os da LMT
// (lmt-site/src/lib/conteudoLocal.ts): aqui cada perfil da região vira um "diagnóstico" — o sinal que a pessoa vê,
// a causa provável e como a Sampaio's resolve —, para os dois sites não terem texto duplicado.

import { emLocal, ondeFica, oLocal, locaisProximos } from "./locais.mjs";

const escolher = (opcoes, semente) => {
  let h = 7;
  for (const c of semente) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return opcoes[h % opcoes.length];
};

const ORDEM = ["varzea", "fossa", "antigo", "gastronomia", "industria", "comercio", "predios", "casas"];
const porDestaque = (l) => [...l.perfis].sort((a, b) => ORDEM.indexOf(a) - ORDEM.indexOf(b));
const lista = (n) => (n.length > 1 ? `${n.slice(0, -1).join(", ")} e ${n[n.length - 1]}` : n[0]);
const maiuscula = (t) => t[0].toUpperCase() + t.slice(1);

// diagnóstico = { sinal, causa, solucao }
export const SERVICOS = {
  esgoto: {
    nome: "Desentupimento de Esgoto",
    slugPagina: "desentupimento-de-esgoto",
    prefixo: "desentupimento-esgoto",
    keyword: "desentupimento de esgoto",
    resumo: "Rede de esgoto entupida em casa, prédio ou comércio, com retorno, mau cheiro ou transbordamento.",
    intro: [
      (l) => `Esgoto voltando, ralo borbulhando ou cheiro forte ${emLocal(l)}? A Sampaio's manda técnico ${ondeFica(l)} a qualquer hora, com o equipamento certo para o tipo de rede.`,
      (l) => `A Sampaio's desentope esgoto ${emLocal(l)} 24 horas por dia. A visita para avaliar é gratuita e o preço é passado antes de começar.`,
      (l) => `Desentupimento de esgoto ${emLocal(l)}: atendimento 24h ${ondeFica(l)}, sem visita cobrada e com garantia no serviço.`,
    ],
    perfis: {
      predios: { sinal: "O esgoto volta no ralo ou no vaso dos apartamentos mais baixos.", causa: "Obstrução na prumada ou no coletor do térreo/subsolo, que recebe o esgoto de todos os andares.", solucao: "Desobstrução da prumada por cima ou pela caixa de inspeção e limpeza do coletor com hidrojateamento." },
      casas: { sinal: "Vaso e ralos lentos ao mesmo tempo, e a caixa do quintal cheia.", causa: "Entupimento na caixa de inspeção ou no ramal até a rua — raízes, gordura e objetos no vaso.", solucao: "Abertura da caixa, desobstrução do ramal com máquina rotativa e teste de escoamento." },
      comercio: { sinal: "Banheiro de loja ou escritório interditado em horário de movimento.", causa: "Uso intenso e descarte de papel e absorventes no vaso.", solucao: "Atendimento no horário que menos atrapalha, inclusive à noite e no fim de semana." },
      gastronomia: { sinal: "Cozinha com ralo voltando e cheiro de gordura no salão.", causa: "Gordura endurecida na parede do cano, que vai fechando a passagem.", solucao: "Hidrojateamento, que retira a camada de gordura em vez de só furar o bloqueio." },
      industria: { sinal: "Caixas de passagem cheias e redes longas sem escoar.", causa: "Resíduo acumulado em tubulações de grande diâmetro e extensão.", solucao: "Hidrojateamento de alta pressão combinado com caminhão de sucção." },
      antigo: { sinal: "O mesmo entupimento volta poucas semanas depois.", causa: "Tubulação antiga, de manilha ou ferro fundido, com incrustação, trinca ou raiz.", solucao: "Câmera de inspeção para ver o cano por dentro antes de qualquer quebra." },
      fossa: { sinal: "Descarga fraca, ralo lento e cheiro no quintal, mas nenhum cano entupido.", causa: "Fossa séptica cheia — comum onde o imóvel não tem ligação com a rede.", solucao: "Esgotamento da fossa com caminhão de sucção." },
      varzea: { sinal: "Em dia de chuva forte, o esgoto sobe pelos ralos do térreo.", causa: "A rede pública enche e o esgoto faz o caminho de volta.", solucao: "Desobstrução da rede interna e orientação sobre válvula de retenção." },
    },
    passos: ["Avaliação gratuita para achar o ponto da obstrução", "Orçamento na hora, antes de começar", "Desobstrução com máquina rotativa, hidrojateamento ou sucção", "Teste de escoamento e limpeza do local"],
  },
  gordura: {
    nome: "Limpeza de Caixa de Gordura",
    slugPagina: "limpeza-de-caixa-de-gordura",
    prefixo: "limpeza-caixa-gordura",
    keyword: "limpeza de caixa de gordura",
    resumo: "Limpeza de caixas de gordura de casas, condomínios, restaurantes e cozinhas industriais.",
    intro: [
      (l) => `Caixa de gordura cheia ${emLocal(l)}? A Sampaio's faz a limpeza completa, leva o resíduo para destinação correta e deixa comprovante do serviço.`,
      (l) => `A Sampaio's limpa caixas de gordura ${emLocal(l)} e ${ondeFica(l)}, de cozinhas de casa a restaurantes e indústrias.`,
      (l) => `Limpeza de caixa de gordura ${emLocal(l)} com atendimento 24h para emergência e agendamento para manutenção periódica.`,
    ],
    perfis: {
      gastronomia: { sinal: "Cheiro de gordura no salão e pia da cozinha lenta no meio do expediente.", causa: "Cozinha comercial enche a caixa rápido; sem limpeza mensal, ela transborda.", solucao: "Limpeza programada no horário em que a cozinha está parada, com comprovante para a vigilância sanitária." },
      predios: { sinal: "Cheiro ruim na área comum e prumada da cozinha entupida.", causa: "Caixas de gordura coletivas do condomínio sem limpeza periódica.", solucao: "Limpeza das caixas coletivas e inclusão no calendário de manutenção do prédio." },
      casas: { sinal: "Pia da cozinha parando de escoar.", causa: "Caixa de gordura do quintal nunca limpa.", solucao: "Limpeza completa da caixa — o ideal é repetir a cada 3 a 6 meses." },
      comercio: { sinal: "Padaria, mercado ou refeitório com mau cheiro perto da cozinha.", causa: "Caixa pequena para o volume de uso.", solucao: "Limpeza e avaliação da frequência ideal, com comprovante a cada serviço." },
      industria: { sinal: "Caixa separadora transbordando.", causa: "Volume alto de gordura em cozinhas industriais.", solucao: "Esgotamento com caminhão de sucção e destinação licenciada." },
      antigo: { sinal: "A caixa enche muito rápido.", causa: "Caixa antiga, pequena para o uso de hoje.", solucao: "Limpeza e orientação sobre aumentar a caixa." },
    },
    passos: ["Retirada de toda a gordura e lodo", "Limpeza das paredes e das conexões", "Teste da entrada e saída da caixa", "Destinação licenciada e comprovante"],
  },
  fossa: {
    nome: "Limpa Fossa",
    slugPagina: "limpa-fossa",
    prefixo: "limpa-fossa",
    keyword: "limpa fossa",
    resumo: "Esgotamento de fossa séptica, sumidouro e caixas de esgoto com caminhão de sucção a vácuo.",
    intro: [
      (l) => `Limpa fossa ${emLocal(l)}: a Sampaio's esgota fossa séptica, sumidouro e caixas de esgoto com caminhão de sucção, 24 horas por dia.`,
      (l) => `Fossa transbordando ${emLocal(l)}? O caminhão de sucção da Sampaio's atende ${ondeFica(l)} com destinação correta do resíduo.`,
      (l) => `A Sampaio's faz limpeza de fossa ${emLocal(l)} para casas, chácaras, condomínios e empresas, com comprovante do serviço.`,
    ],
    perfis: {
      fossa: { sinal: "Quintal com cheiro forte e esgoto voltando nos ralos.", causa: `Muitos imóveis da região ainda usam fossa séptica, que enche com o tempo.`, solucao: "Esgotamento completo com caminhão de sucção e conferência do sumidouro." },
      predios: { sinal: "Poço de recalque ou caixas do subsolo cheias.", causa: "Mesmo ligado à rede, o prédio acumula esgoto e lodo em poços e caixas.", solucao: "Sucção periódica dos poços e caixas do condomínio." },
      casas: { sinal: "Você não sabe para onde vai o esgoto da casa.", causa: "Casas mais antigas às vezes ainda têm fossa ou caixa grande de passagem.", solucao: "A equipe localiza e avalia na visita, sem custo." },
      industria: { sinal: "Tanques e fossas de vestiário cheios.", causa: "Uso intenso em galpões e indústrias.", solucao: "Sucção com comprovante de destinação do resíduo." },
      gastronomia: { sinal: "Caixa de gordura grande demais para limpar à mão.", causa: "Volume alto de cozinha comercial.", solucao: "Esgotamento com caminhão de sucção." },
      comercio: { sinal: "Caixas de esgoto do comércio enchendo com frequência.", causa: "Uso intenso dos banheiros.", solucao: "Sucção rápida, sem fechar as portas." },
    },
    passos: ["Avaliação da fossa e do acesso do caminhão", "Sucção a vácuo de todo o conteúdo", "Conferência da entrada, saída e sumidouro", "Destinação em estação licenciada e comprovante"],
  },
  hidro: {
    nome: "Hidrojateamento",
    slugPagina: "hidrojateamento",
    prefixo: "hidrojateamento",
    keyword: "hidrojateamento",
    resumo: "Limpeza de tubulações com água em alta pressão para entupimentos graves e manutenção preventiva.",
    intro: [
      (l) => `Hidrojateamento ${emLocal(l)}: a Sampaio's limpa redes de esgoto e de gordura com água em alta pressão, sem quebra.`,
      (l) => `Entupimento que sempre volta ${emLocal(l)}? O hidrojateamento da Sampaio's limpa a parede inteira do cano, não só o ponto entupido.`,
      (l) => `A Sampaio's faz hidrojateamento ${emLocal(l)} e ${ondeFica(l)} para casas, condomínios, restaurantes e indústrias.`,
    ],
    perfis: {
      gastronomia: { sinal: "A pia da cozinha entope de novo toda semana.", causa: "Camada de gordura dura na parede do cano.", solucao: "Hidrojateamento com água quente que remove a gordura e devolve o diâmetro do cano." },
      predios: { sinal: "Chamados de entupimento repetidos no mesmo prédio.", causa: "Prumadas e coletor com resíduo acumulado.", solucao: "Hidrojateamento preventivo de toda a rede do condomínio." },
      antigo: { sinal: "Cano antigo que entope com frequência.", causa: "Incrustação em manilha ou ferro fundido.", solucao: "Pressão e bico ajustados ao material, com câmera quando necessário." },
      industria: { sinal: "Redes longas com escoamento fraco.", causa: "Resíduo em tubulações de grande diâmetro.", solucao: "Hidrojateamento de alta pressão por trechos, com sucção dos resíduos." },
      casas: { sinal: "Esgoto do quintal lento mesmo depois de desentupir.", causa: "Raízes no ramal ou gordura acumulada.", solucao: "Hidrojateamento com bico de corte de raízes, sem quebrar piso." },
      comercio: { sinal: "Rede do comércio lenta em horário de pico.", causa: "Acúmulo de resíduos ao longo do tempo.", solucao: "Limpeza fora do horário de funcionamento." },
    },
    passos: ["Inspeção da rede e escolha do bico", "Hidrojateamento por toda a extensão do cano", "Sucção dos resíduos soltos", "Teste de escoamento"],
  },
  agua: {
    nome: "Limpeza de Caixa d'Água",
    slugPagina: "limpeza-de-caixa-dagua",
    prefixo: "limpeza-caixa-dagua",
    keyword: "limpeza de caixa d'água",
    resumo: "Limpeza e desinfecção de caixas d'água e reservatórios, com comprovante do serviço.",
    intro: [
      (l) => `Limpeza de caixa d'água ${emLocal(l)}: a Sampaio's esvazia, escova, desinfeta e devolve o reservatório pronto para uso, com comprovante.`,
      (l) => `A Sampaio's limpa caixas d'água e reservatórios ${emLocal(l)} — o recomendado é a cada 6 meses.`,
      (l) => `Caixa d'água ${emLocal(l)} precisando de limpeza? A Sampaio's atende ${ondeFica(l)} com hora marcada.`,
    ],
    perfis: {
      predios: { sinal: "Administradora pedindo comprovante de limpeza dos reservatórios.", causa: "Condomínios têm reservatório inferior e superior de grande volume.", solucao: "Limpeza por etapas, combinada com o síndico, e comprovante para a administradora." },
      casas: { sinal: "Água com cor ou cheiro diferente.", causa: "Lodo e sedimentos no fundo da caixa de 500 a 1.000 litros.", solucao: "Limpeza em poucas horas, com a água de volta no mesmo dia." },
      gastronomia: { sinal: "Fiscalização sanitária pedindo comprovante.", causa: "Comércio de alimentos precisa manter o reservatório limpo.", solucao: "Limpeza com comprovante entregue na hora." },
      comercio: { sinal: "Caixa d'água do prédio comercial sem limpeza há tempos.", causa: "Manutenção esquecida.", solucao: "Limpeza fora do horário de funcionamento." },
      industria: { sinal: "Cisterna e reservatórios grandes.", causa: "Volume alto e uso contínuo.", solucao: "Limpeza planejada para não parar a operação." },
    },
    passos: ["Fechamento do registro e esvaziamento", "Retirada do lodo e escovação das paredes", "Desinfecção e enxágue", "Novo enchimento e comprovante"],
  },
};

// Serviços sem página por local (só a página principal)
export const SERVICOS_SIMPLES = [
  { slug: "desentupimento-de-vaso-sanitario", nome: "Desentupimento de Vaso Sanitário", resumo: "Vaso entupido ou transbordando, resolvido sem desmontar e sem quebrar o banheiro." },
  { slug: "desentupimento-de-pia-e-ralo", nome: "Desentupimento de Pia e Ralo", resumo: "Pias de cozinha e banheiro, ralos de box, lavanderia e área externa." },
  { slug: "caca-vazamento", nome: "Caça Vazamento", resumo: "Localização de vazamentos ocultos em paredes, pisos e tubulações.", destaque: false },
];

export const diagnosticos = (servico, l) => {
  const s = SERVICOS[servico];
  const itens = porDestaque(l).map((p) => s.perfis[p]).filter(Boolean).slice(0, 3);
  return itens.length ? itens : [{ sinal: `Problema de ${s.keyword} ${emLocal(l)}.`, causa: "A causa é avaliada na visita gratuita.", solucao: s.passos[2] }];
};

export const introServico = (servico, l) => escolher(SERVICOS[servico].intro, `${servico}:${l.slug}`)(l);

// "de Moema" / "da Mooca" / "do Brás"
const deLocal = (l) => {
  const o = oLocal(l);
  return o.startsWith("a ") ? `da ${l.nome}` : o.startsWith("o ") ? `do ${l.nome}` : `de ${l.nome}`;
};

export const fraseVizinhos = (l) => {
  const prox = locaisProximos(l, 5).map((o) => o.nome);
  if (!prox.length) return "";
  if (l.tipo === "cidade") return `A mesma equipe atende as cidades vizinhas: ${lista(prox)}.`;
  const resto = ondeFica(l).replace(/^na /, "da ").replace(/^no /, "do ");
  return `Além ${deLocal(l)}, atendemos ${lista(prox)} e todo o restante ${resto}.`;
};

export const introDesentupidora = (l) =>
  escolher(
    [
      `A Sampaio's é uma desentupidora 24 horas que atende ${emLocal(l)} e ${ondeFica(l)}: esgoto, pia, vaso, ralo, caixa de gordura, fossa e caixa d'água.`,
      `Precisa de desentupidora ${emLocal(l)}? A Sampaio's atende a qualquer hora, sem cobrar a visita e com garantia no serviço.`,
      `${maiuscula(emLocal(l))}, a Sampaio's atende casas, condomínios, comércios e empresas com desentupimento e limpeza de redes, 24 horas por dia.`,
    ],
    `geral:${l.slug}`,
  );

export const faqLocal = (l) => [
  { q: `Vocês atendem ${emLocal(l)} de madrugada?`, a: `Sim. A Sampaio's atende 24 horas, todos os dias, inclusive feriados, ${emLocal(l)} e região.` },
  { q: "A visita é cobrada?", a: "Não. A avaliação no local é gratuita e o orçamento é passado antes de qualquer serviço." },
  { q: "Vocês emitem nota fiscal?", a: "Sim, emitimos nota fiscal para residências, condomínios e empresas." },
];

export { porDestaque };
