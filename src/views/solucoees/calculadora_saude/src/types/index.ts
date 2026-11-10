export type Gender = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very-active';

/** Objetivo do usuário — ajusta as calorias-alvo (déficit/superávit). */
export type Goal = 'lose' | 'maintain' | 'gain';

export interface UserData {
  height: number;
  weight: number;
  age: number;
  gender: Gender | '';
  activityLevel: ActivityLevel | '';
  goal: Goal | '';
}

export interface MealMacros {
  calories: number;
  protein: number;
  carbs: number;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  bmiRisk: string;
  bmr: number;
  tdee: number;
  idealWeight: { min: number; max: number };
  bodyFat: number;
  dailyWater: number;
  goalCalories: number;
  goalLabel: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  mealPlan: {
    breakfast: MealMacros;
    lunch: MealMacros;
    dinner: MealMacros;
    snacks: MealMacros;
  };
}

export interface Tooltip {
  field: string;
  content: string;
}
