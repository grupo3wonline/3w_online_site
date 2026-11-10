export interface ConsentPrefs {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'cookiePreferences';
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-WVMJV7G6';
const GA_ID = import.meta.env.VITE_GA_ID || 'G-J06THXX0MW';

const DEFAULT_PREFS: ConsentPrefs = { essential: true, analytics: false, marketing: false };

type WindowWithDataLayer = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  _gtmInjected?: boolean;
  _gaInjected?: boolean;
};

const w = (): WindowWithDataLayer => window as WindowWithDataLayer;

export function getConsent(): ConsentPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function hasStoredConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function setConsent(prefs: ConsentPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* armazenamento indisponível — segue sem persistir */
  }

  try {
    const win = w();
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ event: 'consent_update', consent: prefs });
    if (prefs.analytics && prefs.marketing) {
      win.dataLayer.push({ event: 'consent_accept_all' });
    }
    if (!prefs.analytics && !prefs.marketing) {
      win.dataLayer.push({ event: 'consent_rejected' });
    }
  } catch {
    /* noop */
  }

  if (prefs.analytics) loadGA();
  if (prefs.marketing) loadGTM();
}

export function loadGTM(): void {
  if (typeof window === 'undefined') return;
  const win = w();
  if (win._gtmInjected) return;
  win._gtmInjected = true;

  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  try {
    const noscriptId = 'gtm-noscript-injected';
    if (!document.getElementById(noscriptId)) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      iframe.id = noscriptId;
      iframe.title = 'gtm';
      document.body.insertBefore(iframe, document.body.firstChild);
    }
  } catch {
    /* noop */
  }
}

export function loadGA(): void {
  if (typeof window === 'undefined') return;
  const win = w();
  if (win._gaInjected) return;
  win._gaInjected = true;

  const existing = document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`);
  if (!existing) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }

  win.dataLayer = win.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    win.dataLayer!.push(args);
  };
  win.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

export function initConsent(): void {
  const prefs = getConsent();
  if (prefs.analytics) loadGA();
  if (prefs.marketing) loadGTM();
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
