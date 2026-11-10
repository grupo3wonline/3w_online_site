/**
 * Analytics utilities for tracking user interactions
 */

export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

/**
 * Track custom event with Google Analytics
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  }
}

/**
 * Track page view
 */
export function trackPageView(page: string, title?: string): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-J06THXX0MW', {
      page_path: page,
      page_title: title,
    })
  }
}

/**
 * Track conversion event
 */
export function trackConversion(label: string, value?: number): void {
  trackEvent({
    category: 'Conversion',
    action: 'convert_script',
    label,
    value,
  })
}

/**
 * Track download event
 */
export function trackDownload(filename: string): void {
  trackEvent({
    category: 'Download',
    action: 'download_srt',
    label: filename,
  })
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent({
    category: 'Button',
    action: 'click',
    label: location ? `${buttonName} - ${location}` : buttonName,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent({
    category: 'Form',
    action: success ? 'submit_success' : 'submit_error',
    label: formName,
  })
}

/**
 * Track error
 */
export function trackError(errorName: string, errorMessage?: string): void {
  trackEvent({
    category: 'Error',
    action: errorName,
    label: errorMessage,
  })
}

/**
 * Track timing (performance metrics)
 */
export function trackTiming(category: string, variable: string, time: number, label?: string): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: variable,
      value: time,
      event_category: category,
      event_label: label,
    })
  }
}

/**
 * Track user engagement
 */
export function trackEngagement(action: string, durationSeconds?: number): void {
  trackEvent({
    category: 'Engagement',
    action,
    value: durationSeconds,
  })
}
