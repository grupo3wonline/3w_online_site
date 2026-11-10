import mime from 'mime'

/**
 * Dispara o download de um conteúdo como arquivo, inferindo o MIME type
 * a partir da extensão quando não informado.
 */
export function downloadFile(content: BlobPart, filename: string, mimeType?: string) {
  const type = mimeType ?? mime.getType(filename) ?? 'application/octet-stream'
  const blob = content instanceof Blob ? content : new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
