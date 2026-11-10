export interface BaseDocument {
  type: string;
  confidence: number;
  rawText: string;
}

export interface RGDocument extends BaseDocument {
  type: 'RG';
  numero: string;
  nome: string;
  nomePai?: string;
  nomeMae?: string;
  dataNascimento?: string;
  naturalidade?: string;
  orgaoExpedidor?: string;
  dataExpedicao?: string;
  estadoCivil?: string;
}

export interface CPFDocument extends BaseDocument {
  type: 'CPF';
  numero: string;
  nome: string;
  dataNascimento?: string;
  situacao?: string;
  dataInscricao?: string;
}

export interface CNHDocument extends BaseDocument {
  type: 'CNH';
  numero: string;
  nome: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: string;
  categoria: string;
  dataExpedicao?: string;
  dataVencimento?: string;
  localExpedicao?: string;
  observacoes?: string;
}

export interface TituloEleitorDocument extends BaseDocument {
  type: 'TITULO_ELEITOR';
  numero: string;
  nome: string;
  zona?: string;
  secao?: string;
  municipio?: string;
  estado?: string;
  situacao?: string;
  dataEmissao?: string;
}

export interface ReservistaDocument extends BaseDocument {
  type: 'RESERVISTA';
  numero: string;
  nome: string;
  cpf?: string;
  categoria?: string;
  regiao?: string;
  dataIncorporacao?: string;
  dataLicenciamento?: string;
  situacao?: string;
}

export interface PassaporteDocument extends BaseDocument {
  type: 'PASSAPORTE';
  numero: string;
  nome: string;
  nacionalidade?: string;
  dataNascimento?: string;
  localNascimento?: string;
  dataExpedicao?: string;
  dataVencimento?: string;
  autoridade?: string;
  cpf?: string;
}

export type DocumentType = RGDocument | CPFDocument | CNHDocument | 
  TituloEleitorDocument | ReservistaDocument | PassaporteDocument;

export interface ExtractionResult {
  success: boolean;
  confidence: number;
  document?: DocumentType;
  errors?: string[];
  suggestions?: string[];
}