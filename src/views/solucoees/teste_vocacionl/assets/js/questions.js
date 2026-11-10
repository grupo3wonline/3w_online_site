/**
 * Teste Vocacional - Banco de Perguntas
 * @description Módulo contendo todas as perguntas do teste vocacional,
 * organizadas por áreas de habilidade profissional.
 * @version 2.0.0
 * @author HOTWYL | WILLFROMBRASIL
 */

'use strict';

const OPCOES_RESPOSTA = Object.freeze([
    { text: 'Nada', value: 0, icon: 'fa-face-meh-blank' },
    { text: 'Não gosto', value: 1, icon: 'fa-face-frown' },
    { text: 'Um pouco', value: 2, icon: 'fa-face-meh' },
    { text: 'Moderadamente', value: 3, icon: 'fa-face-smile' },
    { text: 'Às vezes', value: 4, icon: 'fa-face-smile-beam' },
    { text: 'Muito', value: 5, icon: 'fa-face-grin-stars' }
]);

const AREAS_LABELS = Object.freeze({
    creativity: 'Criatividade',
    analytical: 'Habilidade Analítica',
    communication: 'Comunicação',
    innovation: 'Inovação',
    leadership: 'Liderança',
    adaptability: 'Adaptabilidade',
    organization: 'Organização',
    time_management: 'Gestão do Tempo',
    continuous_learning: 'Aprendizado Contínuo',
    resilience: 'Resiliência',
    collaboration: 'Colaboração',
    diversity: 'Diversidade',
    proactivity: 'Proatividade',
    tech_adaptability: 'Adaptabilidade Tecnológica',
    pressure_handling: 'Lidar com Pressão',
    time_pressure_handling: 'Lidar com Pressão Temporal',
    routine_preference: 'Preferência por Rotina',
    feedback_handling: 'Lidar com Feedback',
    long_term_projects: 'Projetos de Longo Prazo'
});

