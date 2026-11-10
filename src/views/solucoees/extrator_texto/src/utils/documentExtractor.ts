export interface DocumentInfo {
  type: string;
  data: Record<string, string>;
  confidence: number;
}

export interface BrazilianDocument {
  cpf?: string;
  rg?: string;
  cnh?: string;
  tituloEleitor?: string;
  reservista?: string;
  passaporte?: string;
  name?: string;
  birthDate?: string;
  motherName?: string;
  fatherName?: string;
  naturalidade?: string;
  validUntil?: string;
  issuedBy?: string;
  category?: string;
}

// Padrões regex para documentos brasileiros
const patterns = {
  cpf: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
  rg: /\b\d{1,2}\.?\d{3}\.?\d{3}-?[0-9X]\b/g,
  cnh: /\b\d{11}\b/g,
  tituloEleitor: /\b\d{4}\s?\d{4}\s?\d{4}\b/g,
  reservista: /\b\d{2}\.\d{3}\.\d{3}-?\d{1}\b/g,
  passaporte: /\b[A-Z]{2}\d{6}\b/g,
  // Padrões para datas
  birthDate: /(?:nascimento|nasc|data\s+de\s+nascimento)[\s:]*(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\.\d{1,2}\.\d{4})/gi,
  validUntil: /(?:validade|válido\s+até|vencimento)[\s:]*(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\.\d{1,2}\.\d{4})/gi,
  // Padrões para nomes
  name: /(?:nome|titular)[\s:]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s]+)/gi,
  motherName: /(?:mãe|nome\s+da\s+mãe|filiação\s+materna)[\s:]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s]+)/gi,
  fatherName: /(?:pai|nome\s+do\s+pai|filiação\s+paterna)[\s:]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s]+)/gi,
  naturalidade: /(?:naturalidade|natural\s+de)[\s:]*([A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s,\-]+)/gi,
  issuedBy: /(?:expedido\s+por|órgão\s+expedidor|emissor)[\s:]*([A-Z\s\-\/]+)/gi,
  category: /(?:categoria|cat)[\s:]*([A-Z]+)/gi,
};

// Função para validar CPF
export const validateCPF = (cpf: string): boolean => {
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

// Função para detectar tipo de documento
export const detectDocumentType = (text: string): string => {
  const upperText = text.toUpperCase();
  
  if (upperText.includes('CARTEIRA NACIONAL DE HABILITAÇÃO') || upperText.includes('CNH')) {
    return 'CNH';
  }
  if (upperText.includes('REGISTRO GERAL') || upperText.includes('CARTEIRA DE IDENTIDADE') || upperText.includes('RG')) {
    return 'RG';
  }
  if (upperText.includes('TÍTULO ELEITORAL') || upperText.includes('TITULO ELEITOR')) {
    return 'TÍTULO ELEITOR';
  }
  if (upperText.includes('CERTIFICADO DE RESERVISTA')) {
    return 'RESERVISTA';
  }
  if (upperText.includes('PASSAPORTE') || upperText.includes('PASSPORT')) {
    return 'PASSAPORTE';
  }
  if (upperText.includes('CPF') || upperText.includes('CADASTRO DE PESSOA FÍSICA')) {
    return 'CPF';
  }
  
  return 'DOCUMENTO GENÉRICO';
};

// Função para extrair informações estruturadas
export const extractDocumentInfo = (text: string): BrazilianDocument => {
  const info: BrazilianDocument = {};
  
  // Extrair CPF
  const cpfMatches = text.match(patterns.cpf);
  if (cpfMatches) {
    const validCPFs = cpfMatches.filter(cpf => validateCPF(cpf));
    if (validCPFs.length > 0) {
      info.cpf = validCPFs[0];
    }
  }
  
  // Extrair RG
  const rgMatches = text.match(patterns.rg);
  if (rgMatches) {
    info.rg = rgMatches[0];
  }
  
  // Extrair CNH
  const cnhMatches = text.match(patterns.cnh);
  if (cnhMatches) {
    info.cnh = cnhMatches[0];
  }
  
  // Extrair Título Eleitor
  const tituloMatches = text.match(patterns.tituloEleitor);
  if (tituloMatches) {
    info.tituloEleitor = tituloMatches[0];
  }
  
  // Extrair Reservista
  const reservistaMatches = text.match(patterns.reservista);
  if (reservistaMatches) {
    info.reservista = reservistaMatches[0];
  }
  
  // Extrair Passaporte
  const passaporteMatches = text.match(patterns.passaporte);
  if (passaporteMatches) {
    info.passaporte = passaporteMatches[0];
  }
  
  // Extrair informações pessoais
  const nameMatch = text.match(patterns.name);
  if (nameMatch && nameMatch[1]) {
    info.name = nameMatch[1].trim();
  }
  
  const birthDateMatch = text.match(patterns.birthDate);
  if (birthDateMatch && birthDateMatch[1]) {
    info.birthDate = birthDateMatch[1].trim();
  }
  
  const motherNameMatch = text.match(patterns.motherName);
  if (motherNameMatch && motherNameMatch[1]) {
    info.motherName = motherNameMatch[1].trim();
  }
  
  const fatherNameMatch = text.match(patterns.fatherName);
  if (fatherNameMatch && fatherNameMatch[1]) {
    info.fatherName = fatherNameMatch[1].trim();
  }
  
  const naturalidadeMatch = text.match(patterns.naturalidade);
  if (naturalidadeMatch && naturalidadeMatch[1]) {
    info.naturalidade = naturalidadeMatch[1].trim();
  }
  
  const validUntilMatch = text.match(patterns.validUntil);
  if (validUntilMatch && validUntilMatch[1]) {
    info.validUntil = validUntilMatch[1].trim();
  }
  
  const issuedByMatch = text.match(patterns.issuedBy);
  if (issuedByMatch && issuedByMatch[1]) {
    info.issuedBy = issuedByMatch[1].trim();
  }
  
  const categoryMatch = text.match(patterns.category);
  if (categoryMatch && categoryMatch[1]) {
    info.category = categoryMatch[1].trim();
  }
  
  return info;
};

// Função para formatar informações extraídas
export const formatExtractedInfo = (info: BrazilianDocument, documentType: string): string => {
  let formatted = `=== ${documentType} ===\n\n`;
  
  if (info.name) formatted += `Nome: ${info.name}\n`;
  if (info.cpf) formatted += `CPF: ${info.cpf}\n`;
  if (info.rg) formatted += `RG: ${info.rg}\n`;
  if (info.cnh) formatted += `CNH: ${info.cnh}\n`;
  if (info.tituloEleitor) formatted += `Título Eleitor: ${info.tituloEleitor}\n`;
  if (info.reservista) formatted += `Reservista: ${info.reservista}\n`;
  if (info.passaporte) formatted += `Passaporte: ${info.passaporte}\n`;
  if (info.birthDate) formatted += `Data de Nascimento: ${info.birthDate}\n`;
  if (info.motherName) formatted += `Nome da Mãe: ${info.motherName}\n`;
  if (info.fatherName) formatted += `Nome do Pai: ${info.fatherName}\n`;
  if (info.naturalidade) formatted += `Naturalidade: ${info.naturalidade}\n`;
  if (info.validUntil) formatted += `Válido até: ${info.validUntil}\n`;
  if (info.issuedBy) formatted += `Expedido por: ${info.issuedBy}\n`;
  if (info.category) formatted += `Categoria: ${info.category}\n`;
  
  return formatted;
};