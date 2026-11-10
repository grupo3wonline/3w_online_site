import { describe, it, expect, beforeEach } from 'vitest';
import { getConsent, setConsent, hasStoredConsent, clearConsent } from '@/utils/consent';

describe('Consentimento de Cookies (LGPD/GDPR/CCPA/POPIA)', () => {
  beforeEach(() => {
    clearConsent();
    // Limpa flags de injeção entre testes
    const win = window as unknown as Record<string, unknown>;
    delete win._gaInjected;
    delete win._gtmInjected;
  });

  it('retorna preferências padrão sem consentimento salvo', () => {
    const prefs = getConsent();
    expect(prefs.essential).toBe(true);
    expect(prefs.analytics).toBe(false);
    expect(prefs.marketing).toBe(false);
  });

  it('hasStoredConsent é falso antes de qualquer escolha', () => {
    expect(hasStoredConsent()).toBe(false);
  });

  it('persiste as preferências escolhidas', () => {
    setConsent({ essential: true, analytics: true, marketing: false });
    expect(hasStoredConsent()).toBe(true);
    const prefs = getConsent();
    expect(prefs.analytics).toBe(true);
    expect(prefs.marketing).toBe(false);
  });

  it('essencial permanece sempre verdadeiro', () => {
    setConsent({ essential: true, analytics: false, marketing: false });
    expect(getConsent().essential).toBe(true);
  });

  it('registra evento de consentimento no dataLayer', () => {
    setConsent({ essential: true, analytics: true, marketing: true });
    const win = window as unknown as { dataLayer?: unknown[] };
    expect(Array.isArray(win.dataLayer)).toBe(true);
    const hasUpdate = win.dataLayer!.some(
      (e) => typeof e === 'object' && e !== null && 'event' in e && (e as { event: string }).event === 'consent_update'
    );
    expect(hasUpdate).toBe(true);
  });

  it('não injeta scripts de analytics quando recusado', () => {
    setConsent({ essential: true, analytics: false, marketing: false });
    const win = window as unknown as Record<string, unknown>;
    expect(win._gaInjected).toBeUndefined();
    expect(win._gtmInjected).toBeUndefined();
  });

  it('clearConsent remove a escolha salva', () => {
    setConsent({ essential: true, analytics: true, marketing: true });
    clearConsent();
    expect(hasStoredConsent()).toBe(false);
  });
});
