/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

// Diretivas do @vueuse/motion usadas nos templates
declare module 'vue' {
  interface ComponentCustomProperties {
    vMotionSlideVisibleOnceLeft?: unknown
  }
}
export {}
