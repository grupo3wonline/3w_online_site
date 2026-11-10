import Swal from 'sweetalert2';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TestHelpInfo {
  title: string;
  description: string;
  duration: string;
  questions: string;
  tips: string[];
  whatItMeasures: string[];
}

const testHelpData: Record<string, TestHelpInfo> = {
  vocational: {
    title: 'Teste Vocacional Completo',
    description: 'Este teste identifica suas áreas de interesse profissional com base em suas preferências, habilidades e valores. Ajuda a orientar escolhas de carreira e formação acadêmica.',
    duration: '25-30 minutos',
    questions: '50 questões',
    tips: [
      'Responda com base no que você realmente gosta, não no que acredita ser "correto".',
      'Não existe resposta certa ou errada — seja honesto(a).',
      'Pense em situações reais da sua vida ao responder.',
      'Se estiver em dúvida entre duas opções, escolha a que mais te atrai.',
      'O teste é mais eficaz quando respondido sem pressa.'
    ],
    whatItMeasures: [
      'Compatibilidade com 8 áreas profissionais',
      'Interesses e habilidades naturais',
      'Alinhamento com valores pessoais',
      'Sugestões de carreiras e cursos'
    ]
  },
  enneagram: {
    title: 'Eneagrama Profissional',
    description: 'O Eneagrama identifica seu tipo de personalidade entre 9 perfis distintos. Revela motivações inconscientes, medos básicos e padrões de comportamento que influenciam sua vida pessoal e profissional.',
    duration: '30-35 minutos',
    questions: '60 questões',
    tips: [
      'Pense em como você se comporta naturalmente, não como gostaria de ser.',
      'Responda com base em padrões de longo prazo, não em momentos específicos.',
      'Seja o mais honesto possível — o objetivo é autoconhecimento.',
      'Não tente "acertar" um tipo específico; todos os perfis têm pontos fortes.',
      'Considere como você reage sob pressão ao responder.'
    ],
    whatItMeasures: [
      'Tipo de personalidade dominante (1 ao 9)',
      'Motivações e medos fundamentais',
      'Pontos fortes e desafios pessoais',
      'Caminho de crescimento e desenvolvimento'
    ]
  },
  disc: {
    title: 'Avaliação DISC Comportamental',
    description: 'O DISC mapeia seu perfil comportamental em 4 dimensões: Dominância, Influência, Estabilidade e Conformidade. Ajuda a entender seu estilo de comunicação e trabalho em equipe.',
    duration: '25-30 minutos',
    questions: '60 situações',
    tips: [
      'Escolha a opção que melhor descreve sua reação natural, não a ideal.',
      'Pense em como você age no dia a dia de trabalho.',
      'Não há perfil melhor ou pior — cada um tem seus pontos fortes.',
      'Responda rapidamente, a primeira impressão costuma ser a mais autêntica.',
      'Considere como seus colegas te descreveriam.'
    ],
    whatItMeasures: [
      'Perfil DISC dominante e secundário',
      'Estilo de comunicação e liderança',
      'Comportamento sob pressão',
      'Compatibilidade com ambientes de trabalho'
    ]
  },
  'mental-health': {
    title: 'Triagem de Saúde Mental',
    description: 'Esta ferramenta de triagem avalia sinais de humor, ansiedade e bem-estar emocional com base em escalas clínicas reconhecidas (PHQ-9/GAD-7). É uma ferramenta educativa e não substitui diagnóstico profissional.',
    duration: '10-15 minutos',
    questions: '18 questões',
    tips: [
      'Considere como você se sentiu nos últimos 14 dias.',
      'Seja honesto(a) — seus resultados são confidenciais.',
      'Não minimize nem exagere os sintomas.',
      'Se precisar, procure ajuda profissional independentemente do resultado.',
      'Em caso de pensamentos de autoagressão, busque suporte emergencial imediatamente.'
    ],
    whatItMeasures: [
      'Indicadores de humor (sintomas depressivos)',
      'Indicadores de ansiedade',
      'Nível geral de bem-estar emocional',
      'Orientação sobre quando buscar ajuda profissional'
    ]
  },
  'mental-age': {
    title: 'Teste de Maturidade Mental',
    description: 'Este teste divertido e educativo avalia sua maturidade emocional, estilo de tomada de decisões e perspectiva de vida para estimar uma "idade mental" simbólica.',
    duration: '15-20 minutos',
    questions: '24 questões',
    tips: [
      'Este teste é recreativo — divirta-se respondendo!',
      'Responda de forma natural, sem tentar parecer mais jovem ou mais velho.',
      'Não existe idade mental "melhor" — cada faixa tem suas qualidades.',
      'Pense em como você realmente age no cotidiano.',
      'O resultado é simbólico e não substitui avaliação psicológica.'
    ],
    whatItMeasures: [
      'Maturidade emocional e social',
      'Estilo de tomada de decisões',
      'Abertura a novas experiências',
      'Equilíbrio entre espontaneidade e responsabilidade'
    ]
  },
  iq: {
    title: 'Teste de Raciocínio Cognitivo',
    description: 'Este teste recreativo avalia múltiplas dimensões cognitivas: lógica, raciocínio verbal, matemático e espacial. É um exercício estimulante, mas não equivale a uma medição oficial de QI.',
    duration: '25-30 minutos',
    questions: '20 questões',
    tips: [
      'Leia cada questão com atenção antes de responder.',
      'Use raciocínio lógico — nem sempre a resposta mais óbvia é a correta.',
      'Se não souber a resposta, tente eliminar as alternativas incorretas.',
      'Não se preocupe com o tempo — o importante é raciocinar bem.',
      'O resultado é recreativo e não equivale a uma avaliação psicométrica oficial.'
    ],
    whatItMeasures: [
      'Raciocínio lógico e sequencial',
      'Raciocínio verbal e vocabulário',
      'Raciocínio matemático',
      'Capacidade analítica geral'
    ]
  },
  'animal-profile': {
    title: 'Perfil Animal — Águia, Gato, Lobo, Tubarão',
    description: 'Descubra qual animal representa seu estilo comportamental no trabalho. Cada animal reflete uma combinação de liderança, criatividade, organização e ação estratégica.',
    duration: '15-20 minutos',
    questions: '30 questões',
    tips: [
      'Pense em como você realmente age no ambiente profissional.',
      'Todos os perfis animais têm pontos fortes e áreas de desenvolvimento.',
      'Escolha a opção que mais se parece com você, não com o que admiraria ser.',
      'Não há animal "melhor" — cada um complementa os outros.',
      'O teste é aplicado em dinâmicas corporativas de RH.'
    ],
    whatItMeasures: [
      'Estilo de liderança e comunicação',
      'Perfil comportamental dominante',
      'Pontos fortes e desafios do perfil',
      'Compatibilidade com funções profissionais'
    ]
  },
  'three-animals': {
    title: 'Teste dos 3 Animais',
    description: 'Este teste psicológico revela 3 dimensões da sua personalidade: como você quer ser visto, quem você realmente é e como os outros te percebem.',
    duration: '15-20 minutos',
    questions: '27 questões',
    tips: [
      'Responda de forma intuitiva, sem analisar demais.',
      'Cada bloco de perguntas investiga uma faceta diferente da personalidade.',
      'Seja honesto mesmo quando a resposta parecer desconfortável.',
      'O teste compara seu "eu ideal" com seu "eu real" e seu "eu social".',
      'Use os insights para crescimento pessoal e melhor autoconhecimento.'
    ],
    whatItMeasures: [
      'Eu ideal (como quer ser visto)',
      'Eu real (quem realmente é)',
      'Eu social (como os outros te percebem)',
      'Gaps de autopercepção'
    ]
  },
  'tropical-forest': {
    title: 'Teste da Floresta Tropical',
    description: 'Este exercício vivencial revela sua hierarquia de valores pessoais através de escolhas simbólicas entre necessidades, carreira, orgulho, família e amor.',
    duration: '12-15 minutos',
    questions: '25 questões',
    tips: [
      'Responda de forma instintiva — a primeira reação costuma ser a mais verdadeira.',
      'Cada animal representa um valor fundamental na sua vida.',
      'Não há hierarquia de valores "correta" — reflita sobre suas prioridades.',
      'O teste é uma ferramenta de coaching e autoconhecimento.',
      'Use os resultados para refletir sobre suas decisões e prioridades.'
    ],
    whatItMeasures: [
      'Hierarquia de valores pessoais',
      'Prioridades de vida (família, carreira, amor, etc.)',
      'Alinhamento entre valores e decisões',
      'Consciência sobre o que motiva suas escolhas'
    ]
  },
  profiler: {
    title: 'Teste Profiler — ECPA',
    description: 'O Profiler ECPA mapeia seu perfil entre Executor, Comunicador, Planejador e Analista. Complementa a análise DISC e ajuda a otimizar sua atuação profissional.',
    duration: '12-15 minutos',
    questions: '25 questões',
    tips: [
      'Responda pensando no seu comportamento natural de trabalho.',
      'Considere como você reage em diferentes situações profissionais.',
      'Todos os perfis ECPA são igualmente valiosos em uma equipe.',
      'O teste complementa o DISC — fazer ambos enriquece a análise.',
      'Seja sincero para obter o perfil mais preciso possível.'
    ],
    whatItMeasures: [
      'Perfil ECPA dominante',
      'Estilo de trabalho e tomada de decisão',
      'Funções e papéis ideais',
      'Compatibilidade com ambientes profissionais'
    ]
  },
  'big-five': {
    title: 'Teste Big Five — 5 Grandes Fatores',
    description: 'O Big Five é o modelo de personalidade mais validado cientificamente. Avalia 5 dimensões fundamentais: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo.',
    duration: '15-20 minutos',
    questions: '25 questões',
    tips: [
      'Responda com base em como você geralmente se comporta, não em ocasiões específicas.',
      'Não há perfil "ideal" — todas as combinações são válidas.',
      'Cada dimensão é um espectro (alto ou baixo), não binária.',
      'O Big Five é amplamente usado em pesquisa e RH corporativo.',
      'Seja honesto para obter insights realmente úteis.'
    ],
    whatItMeasures: [
      'Abertura a experiências',
      'Conscienciosidade (organização)',
      'Extroversão vs. Introversão',
      'Amabilidade e cooperação',
      'Neuroticismo (estabilidade emocional)'
    ]
  },
  mbti: {
    title: 'Teste MBTI — 16 Personalidades',
    description: 'O MBTI identifica seu tipo entre 16 personalidades, combinando 4 dimensões: Energia (E/I), Percepção (S/N), Decisão (T/F) e Estilo de vida (J/P).',
    duration: '15-20 minutos',
    questions: '28 questões',
    tips: [
      'Responda como você é naturalmente, não como gostaria de ser.',
      'Pense em suas tendências gerais, não em situações isoladas.',
      'Todas as 16 personalidades têm pontos fortes únicos.',
      'O MBTI é usado por empresas Fortune 500 em processos de seleção e desenvolvimento.',
      'Dica: prefira a opção que mais te representa no dia a dia.'
    ],
    whatItMeasures: [
      'Preferência de energia (Extrovertido vs. Introvertido)',
      'Estilo de percepção (Sensorial vs. Intuitivo)',
      'Estilo de decisão (Pensamento vs. Sentimento)',
      'Estilo de vida (Julgamento vs. Percepção)'
    ]
  },
  star: {
    title: 'Técnica STAR — Competências',
    description: 'Avalie como você estrutura respostas comportamentais usando a técnica STAR: Situação, Tarefa, Ação e Resultado. Essencial para entrevistas e autoavaliação de competências.',
    duration: '12-15 minutos',
    questions: '25 questões',
    tips: [
      'Pense em experiências profissionais concretas ao responder.',
      'A técnica STAR é usada em entrevistas por competências de grandes empresas.',
      'Foque em descrever ações concretas, não intenções.',
      'Resultados mensuráveis são sempre mais impactantes.',
      'Use este teste como treino para futuras entrevistas.'
    ],
    whatItMeasures: [
      'Domínio da técnica STAR',
      'Competências comportamentais chave',
      'Capacidade de estruturar respostas',
      'Preparação para entrevistas por competência'
    ]
  },
  temperament: {
    title: 'Teste de Temperamento',
    description: 'Descubra seu temperamento entre Colérico, Sanguíneo, Fleumático e Melancólico. Baseado na teoria clássica dos 4 temperamentos para autoconhecimento e desenvolvimento pessoal.',
    duration: '15-18 minutos',
    questions: '28 questões',
    tips: [
      'Responda de forma instintiva — a primeira reação é a mais verdadeira.',
      'Todos os temperamentos têm qualidades e desafios.',
      'Muitas pessoas possuem um temperamento dominante e um secundário.',
      'A teoria dos temperamentos tem origem na medicina clássica.',
      'Use os insights para melhorar relacionamentos e autoconhecimento.'
    ],
    whatItMeasures: [
      'Temperamento dominante e secundário',
      'Motivações e estressores naturais',
      'Estilo de comunicação e liderança',
      'Compatibilidade com carreiras e ambientes'
    ]
  }
};

