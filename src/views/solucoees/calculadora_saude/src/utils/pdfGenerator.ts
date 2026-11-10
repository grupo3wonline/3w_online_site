import type { HealthMetrics, UserData } from '@/types';
import { ACTIVITY_LABELS } from '@/utils/calculations';

/**
 * Gera o relatório de saúde em PDF localmente no navegador.
 * Nenhum dado é enviado a servidores — preserva a privacidade (LGPD).
 * O jsPDF é carregado sob demanda (dynamic import) para não pesar no bundle inicial.
 */
export const generatePDF = async (userData: UserData, metrics: HealthMetrics): Promise<void> => {
  const { default: jsPDF } = await import('jspdf');
  const pdf = new jsPDF();

  pdf.setFont('helvetica');

  // Cabeçalho
  pdf.setFontSize(20);
  pdf.setTextColor(5, 150, 105); // Verde esmeralda (brand)
  pdf.text('Relatório de Saúde e Metas Pessoais', 20, 30);

  // Informações pessoais
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Informações Pessoais', 20, 50);

  pdf.setFontSize(12);
  let yPos = 60;
  pdf.text(`Altura: ${userData.height} cm`, 20, yPos);
  yPos += 10;
  pdf.text(`Peso: ${userData.weight} kg`, 20, yPos);
  yPos += 10;
  pdf.text(`Idade: ${userData.age} anos`, 20, yPos);
  yPos += 10;
  pdf.text(`Sexo: ${userData.gender === 'male' ? 'Masculino' : 'Feminino'}`, 20, yPos);
  yPos += 10;

  const activityLabel =
    userData.activityLevel && userData.activityLevel in ACTIVITY_LABELS
      ? ACTIVITY_LABELS[userData.activityLevel as keyof typeof ACTIVITY_LABELS]
      : '—';
  pdf.text(`Nível de Atividade: ${activityLabel}`, 20, yPos);

  // Métricas de saúde
  yPos += 20;
  pdf.setFontSize(16);
  pdf.text('Métricas de Saúde', 20, yPos);

  yPos += 15;
  pdf.setFontSize(12);
  pdf.text(`IMC: ${metrics.bmi} - ${metrics.bmiCategory} (${metrics.bmiRisk})`, 20, yPos);
  yPos += 10;
  pdf.text(`Gordura Corporal Estimada: ${metrics.bodyFat}%`, 20, yPos);
  yPos += 10;
  pdf.text(`Peso Ideal: ${metrics.idealWeight.min} - ${metrics.idealWeight.max} kg`, 20, yPos);
  yPos += 10;
  pdf.text(`Metabolismo Basal (TMB): ${metrics.bmr} kcal`, 20, yPos);
  yPos += 10;
  pdf.text(`Gasto Energético Total (TDEE): ${metrics.tdee} kcal`, 20, yPos);
  yPos += 10;
  pdf.text(`Objetivo (${metrics.goalLabel}): ${metrics.goalCalories} kcal/dia`, 20, yPos);
  yPos += 10;
  pdf.text(`Água Diária: ${metrics.dailyWater} litros`, 20, yPos);
  yPos += 10;
  pdf.text(`Proteína: ${metrics.dailyProtein} g | Carboidratos: ${metrics.dailyCarbs} g | Gorduras: ${metrics.dailyFat} g`, 20, yPos);

  // Divisão de refeições
  yPos += 20;
  pdf.setFontSize(16);
  pdf.text('Divisão de Refeições', 20, yPos);

  yPos += 15;
  pdf.setFontSize(12);
  const { breakfast, lunch, dinner, snacks } = metrics.mealPlan;
  pdf.text(
    `Café da Manhã: ${breakfast.calories} kcal, ${breakfast.protein}g proteína, ${breakfast.carbs}g carbs`,
    20,
    yPos
  );
  yPos += 10;
  pdf.text(
    `Almoço: ${lunch.calories} kcal, ${lunch.protein}g proteína, ${lunch.carbs}g carbs`,
    20,
    yPos
  );
  yPos += 10;
  pdf.text(
    `Jantar: ${dinner.calories} kcal, ${dinner.protein}g proteína, ${dinner.carbs}g carbs`,
    20,
    yPos
  );
  yPos += 10;
  pdf.text(
    `Lanches: ${snacks.calories} kcal, ${snacks.protein}g proteína, ${snacks.carbs}g carbs`,
    20,
    yPos
  );

  // Nova página com dicas
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('8 Remédios Naturais para uma Vida Saudável', 20, 30);

  yPos = 45;
  pdf.setFontSize(12);
  const tips = [
    '1. Água: Mantenha-se hidratado bebendo água pura diariamente',
    '2. Ar Puro: Respire ar fresco e pratique exercícios ao ar livre',
    '3. Luz Solar: Exponha-se ao sol matinal por 15-30 minutos',
    '4. Descanso: Durma 7-8 horas por noite para recuperação adequada',
    '5. Temperança: Pratique moderação em todas as atividades',
    '6. Nutrição: Consuma alimentos naturais e balanceados',
    '7. Exercício Físico: Mantenha-se ativo com exercícios regulares',
    '8. Confiança Divina: Cultive paz mental e espiritualidade',
  ];

  tips.forEach((tip) => {
    pdf.text(tip, 20, yPos);
    yPos += 15;
  });

  // Aviso legal
  yPos += 20;
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text('IMPORTANTE: Esta ferramenta é informativa e não substitui acompanhamento', 20, yPos);
  yPos += 8;
  pdf.text('profissional. Consulte um médico ou educador físico antes de iniciar', 20, yPos);
  yPos += 8;
  pdf.text('qualquer plano alimentar ou de exercícios.', 20, yPos);

  pdf.setFontSize(9);
  yPos += 16;
  pdf.text('Sistema desenvolvido por HOTWYL | WILLFROMBRASIL — Grupo 3W Online', 20, yPos);

  pdf.save('relatorio-saude-metas.pdf');
};
