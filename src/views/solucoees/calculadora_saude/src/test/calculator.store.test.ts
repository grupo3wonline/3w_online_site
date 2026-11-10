import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCalculatorStore } from '@/stores/calculator';
import type { UserData } from '@/types';

describe('Fluxo da Calculadora (store Pinia)', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const sample: UserData = {
    height: 175,
    weight: 70,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
  };

  it('inicia sem resultados', () => {
    const store = useCalculatorStore();
    expect(store.showResults).toBe(false);
    expect(store.metrics).toBeNull();
  });

  it('calcula e expõe métricas coerentes', () => {
    const store = useCalculatorStore();
    store.calculate(sample);
    expect(store.showResults).toBe(true);
    expect(store.metrics).not.toBeNull();
    expect(store.metrics!.bmi).toBeCloseTo(22.9, 1);
    expect(store.metrics!.bmiCategory).toBe('Peso normal');
    expect(store.metrics!.dailyCalories).toBeGreaterThan(2000);
  });

  it('limpa o estado corretamente', () => {
    const store = useCalculatorStore();
    store.calculate(sample);
    store.clear();
    expect(store.showResults).toBe(false);
    expect(store.metrics).toBeNull();
    expect(store.userData.height).toBe(0);
  });
});
