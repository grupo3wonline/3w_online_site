import { CPFDocument, ExtractionResult } from '@/types/documentTypes';

const CPF_PATTERNS = {
  numero: [
    /(?:cpf|cadastro\s+de\s+pessoa\s+física)[\s\n]*(?:n[°º]?)?[\s\n]*:?[\s\n]*(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/gi,
    /(?:^|\s)(\d{3}\.?\d{3}\.?\d{3}-?\d{2})(?:\s|$)/gm,
  ],
  nome: [
    /(?:nome|titular)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  dataNascimento: [
    /(?:nascimento|data\s+de\s+nascimento)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  situacao: [
    /(?:situação|situacao)[\s\n]*:?[\s\n]*(regular|suspenso|cancelado|nulo|pendente)/gi,
  ],
  dataInscricao: [
    /(?:inscrição|data\s+de\s+inscrição)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
};

export const extractCPFInfo = (text: string): ExtractionResult => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let confidence = 0;
  
  // Verificar se é realmente um CPF
  const isCPF = /(?:cpf|cadastro\s+de\s+pessoa\s+física)/gi.test(text) || 
                /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/.test(text);
  
  if (!isCPF) {
    return {
      success: false,
      confidence: 0,
      errors: ['Documento não parece conter informações de CPF'],
    };
  }

  const document: Partial<CPFDocument> = {
    type: 'CPF',
    rawText: text,
  };

  // Extrair número do CPF
  for (const pattern of CPF_PATTERNS.numero) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.numero = match[1].trim();
      confidence += 40;
      break;
    }
  }

  if (!document.numero) {
    errors.push('Número do CPF não encontrado');
    suggestions.push('Verifique se o CPF está visível no formato XXX.XXX.XXX-XX');
  } else if (!validateCPF(document.numero)) {
    errors.push('Número do CPF é inválido');
    confidence -= 20;
  }

  // Extrair nome
  for (const pattern of CPF_PATTERNS.nome) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.nome = match[1].trim();
      confidence += 30;
      break;
    }
  }

  if (!document.nome) {
    errors.push('Nome não encontrado');
    suggestions.push('Verifique se o nome está claramente visível');
  }

  // Extrair outras informações
  for (const pattern of CPF_PATTERNS.dataNascimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataNascimento = match[1].trim();
      confidence += 15;
      break;
    }
  }

  for (const pattern of CPF_PATTERNS.situacao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.situacao = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of CPF_PATTERNS.dataInscricao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataInscricao = match[1].trim();
      confidence += 5;
      break;
    }
  }

  return {
    success: confidence > 35,
    confidence: Math.min(confidence, 100),
    document: document as CPFDocument,
    errors: errors.length > 0 ? errors : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  return digit === parseInt(cleanCPF.charAt(10));
};