import type { ActivityLevel, Goal, HealthMetrics, UserData } from '@/types';

/**
 * Cálculo do Índice de Massa Corporal (IMC).
 * Fórmula: peso (kg) / altura² (m).
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/** Classificação do IMC segundo padrões da OMS. */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  if (bmi < 35) return 'Obesidade grau I';
  if (bmi < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
};

/** Nível de risco à saúde associado à faixa de IMC. */
export const getBMIRisk = (bmi: number): string => {
  if (bmi < 18.5) return 'Risco aumentado (baixo peso)';
  if (bmi < 25) return 'Risco baixo';
  if (bmi < 30) return 'Risco levemente elevado';
  if (bmi < 35) return 'Risco moderado';
  if (bmi < 40) return 'Risco alto';
  return 'Risco muito alto';
};

/** Faixa de peso ideal (IMC entre 18.5 e 24.9) para a altura informada. */
export const calculateIdealWeight = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const min = Number((18.5 * heightInMeters * heightInMeters).toFixed(1));
  const max = Number((24.9 * heightInMeters * heightInMeters).toFixed(1));
  return { min, max };
};

/**
 * Percentual de gordura corporal estimado pela fórmula de Deurenberg,
 * a partir de IMC, idade e sexo. Homens: sexo = 1; mulheres: sexo = 0.
 */
export const calculateBodyFat = (bmi: number, age: number, gender: string): number => {
  const sex = gender === 'male' ? 1 : 0;
  const bodyFat = 1.2 * bmi + 0.23 * age - 10.8 * sex - 5.4;
  return Number(Math.max(bodyFat, 0).toFixed(1));
};

/** Ingestão diária de água recomendada (35 ml por kg de peso). */
export const calculateDailyWater = (weight: number): number => {
  return Number((weight * 0.035).toFixed(1));
};

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

const PROTEIN_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1,
  light: 1.1,
  moderate: 1.3,
  active: 1.6,
  'very-active': 1.8,
};

/** Taxa metabólica basal (TMB/BMR) pela equação de Harris-Benedict revisada. */
export const calculateBMR = (userData: UserData): number => {
  const { weight, height, age, gender } = userData;
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  return Math.round(bmr);
};

/** Gasto energético total diário (TDEE) = BMR × fator de atividade. */
export const calculateDailyCalories = (userData: UserData): number => {
  const bmr = calculateBMR(userData);
  const multiplier = ACTIVITY_MULTIPLIERS[userData.activityLevel as ActivityLevel] ?? 1.2;
  return Math.round(bmr * multiplier);
};

const GOAL_LABELS: Record<Goal, string> = {
  lose: 'Perder peso',
  maintain: 'Manter peso',
  gain: 'Ganhar massa',
};

/**
 * Calorias-alvo conforme objetivo:
 * - perder peso: déficit de ~20%
 * - manter: TDEE
 * - ganhar massa: superávit de ~15%
 */
export const calculateGoalCalories = (tdee: number, goal: string): number => {
  if (goal === 'lose') return Math.round(tdee * 0.8);
  if (goal === 'gain') return Math.round(tdee * 1.15);
  return tdee;
};

export const getGoalLabel = (goal: string): string => {
  return GOAL_LABELS[goal as Goal] ?? 'Manter peso';
};

/** Recomendação diária de proteína conforme peso e nível de atividade. */
export const calculateDailyProtein = (weight: number, activityLevel: string): number => {
  const baseProtein = weight * 0.8;
  const multiplier = PROTEIN_MULTIPLIERS[activityLevel as ActivityLevel] ?? 1;
  return Math.round(baseProtein * multiplier);
};

/** Recomendação diária de carboidratos (50% das calorias, 4 kcal/g). */
export const calculateDailyCarbs = (calories: number): number => {
  return Math.round((calories * 0.5) / 4);
};

/** Recomendação diária de gordura (25% das calorias, 9 kcal/g). */
export const calculateDailyFat = (calories: number): number => {
  return Math.round((calories * 0.25) / 9);
};

/** Divisão sugerida das metas ao longo das refeições do dia. */
export const calculateMealPlan = (calories: number, protein: number, carbs: number) => {
  return {
    breakfast: {
      calories: Math.round(calories * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.25),
    },
    lunch: {
      calories: Math.round(calories * 0.35),
      protein: Math.round(protein * 0.35),
      carbs: Math.round(carbs * 0.35),
    },
    dinner: {
      calories: Math.round(calories * 0.3),
      protein: Math.round(protein * 0.3),
      carbs: Math.round(carbs * 0.3),
    },
    snacks: {
      calories: Math.round(calories * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.1),
    },
  };
};

/** Consolida todas as métricas de saúde a partir dos dados do usuário. */
export const calculateHealthMetrics = (userData: UserData): HealthMetrics => {
  const bmi = calculateBMI(userData.weight, userData.height);
  const bmiCategory = getBMICategory(bmi);
  const bmiRisk = getBMIRisk(bmi);
  const bmr = calculateBMR(userData);
  const tdee = calculateDailyCalories(userData);
  const idealWeight = calculateIdealWeight(userData.height);
  const bodyFat = calculateBodyFat(bmi, userData.age, userData.gender);
  const dailyWater = calculateDailyWater(userData.weight);

  const goalCalories = calculateGoalCalories(tdee, userData.goal);
  const goalLabel = getGoalLabel(userData.goal);

  // As metas de macros passam a se basear nas calorias do objetivo escolhido.
  const dailyCalories = goalCalories;
  const dailyProtein = calculateDailyProtein(userData.weight, userData.activityLevel);
  const dailyCarbs = calculateDailyCarbs(dailyCalories);
  const dailyFat = calculateDailyFat(dailyCalories);
  const mealPlan = calculateMealPlan(dailyCalories, dailyProtein, dailyCarbs);

  return {
    bmi,
    bmiCategory,
    bmiRisk,
    bmr,
    tdee,
    idealWeight,
    bodyFat,
    dailyWater,
    goalCalories,
    goalLabel,
    dailyCalories,
    dailyProtein,
    dailyCarbs,
    dailyFat,
    mealPlan,
  };
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentário',
  light: 'Levemente Ativo',
  moderate: 'Moderadamente Ativo',
  active: 'Muito Ativo',
  'very-active': 'Extremamente Ativo',
};
