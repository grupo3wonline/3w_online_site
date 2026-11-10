export type TextType = 'lorem' | 'hipster' | 'mussum' | 'creative';
export type Format = 'paragraphs' | 'words' | 'lists';
export type Size = 'small' | 'medium' | 'large';

export interface GeneratorConfig {
  textType: TextType;
  format: Format;
  size: Size;
  quantity: number;
}

export interface TextTypeInfo {
  id: TextType;
  name: string;
  description: string;
  color: string;
  badge: string;
  example: string;
}