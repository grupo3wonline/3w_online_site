// Dados de referência: nutrientes essenciais e 8 remédios naturais.
// Conteúdo preservado do app original.

import type { RemedioNatural } from './types'

export const NUTRIENTES: Record<string, string> = {
  vitamina_A: '900 microgramas (µg) por dia',
  vitamina_B1: '1,2 miligramas (mg) por dia',
  vitamina_B2: '1,3 miligramas (mg) por dia',
  vitamina_B3: '16 miligramas (mg) por dia',
  vitamina_B5: '5 miligramas (mg) por dia',
  vitamina_B6: '1,3 miligramas (mg) por dia',
  vitamina_B7: '30 microgramas (µg) por dia',
  vitamina_B9: '400 microgramas (µg) por dia',
  vitamina_B12: '2,4 microgramas (µg) por dia',
  vitamina_K: '120 microgramas (µg) por dia',
  vitamina_C: '90 miligramas (mg) por dia',
  vitamina_D: '5 a 50 microgramas (µg) por dia',
  vitamina_E: '15 miligramas (mg) por dia',
  calcio: '1000 miligramas (mg) por dia',
  iodo: '150 microgramas (µg) por dia',
  ferro: '8 miligramas (mg) por dia',
  zinco: '11 miligramas (mg) por dia',
  magnesio: '400 miligramas (mg) por dia',
  selenio: '55 microgramas (µg) por dia',
  potassio: '4700 miligramas (mg) por dia',
  fosforo: '700 miligramas (mg) por dia',
  sodio: '1500 miligramas (mg) por dia',
  cobre: '900 microgramas (µg) por dia',
  manganes: '2,3 miligramas (mg) por dia',
  cromo: '35 microgramas (µg) por dia',
  molibdenio: '45 microgramas (µg) por dia',
  fluor: '4 miligramas (mg) por dia',
  colina: '550 miligramas (mg) por dia',
  biotina: '30 microgramas (µg) por dia',
  acido_folico: '400 microgramas (µg) por dia',
  acido_pantotenico: '5 miligramas (mg) por dia',
  acido_linoleico: '17 gramas (g) por dia',
  acido_linolenico: '1,6 gramas (g) por dia',
  fibra: '25 gramas (g) por dia',
}

