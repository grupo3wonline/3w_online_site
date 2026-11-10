import { RGDocument, ExtractionResult } from '@/types/documentTypes';

const RG_PATTERNS = {
  numero: [
    /(?:rg|registro\s+geral|carteira\s+de\s+identidade)[\s\n]*(?:n[°º]?)?[\s\n]*:?[\s\n]*(\d{1,2}\.?\d{3}\.?\d{3}-?[0-9xX])/gi,
    /(?:^|\s)(\d{1,2}\.?\d{3}\.?\d{3}-?[0-9xX])(?:\s|$)/gm,
  ],
  nome: [
    /(?:nome|titular)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  nomePai: [
    /(?:pai|nome\s+do\s+pai|filiação\s+paterna)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  nomeMae: [
    /(?:mãe|nome\s+da\s+mãe|filiação\s+materna)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  dataNascimento: [
    /(?:nascimento|nasc|data\s+de\s+nascimento)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  naturalidade: [
    /(?:naturalidade|natural\s+de)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s,\-\/]+)/gi,
  ],
  orgaoExpedidor: [
    /(?:expedido\s+por|órgão\s+expedidor|emissor)[\s\n]*:?[\s\n]*([A-Z\s\-\/\.]+)/gi,
    /(?:ssp|iirgd|detran|pc|dgpc)[\s\n]*[\/\-]?[\s\n]*([A-Z]{2})/gi,
  ],
  dataExpedicao: [
    /(?:expedição|expedido\s+em|data\s+de\s+expedição)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  estadoCivil: [
    /(?:estado\s+civil)[\s\n]*:?[\s\n]*(solteiro|casado|divorciado|viúvo|separado)/gi,
  ],
};

export const extractRGInfo = (text: string): ExtractionResult => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let confidence = 0;
  
  // Verificar se é realmente um RG
  const isRG = /(?:rg|registro\s+geral|carteira\s+de\s+identidade)/gi.test(text);
  if (!isRG) {
    return {
      success: false,
      confidence: 0,
      errors: ['Documento não parece ser um RG'],
    };
  }

  const document: Partial<RGDocument> = {
    type: 'RG',
    rawText: text,
  };

  // Extrair número do RG
  for (const pattern of RG_PATTERNS.numero) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.numero = match[1].trim();
      confidence += 30;
      break;
    }
  }

  if (!document.numero) {
    errors.push('Número do RG não encontrado');
    suggestions.push('Verifique se o número está visível e legível na imagem');
  }

  // Extrair nome
  for (const pattern of RG_PATTERNS.nome) {
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

  // Extrair outras informações
  for (const pattern of RG_PATTERNS.nomePai) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.nomePai = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.nomeMae) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.nomeMae = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.dataNascimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataNascimento = match[1].trim();
      confidence += 15;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.naturalidade) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.naturalidade = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.orgaoExpedidor) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.orgaoExpedidor = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.dataExpedicao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataExpedicao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of RG_PATTERNS.estadoCivil) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.estadoCivil = match[1].trim();
      confidence += 5;
      break;
    }
  }

  // Validações adicionais
  if (document.numero && !validateRGNumber(document.numero)) {
    errors.push('Número do RG parece inválido');
    confidence -= 10;
  }

  return {
    success: confidence > 30,
    confidence: Math.min(confidence, 100),
    document: document as RGDocument,
    errors: errors.length > 0 ? errors : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

const validateRGNumber = (rg: string): boolean => {
  const cleanRG = rg.replace(/\D/g, '');
  return cleanRG.length >= 7 && cleanRG.length <= 9;
};