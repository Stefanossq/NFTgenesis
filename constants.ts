
import { Character } from './types';

export const PRELOADED_CHARACTERS: Character[] = [
  {
    id: 'pre-1',
    name: 'Cynthia, a Lâmina Cósmica',
    prompt: 'Arte de anime, uma guerreira celestial com cabelo prateado, armadura futurista branca e azul, empunhando uma espada de energia, fundo de galáxia, arte de gacha game, key visual',
    imageBase64: '',
    story: 'Cynthia não nasceu, foi forjada no coração de uma supernova. Como a última guardiã da Constelação de Lyra, ela viaja pelas estrelas para proteger relíquias antigas de uma força sombria conhecida como o Vazio. Sua armadura, feita de metal estelar, e sua lâmina, um fragmento de luz pura, são as únicas coisas que se interpõem entre o universo e a escuridão total.',
    price: '3.50 ETH'
  },
  {
    id: 'pre-2',
    name: 'Kael, o Feiticeiro do Vazio',
    prompt: 'Arte de anime, um jovem feiticeiro com cabelo preto, olhos roxos brilhantes, vestindo um manto escuro com runas cósmicas, manipulando energia do vazio, nebulosa ao fundo, trending no pixiv',
    imageBase64: '',
    story: 'Kael era um prodígio da Academia Arcana, mas sua sede por conhecimento o levou a estudar as artes proibidas do Vazio. Consumido e renascido por esse poder, ele agora caminha na linha tênue entre a sanidade e a loucura. Ele busca dominar a escuridão interior para impedir que ela consuma mundos inteiros, usando os próprios feitiços do abismo contra seus horrores.',
    price: '4.20 ETH'
  },
  {
    id: 'pre-3',
    name: 'Seraphina, a Vigia Alada',
    prompt: 'Estilo de anime, uma androide feminina com longos cabelos loiros, asas mecânicas de anjo, em pé no topo de um arranha-céu em uma cidade futurista flutuante ao pôr do sol, arte de alta qualidade',
    imageBase64: '',
    story: 'Seraphina é a guardiã silenciosa de Aethelburg, a última cidade flutuante da humanidade. Criada com tecnologia perdida, ela possui a alma de sua criadora e a força de mil máquinas. De seu poleiro nos pináculos da cidade, ela observa os céus, protegendo os habitantes de tempestades anômalas e caçadores de relíquias que cobiçam o coração de energia de Aethelburg. Suas asas não são para voar, mas para dispensar justiça.',
    price: '2.85 ETH'
  }
];

// Usaremos uma imagem de placeholder para os personagens pré-carregados.
// Esta função será chamada no componente para evitar armazenar grandes strings base64 aqui.
export const getPlaceholderImage = (seed: string): string => `https://picsum.photos/seed/${seed}/512/512`;