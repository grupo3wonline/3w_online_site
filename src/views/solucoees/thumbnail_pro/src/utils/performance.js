// Performance Monitoring e Web Vitals
export class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.startTime = performance.now()
    this.init()
  }

  init() {
    // Core Web Vitals
    this.measureCLS()
    this.measureFID()
    this.measureLCP()
    
    // Custom metrics
    this.measurePageLoad()
    this.measureThumbnailExtraction()
  }

  // Cumulative Layout Shift
  measureCLS() {
    let clsValue = 0
    let clsEntries = []

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push(entry)
        }
      }
      this.metrics.cls = clsValue
    })

    observer.observe({ entryTypes: ['layout-shift'] })
  }

  // First Input Delay
  measureFID() {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime
      }
    })

    observer.observe({ entryTypes: ['first-input'] })
  }

  // Largest Contentful Paint
  measureLCP() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.lcp = lastEntry.startTime
    })

    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }

  // Tempo de carregamento da página
  measurePageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime
      this.metrics.pageLoad = loadTime
      console.log(`⚡ Página carregada em ${loadTime.toFixed(2)}ms`)
    })
  }

  // Tempo de extração de thumbnail
  measureThumbnailExtraction() {
    this.extractionStart = null
    this.extractionEnd = null
  }

  startExtractionTimer() {
    this.extractionStart = performance.now()
  }

  endExtractionTimer() {
    if (this.extractionStart) {
      this.extractionEnd = performance.now()
      const extractionTime = this.extractionEnd - this.extractionStart
      this.metrics.thumbnailExtraction = extractionTime
      console.log(`🎯 Thumbnail extraído em ${extractionTime.toFixed(2)}ms`)
      return extractionTime
    }
  }

  // Enviar métricas para analytics
  sendMetrics() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metrics', {
        event_category: 'performance',
        custom_map: {
          metric_1: 'cls',
          metric_2: 'fid',
          metric_3: 'lcp',
          metric_4: 'page_load',
          metric_5: 'thumbnail_extraction'
        },
        cls: this.metrics.cls,
        fid: this.metrics.fid,
        lcp: this.metrics.lcp,
        page_load: this.metrics.pageLoad,
        thumbnail_extraction: this.metrics.thumbnailExtraction
      })
    }
  }

  // Relatório de performance
  getReport() {
    return {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      userAgent: navigator.userAgent,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        rtt: navigator.connection.rtt,
        downlink: navigator.connection.downlink
      } : null
    }
  }
}

// Instância global
export const performanceMonitor = new PerformanceMonitor()
