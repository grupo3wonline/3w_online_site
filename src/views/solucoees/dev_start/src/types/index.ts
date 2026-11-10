export type ModuleType =
  | 'flowchart'
  | 'logic'
  | 'scratch'
  | 'portugol'
  | 'visualg'
  | 'php'
  | 'codepen'
  | 'challenges'

export type AIProvider = 'gemini' | 'groq' | 'openrouter'

export interface UserProfile {
  name: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  completed: boolean
  module: ModuleType
}

export interface ToolInfo {
  id: ModuleType
  route: string
  title: string
  short: string
  description: string
  icon: string
  color: string
  tips: string[]
}

export type ThemeMode = 'light' | 'dark'