interface TestHelpButtonProps {
  testId: string;
  variant?: 'icon' | 'button';
}

const TestHelpButton = ({ testId, variant = 'icon' }: TestHelpButtonProps) => {
  const info = testHelpData[testId];

  if (!info) return null;

  const showHelp = () => {
    Swal.fire({
      title: `<div style="font-size:1.3rem">${info.title}</div>`,
      html: `
        <div style="text-align:left; font-size:0.95rem; line-height:1.7">
          <p style="color:#555; margin-bottom:12px">${info.description}</p>
          
          <div style="display:flex; gap:16px; margin-bottom:16px">
            <div style="flex:1; background:#f0f4ff; border-radius:8px; padding:10px; text-align:center">
              <div style="font-weight:700; color:#4338ca">⏱ ${info.duration}</div>
              <div style="font-size:0.8rem; color:#666">Duração estimada</div>
            </div>
            <div style="flex:1; background:#f0fdf4; border-radius:8px; padding:10px; text-align:center">
              <div style="font-weight:700; color:#16a34a">📝 ${info.questions}</div>
              <div style="font-size:0.8rem; color:#666">Total de questões</div>
            </div>
          </div>

          <h4 style="font-weight:700; color:#1e293b; margin-bottom:8px; font-size:0.95rem">📊 O que este teste mede:</h4>
          <ul style="list-style:none; padding:0; margin-bottom:16px">
            ${info.whatItMeasures.map(item => `<li style="padding:4px 0; color:#555">✅ ${item}</li>`).join('')}
          </ul>

          <h4 style="font-weight:700; color:#1e293b; margin-bottom:8px; font-size:0.95rem">💡 Dicas para melhores resultados:</h4>
          <ul style="list-style:none; padding:0">
            ${info.tips.map(tip => `<li style="padding:4px 0; color:#555">💎 ${tip}</li>`).join('')}
          </ul>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Entendi, vamos começar!',
      confirmButtonColor: '#7c3aed',
      width: 560,
      customClass: {
        popup: 'rounded-xl'
      }
    });
  };

  if (variant === 'button') {
    return (
      <Button variant="outline" size="sm" onClick={showHelp} className="text-violet-600 border-violet-300 hover:bg-violet-50">
        <HelpCircle className="h-4 w-4 mr-2" />
        Ajuda e Dicas
      </Button>
    );
  }

  return (
    <button
      onClick={showHelp}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-violet-600"
      title="Ajuda, dicas e orientações"
      aria-label="Abrir ajuda do teste"
    >
      <HelpCircle className="h-5 w-5" />
    </button>
  );
};

export default TestHelpButton;
export { testHelpData };
