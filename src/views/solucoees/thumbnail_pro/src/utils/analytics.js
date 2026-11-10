// Google Analytics e outras ferramentas de métricas
export const analytics = {
  // Google Analytics 4
  GA_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Substitua pelo seu ID
  
  // Google Tag Manager
  GTM_ID: 'GTM-XXXXXXX', // Substitua pelo seu ID
  
  // Hotjar
  HOTJAR_ID: 'XXXXXXX', // Substitua pelo seu ID
  
  // Facebook Pixel
  FB_PIXEL_ID: 'XXXXXXXXXXXXXXX' // Substitua pelo seu ID
}

// Função para rastrear eventos
export function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters)
  }
}

// Função para rastrear conversões
export function trackConversion(conversionName, value = 0) {
  trackEvent('conversion', {
    event_category: 'engagement',
    event_label: conversionName,
    value: value
  })
}

// Eventos específicos da aplicação
export const events = {
  THUMBNAIL_EXTRACTED: 'thumbnail_extracted',
  DOWNLOAD_STARTED: 'download_started',
  DOWNLOAD_COMPLETED: 'download_completed',
  ERROR_OCCURRED: 'error_occurred',
  PAGE_VIEW: 'page_view'
}
