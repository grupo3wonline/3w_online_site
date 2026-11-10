import { defineStore } from "pinia";
import { ref, watch } from "vue";

const STORAGE_KEY = "calc-prog-consent";

export interface ConsentState {
  necessary: boolean; // sempre true
  analytics: boolean;
  decided: boolean;
}

/**
 * Store de consentimento de cookies para conformidade
 * LGPD / GDPR / CCPA / POPIA. O consentimento controla o
 * disparo de scripts de analytics (GA4/GTM).
 */
export const useConsentStore = defineStore("consent", () => {
  const load = (): ConsentState => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { necessary: true, ...JSON.parse(raw) };
    } catch {
      /* ignora dados corrompidos */
    }
    return { necessary: true, analytics: false, decided: false };
  };

  const state = ref<ConsentState>(load());

  function acceptAll() {
    state.value = { necessary: true, analytics: true, decided: true };
  }

  function rejectAll() {
    state.value = { necessary: true, analytics: false, decided: true };
  }

  function save(partial: Partial<ConsentState>) {
    state.value = { ...state.value, ...partial, necessary: true, decided: true };
  }

  function reopen() {
    state.value = { ...state.value, decided: false };
  }

  function syncGtag() {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("consent", "update", {
        analytics_storage: state.value.analytics ? "granted" : "denied",
        ad_storage: "denied",
      });
    }
  }

  watch(
    state,
    (next) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ analytics: next.analytics, decided: next.decided })
      );
      syncGtag();
    },
    { deep: true }
  );

  return { state, acceptAll, rejectAll, save, reopen, syncGtag };
});
