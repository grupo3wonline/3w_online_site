import { TituloEleitorDocument, ExtractionResult } from '@/types/documentTypes';

const TITULO_PATTERNS = {
  numero: [
    /(?:título\s+eleitor|titulo\s+eleitor|inscrição)[\s\n]*(?:n[°º]?)?[\s\n]*:?[\s\n]*(\d{4}\s?\d{4}\s?\d{4})/gi,
    /(?:^|\s)(\d{4}\s?\d{4}\s?\d{4})(?:\s|$)/gm,
  ],
  nome: [
    /(?:nome|eleitor)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  zona: [
    /(?:zona|zona\s+eleitoral)[\s\n]*:?[\s\n]*(\d{1,4})/gi,
  ],
  secao: [
    /(?:seção|secao|seção\s+eleitoral)[\s\n]*:?[\s\n]*(\d{1,4})/gi,
  ],
  municipio: [
    /(?:município|municipio|cidade)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s\-]+)/gi,
  ],
  estado: [
    /(?:estado|uf)[\s\n]*:?[\s\n]*([A-Z]{2})/gi,
    /(?:^|\s)([A-Z]{2})(?:\s|$)/gm,
  ],
  situacao: [
    /(?:situação|situacao)[\s\n]*:?[\s\n]*(regular|suspenso|cancelado|quitado)/gi,
  ],
  dataEmissao: [
    /(?:emissão|data\s+de\s+emissão)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
};

export const extractTituloEleitorInfo = (text: string): ExtractionResult => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let confidence = 0;
  
  // Verificar se é realmente um Título Eleitor
  const isTitulo = /(?:título\s+eleitor|titulo\s+eleitor|justiça\s+eleitoral)/gi.test(text);
  if (!isTitulo) {
    return {
      success: false,
      confidence: 0,
      errors: ['Documento não parece ser um Título Eleitor'],
    };
  }

  const document: Partial<TituloEleitorDocument> = {
    type: 'TITULO_ELEITOR',
    rawText: text,
  };

  // Extrair número do título
  for (const pattern of TITULO_PATTERNS.numero) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.numero = match[1].trim();
      confidence += 35;
      break;
    }
  }

  if (!document.numero) {
    errors.push('Número do Título Eleitor não encontrado');
    suggestions.push('Verifique se o número de 12 dígitos está visível');
  } else if (!validateTituloNumber(document.numero)) {
    errors.push('Número do Título Eleitor parece inválido');
    confidence -= 10;
  }

  // Extrair nome
  for (const pattern of TITULO_PATTERNS.nome) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.nome = match[1].trim();
      confidence += 25;
      break;
    }
  }

  if (!document.nome) {
    errors.push('Nome não encontrado');
    suggestions.push('Verifique se o nome está claramente visível');
  }

  // Extrair zona eleitoral
  for (const pattern of TITULO_PATTERNS.zona) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.zona = match[1].trim();
      confidence += 15;
      break;
    }
  }

  // Extrair seção eleitoral
  for (const pattern of TITULO_PATTERNS.secao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.secao = match[1].trim();
      confidence += 15;
      break;
    }
  }

  // Extrair outras informações
  for (const pattern of TITULO_PATTERNS.municipio) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.municipio = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of TITULO_PATTERNS.estado) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length === 2) {
      document.estado = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of TITULO_PATTERNS.situacao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.situacao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of TITULO_PATTERNS.dataEmissao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataEmissao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  return {
    success: confidence > 35,
    confidence: Math.min(confidence, 100),
    document: document as TituloEleitorDocument,
    errors: errors.length > 0 ? errors : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

const validateTituloNumber = (titulo: string): boolean => {
  const cleanTitulo = titulo.replace(/\D/g, '');
  return cleanTitulo.length === 12;
};