import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { HealthMetrics, UserData } from '@/types';
import { calculateHealthMetrics } from '@/utils/calculations';
import { getConsent } from '@/utils/consent';

const STORAGE_KEY = 'lastUserData';

const emptyUserData = (): UserData => ({
  height: 0,
  weight: 0,
  age: 0,
  gender: '',
  activityLevel: '',
  goal: '',
});

/** Restaura os últimos dados salvos (apenas se o usuário consentiu). */
function loadPersisted(): UserData | null {
  try {
    if (!getConsent().essential) return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...emptyUserData(), ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export const useCalculatorStore = defineStore('calculator', () => {
  const userData = ref<UserData>(emptyUserData());
  const metrics = ref<HealthMetrics | null>(null);
  const showResults = ref(false);
  const persist = ref(false);

  function calculate(data: UserData): void {
    userData.value = { ...data };
    metrics.value = calculateHealthMetrics(data);
    showResults.value = true;
    if (persist.value) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* noop */
      }
    }
  }

  function clear(): void {
    userData.value = emptyUserData();
    metrics.value = null;
    showResults.value = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }

  function getSavedData(): UserData | null {
    return loadPersisted();
  }

  return { userData, metrics, showResults, persist, calculate, clear, getSavedData };
});
