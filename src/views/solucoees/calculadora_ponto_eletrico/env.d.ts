/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_SITE_URL: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_GA_ID?: string
  readonly VITE_GTM_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module 'vue3-apexcharts' {
  import type { DefineComponent, Plugin } from 'vue'
  const VueApexCharts: DefineComponent<Record<string, unknown>> & Plugin
  export default VueApexCharts
}