const PERGUNTAS = Object.freeze([
    {
        question: 'Quanto você gosta de resolver problemas lógicos?',
        explanation: 'Essa pergunta avalia sua habilidade analítica — capacidade de analisar dados, identificar padrões e resolver problemas de forma estruturada.',
        tip: 'Pense em situações do dia a dia onde você precisou raciocinar logicamente, como resolver quebra-cabeças ou analisar informações.',
        example: 'Exemplo: resolver um problema de matemática, analisar planilhas ou encontrar erros em processos.',
        area: 'analytical'
    },
    {
        question: 'Quanto você gosta de resolver problemas complexos?',
        explanation: 'Essa pergunta avalia sua criatividade — a capacidade de pensar fora da caixa e encontrar soluções originais.',
        tip: 'Considere como você se sente ao enfrentar desafios que exigem pensar de maneiras diferentes.',
        example: 'Exemplo: criar uma solução inovadora para um problema no trabalho ou inventar algo novo.',
        area: 'creativity'
    },
    {
        question: 'Quanto você gosta de falar em público?',
        explanation: 'Essa pergunta avalia sua habilidade de comunicação — expressar ideias de forma clara e persuasiva.',
        tip: 'Reflita sobre como você se sente ao apresentar ideias para um grupo de pessoas.',
        example: 'Exemplo: fazer apresentações escolares, liderar reuniões ou gravar vídeos.',
        area: 'communication'
    },
    {
        question: 'Você gosta de encontrar maneiras não convencionais de abordar um problema?',
        explanation: 'Essa pergunta avalia novamente sua criatividade e pensamento divergente.',
        tip: 'Pense em situações onde você preferiu uma abordagem diferente do padrão.',
        example: 'Exemplo: resolver um conflito com uma ideia inesperada ou criar um atalho para uma tarefa.',
        area: 'creativity'
    },
    {
        question: 'Você gosta de trabalhar com outras pessoas?',
        explanation: 'Essa pergunta avalia sua habilidade de comunicação interpessoal e trabalho em equipe.',
        tip: 'Considere como é a sua experiência ao colaborar com colegas em projetos.',
        example: 'Exemplo: participar de projetos em grupo, mentorar alguém ou colaborar em equipe.',
        area: 'communication'
    },
    {
        question: 'Quanto você gosta de inovar em suas atividades?',
        explanation: 'Essa pergunta avalia sua capacidade de inovação — buscar melhorias e novas formas de fazer as coisas.',
        tip: 'Reflita se você costuma buscar formas melhores de realizar suas tarefas do dia a dia.',
        example: 'Exemplo: propor uma nova ferramenta, criar um processo mais eficiente ou sugerir melhorias.',
        area: 'innovation'
    },
    {
        question: 'Como você se sente em situações de liderança?',
        explanation: 'Essa pergunta avalia sua preferência por papéis de liderança e gestão de equipes.',
        tip: 'Pense em como você reage quando precisa guiar ou organizar um grupo.',
        example: 'Exemplo: ser líder de um projeto, organizar um evento ou tomar decisões pelo grupo.',
        area: 'leadership'
    },
    {
        question: 'Como você se adapta a mudanças em sua rotina?',
        explanation: 'Essa pergunta avalia sua capacidade de adaptação a novos cenários e situações inesperadas.',
        tip: 'Reflita sobre como você lida quando seus planos mudam repentinamente.',
        example: 'Exemplo: mudança de cidade, novo emprego ou alteração de horários.',
        area: 'adaptability'
    },
    {
        question: 'Você se considera uma pessoa organizada?',
        explanation: 'Essa pergunta avalia suas habilidades de organização e planejamento.',
        tip: 'Pense em como você gerencia seus pertences, agenda e tarefas diárias.',
        example: 'Exemplo: manter agenda atualizada, organizar documentos ou planejar metas.',
        area: 'organization'
    },
    {
        question: 'Como você lida com prazos apertados?',
        explanation: 'Essa pergunta avalia sua habilidade de gerenciamento do tempo.',
        tip: 'Considere como você prioriza tarefas quando tem pouco tempo disponível.',
        example: 'Exemplo: entregar um relatório urgente, estudar para prova de última hora.',
        area: 'time_management'
    },
    {
        question: 'Quanto você valoriza a aprendizagem contínua?',
        explanation: 'Essa pergunta avalia sua motivação para adquirir novos conhecimentos.',
        tip: 'Reflita se você busca ativamente aprender coisas novas além do obrigatório.',
        example: 'Exemplo: fazer cursos online, ler livros técnicos ou assistir palestras.',
        area: 'continuous_learning'
    },
    {
        question: 'Você se sente confortável lidando com situações imprevisíveis?',
        explanation: 'Essa pergunta avalia sua resiliência em ambientes dinâmicos e incertos.',
        tip: 'Pense em como você reage quando algo inesperado acontece.',
        example: 'Exemplo: lidar com uma crise no trabalho, resolver um imprevisto em viagem.',
        area: 'resilience'
    },
    {
        question: 'Você prefere trabalhar de forma independente ou em equipe?',
        explanation: 'Essa pergunta avalia sua preferência por colaboração ou autonomia no trabalho.',
        tip: 'Considere em qual formato você se sente mais produtivo e confortável.',
        example: 'Exemplo: trabalhar sozinho em home office vs. brainstorming em equipe.',
        area: 'collaboration'
    },
    {
        question: 'Quanto você valoriza a diversidade de ideias e opiniões?',
        explanation: 'Essa pergunta avalia sua abertura para diferentes perspectivas e pontos de vista.',
        tip: 'Reflita se você busca ativamente ouvir opiniões diferentes das suas.',
        example: 'Exemplo: debater com pessoas de áreas diferentes, aceitar sugestões construtivas.',
        area: 'diversity'
    },
    {
        question: 'Você se considera uma pessoa proativa?',
        explanation: 'Essa pergunta avalia sua iniciativa para buscar oportunidades e agir por conta própria.',
        tip: 'Pense se você costuma tomar a frente ou esperar ser solicitado.',
        example: 'Exemplo: antecipar problemas, sugerir melhorias espontaneamente, se voluntariar.',
        area: 'proactivity'
    },
    {
        question: 'Como você se sente em relação a mudanças tecnológicas?',
        explanation: 'Essa pergunta avalia sua adaptabilidade a avanços tecnológicos e novas ferramentas.',
        tip: 'Considere como você reage quando precisa aprender uma nova tecnologia.',
        example: 'Exemplo: usar um novo software, aprender a programar ou usar IA.',
        area: 'tech_adaptability'
    },
    {
        question: 'Como você lida com ambientes de alta pressão?',
        explanation: 'Essa pergunta avalia sua capacidade de trabalhar sob pressão e manter a qualidade.',
        tip: 'Reflita sobre como você se comporta em momentos de grande cobrança.',
        example: 'Exemplo: período de provas, entrega de projeto importante, metas agressivas.',
        area: 'pressure_handling'
    },
    {
        question: 'Você prefere seguir rotinas estabelecidas ou criar suas próprias abordagens?',
        explanation: 'Essa pergunta avalia sua preferência por estrutura ou flexibilidade.',
        tip: 'Pense se você se sente mais confortável com processos definidos ou liberdade criativa.',
        example: 'Exemplo: seguir um manual vs. criar seu próprio método de trabalho.',
        area: 'routine_preference'
    },
    {
        question: 'Como você lida com feedback construtivo?',
        explanation: 'Essa pergunta avalia sua receptividade ao feedback para melhoria pessoal e profissional.',
        tip: 'Considere como você recebe críticas e sugestões de melhoria.',
        example: 'Exemplo: receber avaliação de desempenho, ouvir críticas de colegas ou clientes.',
        area: 'feedback_handling'
    },
    {
        question: 'Como você se sente em relação a trabalhar em projetos de longo prazo?',
        explanation: 'Essa pergunta avalia sua paciência e comprometimento com projetos extensos.',
        tip: 'Reflita se você prefere resultados rápidos ou tem disciplina para projetos longos.',
        example: 'Exemplo: desenvolver uma pesquisa de anos, construir uma carreira acadêmica.',
        area: 'long_term_projects'
    }
]);

