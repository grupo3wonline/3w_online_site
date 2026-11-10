/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_GA_ID: string
  readonly VITE_GTM_ID: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue3-apexcharts'

interface Window {
  dataLayer: unknown[]
  gtag: (...args: unknown[]) => void
}
