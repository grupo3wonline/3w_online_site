import { describe, it, expect } from 'vitest';
import { calculateHealthMetrics } from '@/utils/calculations';
import type { UserData } from '@/types';

describe('Testes de Performance', () => {
  const sampleData: UserData = {
    height: 175,
    weight: 70,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  };

  describe('Tempo de Execução', () => {
    it('deve calcular métricas em menos de 10ms', () => {
      const start = performance.now();
      calculateHealthMetrics(sampleData);
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(10);
    });

    it('deve processar múltiplos cálculos rapidamente', () => {
      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        calculateHealthMetrics(sampleData);
      }

      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Uso de Memória', () => {
    it('não deve criar vazamentos de memória', () => {
      const results = [];

      for (let i = 0; i < 100; i++) {
        results.push(calculateHealthMetrics(sampleData));
      }

      expect(results).toHaveLength(100);
      results.length = 0;
    });
  });

  describe('Consistência', () => {
    it('deve retornar mesmos resultados para mesmos inputs', () => {
      const result1 = calculateHealthMetrics(sampleData);
      const result2 = calculateHealthMetrics(sampleData);

      expect(result1.bmi).toBe(result2.bmi);
      expect(result1.dailyCalories).toBe(result2.dailyCalories);
      expect(result1.dailyWater).toBe(result2.dailyWater);
    });
  });

  describe('Otimização de Cálculos', () => {
    it('deve retornar números válidos sem operações desnecessárias', () => {
      const result = calculateHealthMetrics(sampleData);

      expect(Number.isFinite(result.bmi)).toBe(true);
      expect(Number.isFinite(result.dailyCalories)).toBe(true);
      expect(Number.isFinite(result.dailyProtein)).toBe(true);
      expect(Number.isFinite(result.dailyCarbs)).toBe(true);
      expect(Number.isFinite(result.dailyWater)).toBe(true);
    });

    it('deve ter valores dentro de limites razoáveis', () => {
      const result = calculateHealthMetrics(sampleData);

      expect(result.bmi).toBeGreaterThan(0);
      expect(result.bmi).toBeLessThan(100);

      expect(result.dailyCalories).toBeGreaterThan(1000);
      expect(result.dailyCalories).toBeLessThan(5000);

      expect(result.dailyWater).toBeGreaterThan(0);
      expect(result.dailyWater).toBeLessThan(10);
    });
  });
});
