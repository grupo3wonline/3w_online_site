export interface SRTBlock {
  index: number
  startTime: string
  endTime: string
  text: string
}

export interface ConversionConfig {
  charactersPerBlock: number
  minWordsPerBlock: number
  maxWordsPerBlock: number
  blockDuration: number
  intervalBetweenBlocks: number
}

export interface ConversionResult {
  srtContent: string
  blocks: SRTBlock[]
  totalBlocks: number
  totalDuration: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface TestimonialData {
  name: string
  role: string
  content: string
  avatar?: string
  rating: number
}