const RECOMENDACOES = Object.freeze({
    positivo: {
        creativity: 'Excelente criatividade! Você tem forte potencial para áreas como Design, Marketing, Artes, Publicidade e Desenvolvimento de Produtos.',
        analytical: 'Ótima capacidade analítica! Carreiras como Engenharia, Ciência de Dados, Finanças e Tecnologia da Informação são ideais para você.',
        communication: 'Você se destaca na comunicação! Considere áreas como Relações Públicas, Jornalismo, Advocacia, Vendas e Gestão de Pessoas.',
        innovation: 'Seu espírito inovador é notável! Áreas como Startups, Pesquisa e Desenvolvimento, Consultoria e Empreendedorismo combinam com você.',
        leadership: 'Você tem perfil de líder! Gestão Empresarial, Administração, Coordenação de Projetos e Direção Executiva são caminhos promissores.',
        adaptability: 'Sua adaptabilidade é uma grande virtude! Áreas dinâmicas como Consultoria, Gestão de Mudanças e Relações Internacionais são ideais.',
        organization: 'Sua organização é exemplar! Considere carreiras em Administração, Logística, Gestão de Projetos e Controladoria.',
        time_management: 'Excelente gestão do tempo! Você se destaca em ambientes de alta demanda como Gestão de Projetos e Operações.',
        continuous_learning: 'Seu amor pelo aprendizado é admirável! Pesquisa Acadêmica, Docência, Tecnologia e Ciências são ótimas opções.',
        resilience: 'Sua resiliência é impressionante! Áreas como Gestão de Crises, Segurança, Saúde e Empreendedorismo se beneficiam dessa qualidade.',
        collaboration: 'Você trabalha muito bem em equipe! Gestão de Equipes, Recursos Humanos e Desenvolvimento Organizacional são ideais.',
        diversity: 'Você valoriza muito a diversidade! Áreas como Relações Internacionais, ONGs, RH e Educação Inclusiva combinam com seu perfil.',
        proactivity: 'Sua proatividade é destaque! Empreendedorismo, Vendas, Gestão Comercial e Liderança de Projetos são caminhos naturais.',
        tech_adaptability: 'Você se adapta facilmente à tecnologia! Carreiras em TI, Desenvolvimento de Software, IA e Transformação Digital são perfeitas.',
        pressure_handling: 'Você lida muito bem com pressão! Áreas como Medicina, Engenharia, Mercado Financeiro e Gestão de Crises são ideais.',
        time_pressure_handling: 'Excelente sob pressão temporal! Jornalismo, Trading, Atendimento de Emergência e Logística combinam com seu perfil.',
        routine_preference: 'Você gosta de criar suas próprias abordagens! Áreas criativas, Empreendedorismo e Pesquisa são ideais.',
        feedback_handling: 'Ótima receptividade a feedback! Isso é essencial para crescimento em qualquer carreira, especialmente Gestão e Consultoria.',
        long_term_projects: 'Você tem excelente comprometimento! Pesquisa Científica, Engenharia Civil, Arquitetura e Desenvolvimento de Software são ótimas opções.'
    },
    negativo: {
        creativity: 'A criatividade pode ser desenvolvida. Tente atividades como desenho, escrita criativa ou brainstorming para expandir esse potencial.',
        analytical: 'Habilidades analíticas podem ser aprimoradas. Experimente jogos de lógica, matemática aplicada e análise de dados para evoluir.',
        communication: 'A comunicação é uma competência treinável. Pratique apresentações, participe de debates e busque cursos de oratória.',
        innovation: 'A inovação pode ser estimulada. Acompanhe tendências, participe de hackathons e busque inspiração em diferentes áreas.',
        leadership: 'Liderança pode ser desenvolvida gradualmente. Comece assumindo pequenas responsabilidades e busque mentoria na área.',
        adaptability: 'A adaptabilidade pode ser treinada. Exponha-se a novas experiências e desafios fora da sua zona de conforto.',
        organization: 'Organização é uma habilidade que melhora com prática. Use ferramentas de produtividade e crie rotinas estruturadas.',
        time_management: 'Gestão do tempo pode ser aprimorada. Utilize técnicas como Pomodoro, GTD ou matriz de Eisenhower.',
        continuous_learning: 'O aprendizado contínuo é vital. Comece com temas de seu interesse e vá expandindo para novas áreas de conhecimento.',
        resilience: 'A resiliência pode ser fortalecida. Pratique mindfulness, busque apoio em momentos difíceis e aprenda com os desafios.',
        collaboration: 'Trabalho em equipe pode ser aprimorado. Participe de projetos colaborativos e desenvolva suas habilidades interpessoais.',
        diversity: 'Abertura à diversidade enriquece sua visão. Busque conhecer culturas e perspectivas diferentes para ampliar horizontes.',
        proactivity: 'A proatividade pode ser cultivada. Defina metas pessoais e busque oportunidades antes que sejam apresentadas.',
        tech_adaptability: 'Adaptação tecnológica é essencial hoje. Comece aprendendo ferramentas básicas e avance gradualmente para tecnologias mais complexas.',
        pressure_handling: 'Lidar com pressão é treinável. Pratique técnicas de relaxamento e organize melhor suas prioridades.',
        time_pressure_handling: 'Pressão temporal pode ser gerenciada. Planeje com antecedência e desenvolva a capacidade de priorizar tarefas.',
        routine_preference: 'Flexibilidade pode ser desenvolvida. Tente variar suas rotinas gradualmente e explore novas formas de trabalhar.',
        feedback_handling: 'Receptividade a feedback é fundamental. Trate críticas como oportunidades de crescimento e melhoria contínua.',
        long_term_projects: 'Comprometimento com projetos longos pode ser aprimorado. Divida grandes projetos em metas menores e celebre cada conquista.'
    }
});
