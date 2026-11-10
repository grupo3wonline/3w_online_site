// Gera src/lib/icon-data.ts contendo apenas os ícones usados na aplicação,
// evitando importar as coleções inteiras do Iconify no bundle final.
import { getIcons } from "@iconify/utils";
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const lucide = require("@iconify-json/lucide/icons.json");
const faBrands = require("@iconify-json/fa6-brands/icons.json");

const LUCIDE_ICONS = [
  "calculator", "zap", "menu", "x", "sun", "moon", "help-circle", "home",
  "chevron-right", "mail", "globe", "loader-2", "cookie", "sparkles",
  "arrow-right", "arrow-left", "check-circle", "shield-check", "smartphone",
  "user-cog", "list-plus", "file-check", "lightbulb", "code-2", "code",
  "server", "database", "lock", "target", "external-link", "flame", "plus",
  "trash-2", "file-text", "map-pin-off", "shield-alert", "server-crash",
  "star", "route", "layers", "building-2", "rocket", "heart-handshake",
  "message-circle", "eraser", "receipt-text", "printer",
];
const FA_BRANDS_ICONS = ["whatsapp"];

const lucideSubset = getIcons(lucide, LUCIDE_ICONS);
const faSubset = getIcons(faBrands, FA_BRANDS_ICONS);

if (!lucideSubset) throw new Error("Falha ao extrair ícones do Lucide");
if (!faSubset) throw new Error("Falha ao extrair ícones do Font Awesome Brands");

const content = `// ARQUIVO GERADO AUTOMATICAMENTE por scripts/generate-icons.mjs
// Não editar manualmente. Rode "npm run icons" para regenerar.
import type { IconifyJSON } from "@iconify/vue";

export const lucideSubset: IconifyJSON = ${JSON.stringify(lucideSubset)};
export const faBrandsSubset: IconifyJSON = ${JSON.stringify(faSubset)};
`;

mkdirSync("src/lib", { recursive: true });
writeFileSync("src/lib/icon-data.ts", content);
console.log(
  `icon-data.ts gerado: ${Object.keys(lucideSubset.icons).length} ícones lucide, ${Object.keys(faSubset.icons).length} fa6-brands`
);
