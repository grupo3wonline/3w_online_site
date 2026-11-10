import { describe, it, expect } from 'vitest';
import {
  calculateBMI,
  getBMICategory,
  getBMIRisk,
  calculateIdealWeight,
  calculateDailyWater,
  calculateDailyCalories,
  calculateDailyProtein,
  calculateDailyCarbs,
  calculateDailyFat,
  calculateBMR,
  calculateBodyFat,
  calculateGoalCalories,
  getGoalLabel,
  calculateHealthMetrics
} from '@/utils/calculations';
import type { UserData } from '@/types';

describe('Cálculos de Saúde', () => {
  describe('calculateBMI', () => {
    it('deve calcular IMC corretamente', () => {
      expect(calculateBMI(70, 175)).toBe(22.9);
      expect(calculateBMI(80, 180)).toBe(24.7);
      expect(calculateBMI(60, 160)).toBe(23.4);
    });

    it('deve validar valores extremos', () => {
      expect(calculateBMI(40, 150)).toBeLessThan(20);
      expect(calculateBMI(120, 170)).toBeGreaterThan(40);
    });
  });

  describe('getBMICategory', () => {
    it('deve retornar categoria correta', () => {
      expect(getBMICategory(17)).toBe('Abaixo do peso');
      expect(getBMICategory(22)).toBe('Peso normal');
      expect(getBMICategory(27)).toBe('Sobrepeso');
      expect(getBMICategory(32)).toBe('Obesidade grau I');
      expect(getBMICategory(37)).toBe('Obesidade grau II');
      expect(getBMICategory(42)).toBe('Obesidade grau III');
    });
  });

  describe('calculateIdealWeight', () => {
    it('deve calcular faixa de peso ideal', () => {
      const result = calculateIdealWeight(175);
      expect(result.min).toBeGreaterThan(0);
      expect(result.max).toBeGreaterThan(result.min);
      expect(result.min).toBeCloseTo(56.6, 0);
      expect(result.max).toBeCloseTo(76.3, 0);
    });
  });

  describe('calculateDailyWater', () => {
    it('deve calcular consumo diário de água', () => {
      expect(calculateDailyWater(70)).toBeCloseTo(2.45, 1);
      expect(calculateDailyWater(80)).toBeCloseTo(2.8, 1);
    });

    it('deve retornar valores positivos', () => {
      expect(calculateDailyWater(50)).toBeGreaterThan(0);
    });
  });

  describe('calculateDailyCalories', () => {
    it('deve calcular calorias para homem', () => {
      const userData: UserData = {
        weight: 75,
        height: 175,
        age: 30,
        gender: 'male',
        activityLevel: 'moderate',
        goal: 'maintain'
      };
      const calories = calculateDailyCalories(userData);
      expect(calories).toBeGreaterThan(2000);
      expect(calories).toBeLessThan(4000);
    });

    it('deve calcular calorias para mulher', () => {
      const userData: UserData = {
        weight: 60,
        height: 165,
        age: 25,
        gender: 'female',
        activityLevel: 'light',
        goal: 'lose'
      };
      const calories = calculateDailyCalories(userData);
      expect(calories).toBeGreaterThan(1500);
      expect(calories).toBeLessThan(3000);
    });
  });

  describe('calculateDailyProtein', () => {
    it('deve calcular proteína baseada no nível de atividade', () => {
      expect(calculateDailyProtein(70, 'sedentary')).toBeCloseTo(56, 0);
      expect(calculateDailyProtein(70, 'very-active')).toBeCloseTo(101, 0);
    });
  });

  describe('calculateDailyCarbs', () => {
    it('deve calcular carboidratos baseado em calorias', () => {
      const carbs = calculateDailyCarbs(2000);
      expect(carbs).toBeGreaterThan(0);
      expect(carbs).toBeCloseTo(250, 0);
    });
  });

  describe('Testes de Segurança', () => {
    it('deve lidar com valores zero', () => {
      expect(() => calculateBMI(0, 175)).not.toThrow();
      expect(() => calculateDailyWater(0)).not.toThrow();
    });

    it('deve retornar números válidos', () => {
      const bmi = calculateBMI(70, 175);
      expect(Number.isNaN(bmi)).toBe(false);
      expect(Number.isFinite(bmi)).toBe(true);
    });
  });
});

describe('Novos Cálculos (recursos avançados)', () => {
  const male: UserData = {
    height: 175,
    weight: 75,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
  };

  describe('getBMIRisk', () => {
    it('retorna nível de risco por faixa', () => {
      expect(getBMIRisk(17)).toContain('baixo peso');
      expect(getBMIRisk(22)).toBe('Risco baixo');
      expect(getBMIRisk(42)).toContain('muito alto');
    });
  });

  describe('calculateBMR', () => {
    it('calcula TMB masculina positiva e coerente', () => {
      const bmr = calculateBMR(male);
      expect(bmr).toBeGreaterThan(1400);
      expect(bmr).toBeLessThan(2200);
    });

    it('TMB é menor que TDEE (com atividade)', () => {
      expect(calculateBMR(male)).toBeLessThan(calculateDailyCalories(male));
    });
  });

  describe('calculateBodyFat (Deurenberg)', () => {
    it('retorna percentual dentro de faixa plausível', () => {
      const bf = calculateBodyFat(calculateBMI(75, 175), 30, 'male');
      expect(bf).toBeGreaterThan(0);
      expect(bf).toBeLessThan(60);
    });

    it('mulher tende a ter percentual maior que homem no mesmo IMC/idade', () => {
      const bmi = 24;
      expect(calculateBodyFat(bmi, 30, 'female')).toBeGreaterThan(
        calculateBodyFat(bmi, 30, 'male')
      );
    });

    it('nunca retorna valor negativo', () => {
      expect(calculateBodyFat(16, 15, 'male')).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateGoalCalories', () => {
    it('aplica déficit ao perder peso', () => {
      expect(calculateGoalCalories(2000, 'lose')).toBe(1600);
    });
    it('mantém no objetivo manter', () => {
      expect(calculateGoalCalories(2000, 'maintain')).toBe(2000);
    });
    it('aplica superávit ao ganhar massa', () => {
      expect(calculateGoalCalories(2000, 'gain')).toBe(2300);
    });
  });

  describe('getGoalLabel', () => {
    it('mapeia rótulos', () => {
      expect(getGoalLabel('lose')).toBe('Perder peso');
      expect(getGoalLabel('gain')).toBe('Ganhar massa');
      expect(getGoalLabel('maintain')).toBe('Manter peso');
    });
  });

  describe('calculateDailyFat', () => {
    it('calcula gordura a partir das calorias (25% / 9 kcal)', () => {
      expect(calculateDailyFat(1800)).toBe(50);
    });
  });

  describe('calculateHealthMetrics (integração)', () => {
    it('reflete o objetivo nas calorias-alvo e macros', () => {
      const lose = calculateHealthMetrics({ ...male, goal: 'lose' });
      const gain = calculateHealthMetrics({ ...male, goal: 'gain' });
      expect(lose.goalCalories).toBeLessThan(lose.tdee);
      expect(gain.goalCalories).toBeGreaterThan(gain.tdee);
      expect(lose.dailyCalories).toBe(lose.goalCalories);
      expect(lose.dailyFat).toBeGreaterThan(0);
      expect(lose.bodyFat).toBeGreaterThan(0);
      expect(lose.bmr).toBeGreaterThan(0);
    });
  });
});
