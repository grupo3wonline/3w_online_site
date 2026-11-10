export const ALLOWED_EXTENSIONS = ['.xlsx', '.xls', '.csv'] as const

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50MB
export const MAX_FILE_SIZE_LABEL = '50MB'

export const DEFAULT_PAGE_SIZE = 15
export const PAGE_SIZE_OPTIONS = [15, 50, 100] as const

export const APP_NAME = 'Consolidador Excel'
export const APP_VERSION = 'v2.0'
export const APP_DESCRIPTION =
  'Unifique múltiplos arquivos Excel & CSV em uma única tabela consolidada'

export const DEVELOPER_CREDITS = 'HOTWYL | WILLFROMBRASIL'

/** Magic bytes para validação de integridade de arquivos binários */
export const MAGIC_BYTES = {
  /** PK header — XLSX é baseado em ZIP */
  ZIP: [0x50, 0x4b, 0x03, 0x04],
  /** Compound File Binary — formato XLS legado */
  CFB: [0xd0, 0xcf, 0x11, 0xe0],
} as const
