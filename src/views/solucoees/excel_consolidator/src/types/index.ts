export interface FileSheet {
  sheetName: string
  data: Record<string, unknown>[]
}

export interface ProcessedFile {
  id: string
  name: string
  sanitizedName: string
  size: string
  sizeBytes: number
  sheetCount: number
  rowsCount: number
  sheets: FileSheet[]
}

export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
}
