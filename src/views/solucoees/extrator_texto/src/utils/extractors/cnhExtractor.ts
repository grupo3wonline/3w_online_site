import { CNHDocument, ExtractionResult } from '@/types/documentTypes';

const CNH_PATTERNS = {
  numero: [
    /(?:cnh|carteira\s+nacional\s+de\s+habilitação|registro)[\s\n]*(?:n[°º]?)?[\s\n]*:?[\s\n]*(\d{11})/gi,
    /(?:^|\s)(\d{11})(?:\s|$)/gm,
  ],
  nome: [
    /(?:nome|titular)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  cpf: [
    /(?:cpf)[\s\n]*:?[\s\n]*(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/gi,
  ],
  rg: [
    /(?:rg|doc\.?\s+identidade)[\s\n]*:?[\s\n]*(\d{1,2}\.?\d{3}\.?\d{3}-?[0-9xX])/gi,
  ],
  dataNascimento: [
    /(?:nascimento|data\s+nasc|dt\.?\s+nasc)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  categoria: [
    /(?:categoria|cat)[\s\n]*:?[\s\n]*([ABCDE]+)/gi,
    /(?:^|\s)([ABCDE]{1,5})(?:\s|$)/gm,
  ],
  dataExpedicao: [
    /(?:1ª\s+habilitação|primeira\s+habilitação|expedição)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  dataVencimento: [
    /(?:validade|válido\s+até|vencimento)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  localExpedicao: [
    /(?:local|expedido\s+em)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s,\-\/]+)/gi,
  ],
  observacoes: [
    /(?:observações|obs)[\s\n]*:?[\s\n]*([A-Za-z0-9\s\-,\.]+)/gi,
  ],
};

export const extractCNHInfo = (text: string): ExtractionResult => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let confidence = 0;
  
  // Verificar se é realmente uma CNH
  const isCNH = /(?:cnh|carteira\s+nacional\s+de\s+habilitação)/gi.test(text);
  if (!isCNH) {
    return {
      success: false,
      confidence: 0,
      errors: ['Documento não parece ser uma CNH'],
    };
  }

  const document: Partial<CNHDocument> = {
    type: 'CNH',
    rawText: text,
  };

  // Extrair número da CNH
  for (const pattern of CNH_PATTERNS.numero) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.numero = match[1].trim();
      confidence += 35;
      break;
    }
  }

  if (!document.numero) {
    errors.push('Número da CNH não encontrado');
    suggestions.push('Verifique se o número de 11 dígitos está visível');
  } else if (!validateCNHNumber(document.numero)) {
    errors.push('Número da CNH parece inválido');
    confidence -= 15;
  }

  // Extrair nome
  for (const pattern of CNH_PATTERNS.nome) {
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

  // Extrair categoria (obrigatória para CNH)
  for (const pattern of CNH_PATTERNS.categoria) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.categoria = match[1].trim();
      confidence += 20;
      break;
    }
  }

  if (!document.categoria) {
    errors.push('Categoria da CNH não encontrada');
    suggestions.push('Verifique se a categoria (A, B, C, D, E) está visível');
  }

  // Extrair outras informações
  for (const pattern of CNH_PATTERNS.cpf) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.cpf = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.rg) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.rg = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.dataNascimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataNascimento = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.dataExpedicao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataExpedicao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.dataVencimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataVencimento = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.localExpedicao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.localExpedicao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of CNH_PATTERNS.observacoes) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.observacoes = match[1].trim();
      confidence += 5;
      break;
    }
  }

  return {
    success: confidence > 40,
    confidence: Math.min(confidence, 100),
    document: document as CNHDocument,
    errors: errors.length > 0 ? errors : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

const validateCNHNumber = (cnh: string): boolean => {
  const cleanCNH = cnh.replace(/\D/g, '');
  return cleanCNH.length === 11 && !/^(\d)\1{10}$/.test(cleanCNH);
};