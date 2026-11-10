import { addCollection } from "@iconify/vue";
import { lucideSubset, faBrandsSubset } from "./icon-data";

/**
 * Registra offline apenas os ícones usados (gerados em build-time por
 * scripts/generate-icons.mjs), mantendo o bundle enxuto e sem depender
 * da API online do Iconify.
 */
export function registerIcons() {
  addCollection(lucideSubset);
  addCollection(faBrandsSubset);
}
