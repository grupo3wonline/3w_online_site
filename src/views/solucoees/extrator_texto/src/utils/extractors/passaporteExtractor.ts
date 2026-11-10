import { PassaporteDocument, ExtractionResult } from '@/types/documentTypes';

const PASSAPORTE_PATTERNS = {
  numero: [
    /(?:passaporte|passport)[\s\n]*(?:n[°º]?)?[\s\n]*:?[\s\n]*([A-Z]{2}\d{6})/gi,
    /(?:^|\s)([A-Z]{2}\d{6})(?:\s|$)/gm,
  ],
  nome: [
    /(?:nome|name|surname)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s]+)/gi,
  ],
  nacionalidade: [
    /(?:nacionalidade|nationality)[\s\n]*:?[\s\n]*([A-Za-z\s]+)/gi,
  ],
  dataNascimento: [
    /(?:nascimento|birth|date\s+of\s+birth)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  localNascimento: [
    /(?:local\s+de\s+nascimento|place\s+of\s+birth)[\s\n]*:?[\s\n]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç\s,\-\/]+)/gi,
  ],
  dataExpedicao: [
    /(?:expedição|emissão|issue\s+date)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  dataVencimento: [
    /(?:validade|vencimento|expiry\s+date)[\s\n]*:?[\s\n]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/gi,
  ],
  autoridade: [
    /(?:autoridade|authority|issued\s+by)[\s\n]*:?[\s\n]*([A-Z\s\-\/\.]+)/gi,
  ],
  cpf: [
    /(?:cpf)[\s\n]*:?[\s\n]*(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/gi,
  ],
};

export const extractPassaporteInfo = (text: string): ExtractionResult => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let confidence = 0;
  
  // Verificar se é realmente um Passaporte
  const isPassaporte = /(?:passaporte|passport|república\s+federativa\s+do\s+brasil)/gi.test(text);
  if (!isPassaporte) {
    return {
      success: false,
      confidence: 0,
      errors: ['Documento não parece ser um Passaporte'],
    };
  }

  const document: Partial<PassaporteDocument> = {
    type: 'PASSAPORTE',
    rawText: text,
  };

  // Extrair número do passaporte
  for (const pattern of PASSAPORTE_PATTERNS.numero) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.numero = match[1].trim();
      confidence += 35;
      break;
    }
  }

  if (!document.numero) {
    errors.push('Número do Passaporte não encontrado');
    suggestions.push('Verifique se o número do passaporte (2 letras + 6 dígitos) está visível');
  } else if (!validatePassaporteNumber(document.numero)) {
    errors.push('Número do Passaporte parece inválido');
    confidence -= 10;
  }

  // Extrair nome
  for (const pattern of PASSAPORTE_PATTERNS.nome) {
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
  for (const pattern of PASSAPORTE_PATTERNS.nacionalidade) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.nacionalidade = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.dataNascimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataNascimento = match[1].trim();
      confidence += 15;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.localNascimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.localNascimento = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.dataExpedicao) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataExpedicao = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.dataVencimento) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.dataVencimento = match[1].trim();
      confidence += 10;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.autoridade) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.autoridade = match[1].trim();
      confidence += 5;
      break;
    }
  }

  for (const pattern of PASSAPORTE_PATTERNS.cpf) {
    const match = text.match(pattern);
    if (match && match[1]) {
      document.cpf = match[1].trim();
      confidence += 10;
      break;
    }
  }

  return {
    success: confidence > 40,
    confidence: Math.min(confidence, 100),
    document: document as PassaporteDocument,
    errors: errors.length > 0 ? errors : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

const validatePassaporteNumber = (passaporte: string): boolean => {
  const cleanPassaporte = passaporte.replace(/\s/g, '');
  return /^[A-Z]{2}\d{6}$/.test(cleanPassaporte);
};