export const REMEDIOS_NATURAIS: Record<string, RemedioNatural> = {
  agua: {
    recomendacao:
      'Manter-se hidratado é essencial para a saúde geral do corpo. A água é necessária para a função celular, digestão e eliminação de toxinas. A água é essencial para transportar alimentos, oxigênio e sais minerais, além de estar presente naquilo que se elimina como suor e lágrimas, no plasma sanguíneo, nas articulações, nos sistemas respiratório, digestivo e nervoso, na urina e na pele. Ingira pelo menos cerca de oito copos de água por dia.',
    exemplo:
      'Consumir pelo menos 8 copos de água por dia. Ingerir água de coco ou chás de ervas para hidratação adicional.',
  },
  arPuro: {
    recomendacao:
      'Respirar ar fresco contribui para a saúde dos pulmões e bem-estar geral. A exposição à natureza pode reduzir o estresse e melhorar o humor. É fundamental buscar lugares onde haja ventilação em que o ar puro ser respirado. O ar que respiramos contém oxigênio. As células vermelhas pegam o oxigênio dos pulmões e o transportam para as células do corpo. Cada célula necessita de oxigênio para fazer funcionar suas "usinas" de energia. As células vermelhas do sangue, portanto, transportam o dióxido de carbono de volta para os pulmões. Quando nós expiramos, o gás carbônico é expulso com o ar pobre em oxigênio.',
    exemplo:
      'Fazer caminhadas ao ar livre para respirar ar puro. Abrir as janelas para ventilar a casa e permitir a entrada de ar fresco.',
  },
  alimentacao: {
    recomendacao:
      'Uma dieta equilibrada fornece os nutrientes necessários para o funcionamento adequado do corpo. Alimentos saudáveis promovem a saúde do coração, do cérebro e do sistema imunológico. Uma alimentação saudável envolve dois aspectos: evitar alimentos que prejudicam o organismo e usar corretamente os alimentos que são benéficos como fibras e proteínas, carboidratos, aminoácidos, nutrientes encontrados nos alimentos integrais... Faça pelo menos as 3 refeições importantes do dia. Se possível coma moderadamente entre intervalos de 2 a 3 horas, respeitando os tipos e quantidades.',
    exemplo:
      'Incluir uma variedade de frutas, vegetais, proteínas magras e grãos inteiros na alimentação. Evitar alimentos processados, ricos em açúcar e gorduras saturadas.',
  },
  atividadeFisica: {
    recomendacao:
      'A atividade física regular e exercícios melhoram a saúde cardiovascular, muscular e mental. A prática de exercícios físicos pode ajudar a controlar o peso e reduzir o risco de doenças crônicas. É indicado fazer as atividades físicas diariamente, pelo menos 30 minutos a cada dia. Há, também, pesquisas recentes que falam que três sessões de 10 minutos proporcionam os mesmos benefícios que uma sessão de meia hora. Seu corpo é uma máquina maravilhosa. Ao colocar seu corpo para trabalhar há um aumento de sua força física e resistência às doenças. Exercícios podem realmente melhorar suas perspectivas na vida!',
    exemplo:
      'Praticar 30 minutos de exercícios aeróbicos, como caminhada rápida, todos os dias. Realizar treinamento de força duas vezes por semana para fortalecer os músculos.',
  },
  repousoEDescanso: {
    recomendacao:
      'O descanso adequado é vital para a recuperação e regeneração do corpo. A falta de sono pode afetar negativamente a saúde mental e física. Além de se dormir o número de horas corretas diariamente, é importante reservar um dia da semana para um processo de restauração para manter uma mente bem equilibrada e saúde do corpo. Dormir permite seu corpo renovar-se a si mesmo e obter melhores condições de cura. O descanso fortalece o sistema imunológico e pode adicionar anos à sua vida.',
    exemplo:
      'Garantir 7-9 horas de sono por noite para adultos. Tirar cochilos curtos durante o dia, se necessário. Praticar técnicas de relaxamento para reduzir o estresse.',
  },
  equilibrioTemperanca: {
    recomendacao:
      'Evitar excessos e moderar o consumo de alimentos, bebidas e outras atividades. A moderação é essencial para manter o equilíbrio e a saúde. Uma definição simples de "temperança" é "moderação". Usamos inteligentemente boas coisas e evitamos as coisas ruins. A meta de uma vida equilibrada é buscar alvejar um bem-estar físico, mental, emocional e espiritual.',
    exemplo:
      'Consumir comidas e bebidas saudáveis com moderação evitando excessos alimentares. Praticar atividades de lazer e entretenimento com moderação.',
  },
  luzSolar: {
    recomendacao:
      'A exposição à luz solar contribui para a produção de vitamina D e regula o ritmo circadiano. A luz solar pode melhorar o humor e a saúde mental. Uma das principais orientações é que as casas tenham locais de iluminação solar. Às vezes, é necessário remover cortinas, abrir as janelas, suspender persianas para que os raios de sol entrem nos ambientes. As células sanguíneas vermelhas funcionam melhor após a exposição do corpo ao sol.',
    exemplo:
      'Passar algum tempo ao ar livre durante o dia para receber luz solar natural. Praticar atividades ao ar livre, como jardinagem ou caminhadas.',
  },
  fe: {
    recomendacao:
      'A fé e a confiança em Deus podem proporcionar conforto e apoio emocional. A prática religiosa e a oração podem promover a paz interior e a resiliência. Nós agora possuímos mais conforto e conveniências do que nunca, contudo muitos se sentem cada vez menos satisfeitos. É imprescindível para uma saúde integral de qualidade a vivência de uma crença em Deus independente de religião. É natural do ser humano a prática da fé em alguém ou alguma coisa. Confiar em Deus é mais do que saber que Ele existe, mas ter um relacionamento de amor com Ele.',
    exemplo:
      'Participar de práticas religiosas, orações ou meditação para fortalecer a fé. Buscar apoio espiritual e comunidade religiosa para conforto e orientação.',
  },
}

export const NIVEIS_ATIVIDADE = [
  { value: 1.2, label: 'Sedentário' },
  { value: 1.375, label: 'Levemente Ativo' },
  { value: 1.55, label: 'Moderadamente Ativo' },
  { value: 1.725, label: 'Muito Ativo' },
  { value: 1.9, label: 'Extremamente Ativo' },
] as const

export const REMEDIO_LABELS: Record<string, string> = {
  agua: '💧 Água',
  arPuro: '🌬️ Ar Puro',
  alimentacao: '🥗 Alimentação',
  atividadeFisica: '🏃‍♂️ Atividade Física',
  repousoEDescanso: '😴 Repouso e Descanso',
  equilibrioTemperanca: '⚖️ Equilíbrio e Temperança',
  luzSolar: '☀️ Luz Solar',
  fe: '🙏 Fé',
}
