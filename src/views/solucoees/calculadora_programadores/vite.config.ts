import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/calculadora_programadores/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Divide os vendors pesados para melhorar o cache e a performance de carregamento.
        manualChunks: {
          vue: ["vue", "vue-router", "pinia"],
          motion: ["@vueuse/motion"],
          i18n: ["vue-i18n", "@intlify/core-base"],
          vendor: ["zod"],
        },
      },
    },
  },
});
