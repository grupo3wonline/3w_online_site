import { GeneratorConfig } from '@/types/generator';

// Palavras para diferentes tipos de texto
const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const hipsterWords = [
  'artisan', 'craft', 'authentic', 'organic', 'sustainable', 'vinyl', 'fixie',
  'beard', 'mustache', 'hipster', 'brooklyn', 'artisanal', 'locavore', 'farm',
  'table', 'kale', 'quinoa', 'kombucha', 'meditation', 'yoga', 'mindfulness',
  'vintage', 'retro', 'aesthetic', 'minimalist', 'curated', 'handcrafted',
  'small', 'batch', 'indie', 'underground', 'alternative', 'conscious',
  'eco', 'friendly', 'ethically', 'sourced', 'fair', 'trade', 'bicycle',
  'coffee', 'roastery', 'third', 'wave', 'pour', 'over', 'single', 'origin'
];

const mussumWords = [
  'mussum', 'ipsum', 'cacilds', 'vidis', 'litro', 'abertis', 'consetis', 'adipiscin',
  'mé', 'faiz', 'elementum', 'girarzis', 'nisi', 'eros', 'vermeio', 'tá', 'deprimidis',
  'eu', 'facilisi', 'nam', 'liber', 'tempor', 'cum', 'soluta', 'nobis', 'eleifend',
  'option', 'congue', 'nihil', 'imperdiet', 'doming', 'placerat', 'facer', 'possim',
  'assum', 'posuere', 'interdum', 'quam', 'pelentesque', 'habitant', 'morbi', 'tristique',
  'senectus', 'netus', 'malesuada', 'fames', 'ac', 'turpis', 'egestas', 'sápien',
  'orci', 'rhoncus', 'est', 'pellentesque', 'elit', 'ullamcorper', 'dignissim', 'cras'
];

const creativeWords = [
  'magical', 'wizard', 'wand', 'spell', 'potion', 'enchanted', 'mystical', 'ancient',
  'dragon', 'phoenix', 'unicorn', 'castle', 'kingdom', 'quest', 'adventure', 'hero',
  'destiny', 'prophecy', 'legend', 'mythical', 'ethereal', 'celestial', 'divine',
  'sacred', 'powerful', 'mysterious', 'forbidden', 'secret', 'hidden', 'lost',
  'treasure', 'artifact', 'relic', 'scroll', 'tome', 'grimoire', 'crystal', 'gem'
];

const mussumPhrases = [
  'Tá tranquilo, tá favorável!',
  'Suco de cevadiss, é um leite divinis!',
  'Manduma pindureta quium dia nois paga!',
  'Todo mundo vê os porris que eu tomo!',
  'Casamentiss faiz malandris se pirulitá!',
  'Interessantiss quisso pudia ce receita de bolis!',
  'Praesent malesuada urna nisi!',
  'Viva Forevis aptent taciti sociosqu!',
  'Nullam volutpat risus nec leo commodo!',
  'Quem manda na minha terra sou euzis!'
];

const hipsterPhrases = [
  'This is artisanal content.',
  'Sustainably sourced text.',
  'Craft beer for your eyes.',
  'Locally sourced lorem ipsum.',
  'Ethically harvested words.',
  'Small batch typography.',
  'Organic paragraph farming.'
];

const creativeStarters = [
  'In a realm far beyond mortal comprehension',
  'The ancient prophecy spoke of',
  'Through the mists of time',
  'In the heart of the enchanted forest',
  'Legend tells of a hero who',
  'The magical artifact was said to',
  'In the shadow of the great castle'
];

function getWords(textType: string): string[] {
  switch (textType) {
    case 'hipster':
      return hipsterWords;
    case 'mussum':
      return mussumWords;
    case 'creative':
      return creativeWords;
    default:
      return loremWords;
  }
}

function getPhrases(textType: string): string[] {
  switch (textType) {
    case 'mussum':
      return mussumPhrases;
    case 'hipster':
      return hipsterPhrases;
    case 'creative':
      return creativeStarters;
    default:
      return [];
  }
}

function getWordsPerSize(size: string): { min: number; max: number } {
  switch (size) {
    case 'small':
      return { min: 20, max: 40 };
    case 'large':
      return { min: 100, max: 150 };
    default: // medium
      return { min: 50, max: 80 };
  }
}

function generateWords(textType: string, quantity: number): string {
  const words = getWords(textType);
  const phrases = getPhrases(textType);
  const result = [];

  for (let i = 0; i < quantity; i++) {
    if (textType === 'mussum' && Math.random() < 0.1 && result.length > 5) {
      result.push(phrases[Math.floor(Math.random() * phrases.length)]);
    } else if (textType === 'hipster' && Math.random() < 0.08 && result.length > 3) {
      result.push(phrases[Math.floor(Math.random() * phrases.length)]);
    } else {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
  }

  return result.join(' ') + '.';
}

function generateParagraphs(textType: string, quantity: number, size: string): string {
  const words = getWords(textType);
  const phrases = getPhrases(textType);
  const { min, max } = getWordsPerSize(size);
  const result = [];

  for (let i = 0; i < quantity; i++) {
    const paragraphLength = Math.floor(Math.random() * (max - min + 1)) + min;
    const paragraphWords = [];

    // Add special starter for creative type
    if (textType === 'creative' && Math.random() < 0.4) {
      paragraphWords.push(phrases[Math.floor(Math.random() * phrases.length)]);
    }
    
    // Add mussum phrase at the beginning sometimes
    if (textType === 'mussum' && Math.random() < 0.3) {
      paragraphWords.push(phrases[Math.floor(Math.random() * phrases.length)]);
    }

    for (let j = paragraphWords.length; j < paragraphLength; j++) {
      if (textType === 'mussum' && Math.random() < 0.08 && paragraphWords.length > 5) {
        paragraphWords.push(phrases[Math.floor(Math.random() * phrases.length)]);
      } else if (textType === 'hipster' && Math.random() < 0.06 && paragraphWords.length > 3) {
        paragraphWords.push(phrases[Math.floor(Math.random() * phrases.length)]);
      } else {
        paragraphWords.push(words[Math.floor(Math.random() * words.length)]);
      }
    }

    const paragraph = paragraphWords.join(' ');
    result.push(paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + '.');
  }

  return result.join('\n\n');
}

function generateLists(textType: string, quantity: number): string {
  const words = getWords(textType);
  const result = [];

  for (let i = 0; i < quantity; i++) {
    const itemLength = Math.floor(Math.random() * 8) + 3; // 3-10 words per item
    const itemWords = [];
    
    for (let j = 0; j < itemLength; j++) {
      itemWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    const item = itemWords.join(' ');
    result.push(item.charAt(0).toUpperCase() + item.slice(1));
  }

  return result.join('\n');
}

export function generateText(config: GeneratorConfig): string {
  const { textType, format, size, quantity } = config;

  switch (format) {
    case 'words':
      return generateWords(textType, quantity);
    case 'lists':
      return generateLists(textType, quantity);
    case 'paragraphs':
    default:
      return generateParagraphs(textType, quantity, size);
  }
}