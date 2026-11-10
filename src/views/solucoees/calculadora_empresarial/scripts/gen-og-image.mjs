// Gera public/og-image.jpg (1200x630) a partir do SVG de design.
// Uso: node scripts/gen-og-image.mjs
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(resolve(__dirname, 'og-image.svg'))
const out = resolve(__dirname, '../public/og-image.jpg')

await sharp(svg).jpeg({ quality: 88 }).toFile(out)
console.log('OG image gerada em', out)
