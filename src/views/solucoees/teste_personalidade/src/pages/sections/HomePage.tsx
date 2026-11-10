import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBrain,
    faUsers,
    faBullseye,
    faLightbulb,
    faHeart,
    faChartLine,
    faCheckCircle,
    faArrowRight,
    faShieldAlt,
    faTrophy,
    faRocket,
    faStar,
    faQuestionCircle,
    faPaw,
    faTree,
    faUserSecret,
    faFingerprint,
    faPuzzlePiece,
    faCompass,
    faFire,
    faDna,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const HomePage = () => {
    const navigate = useNavigate();

    const tests = [
        {
            title: 'Teste DISC',
            description: 'Descubra seu perfil comportamental: Dominância, Influência, Estabilidade ou Conformidade.',
            icon: faChartLine,
            gradient: 'from-purple-500 to-indigo-600',
            features: ['20 questões práticas', '4 perfis comportamentais', 'Análise detalhada'],
            path: '/tests/disc',
        },
        {
            title: 'Eneagrama',
            description: 'Identifique seu tipo de personalidade entre os 9 tipos e compreenda suas motivações profundas.',
            icon: faUsers,
            gradient: 'from-blue-500 to-cyan-600',
            features: ['20 questões profundas', '9 tipos de personalidade', 'Autoconhecimento'],
            path: '/tests/enneagram',
        },
        {
            title: 'Teste Vocacional',
            description: 'Descubra quais áreas profissionais se alinham com seus interesses e habilidades.',
            icon: faBullseye,
            gradient: 'from-green-500 to-emerald-600',
            features: ['25 questões estratégicas', '8 áreas profissionais', 'Orientação de carreira'],
            path: '/tests/vocational',
        },
        {
            title: 'Teste de QI',
            description: 'Avalie seu raciocínio lógico e verbal com questões desafiadoras.',
            icon: faBrain,
            gradient: 'from-amber-500 to-orange-600',
            features: ['10 questões lógicas', 'Raciocínio avançado', 'Resultado imediato'],
            path: '/tests/iq',
        },
        {
            title: 'Idade Mental',
            description: 'Descubra sua idade mental através de questões sobre comportamento e atitudes.',
            icon: faLightbulb,
            gradient: 'from-pink-500 to-rose-600',
            features: ['12 questões divertidas', 'Análise comportamental', 'Para entretenimento'],
            path: '/tests/mental-age',
        },
        {
            title: 'Saúde Mental',
            description: 'Triagem de sinais de humor e bem-estar com base no PHQ-9 (não substitui avaliação médica).',
            icon: faHeart,
            gradient: 'from-red-500 to-pink-600',
            features: ['9 questões de triagem', 'Baseado no PHQ-9', 'Orientação profissional'],
            path: '/tests/mental-health',
        },
        {
            title: 'Perfil Animal',
            description: 'Descubra qual animal representa sua personalidade e como isso influencia suas relações.',
            icon: faPaw,
            gradient: 'from-emerald-500 to-teal-600',
            features: ['20 questões divertidas', '12 perfis animais', 'Análise comportamental'],
            path: '/tests/animal-profile',
        },
        {
            title: '3 Animais',
            description: 'Escolha 3 animais e descubra como você se vê, como os outros te veem e quem de fato você é.',
            icon: faDna,
            gradient: 'from-lime-500 to-green-600',
            features: ['3 etapas simples', 'Análise tripla de perfil', 'Resultado instantâneo'],
            path: '/tests/three-animals',
        },
        {
            title: 'Floresta Tropical',
            description: 'Uma jornada simbólica pela floresta para revelar seu inconsciente e emoções profundas.',
            icon: faTree,
            gradient: 'from-green-600 to-emerald-700',
            features: ['10 cenários imersivos', 'Análise simbólica', 'Psicologia projetiva'],
            path: '/tests/tropical-forest',
        },
        {
            title: 'Teste Profiler',
            description: 'Identifique seu perfil profissional predominante: Executor, Comunicador, Planejador ou Analista.',
            icon: faUserSecret,
            gradient: 'from-slate-600 to-gray-800',
            features: ['25 questões focadas', '4 perfis profissionais', 'Dicas de carreira'],
            path: '/tests/profiler',
        },
        {
            title: 'Big Five (OCEAN)',
            description: 'Avalie os 5 grandes fatores de personalidade: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo.',
            icon: faFingerprint,
            gradient: 'from-cyan-500 to-blue-600',
            features: ['25 questões cientificas', '5 fatores OCEAN', 'Modelo reconhecido mundialmente'],
            path: '/tests/big-five',
        },
        {
            title: 'MBTI Simplificado',
            description: 'Descubra seu tipo entre as 16 personalidades com base nas preferências de Jung.',
            icon: faPuzzlePiece,
            gradient: 'from-violet-600 to-fuchsia-600',
            features: ['20 questões', '16 tipos de personalidade', 'Preferências cognitivas'],
            path: '/tests/mbti',
        },
        {
            title: 'Método STAR',
            description: 'Avalie suas competências comportamentais usando o método Situação-Tarefa-Ação-Resultado.',
            icon: faCompass,
            gradient: 'from-orange-500 to-amber-600',
            features: ['12 cenários reais', '6 competências avaliadas', 'Aplicável a entrevistas'],
            path: '/tests/star',
        },
        {
            title: 'Temperamento',
            description: 'Descubra seu temperamento clássico: Sanguíneo, Colérico, Melancólico ou Fleumático.',
            icon: faFire,
            gradient: 'from-rose-500 to-red-600',
            features: ['20 questões intuitivas', '4 temperamentos clássicos', 'Tradição milenar'],
            path: '/tests/temperament',
        },
    ];

    const benefits = [
        {
            icon: faShieldAlt,
            title: '100% Seguro',
            description: 'Seus dados são processados localmente e nunca compartilhados.',
        },
        {
            icon: faTrophy,
            title: 'Cientificamente Validado',
            description: 'Baseado em metodologias reconhecidas pela psicologia.',
        },
        {
            icon: faRocket,
            title: 'Resultados Imediatos',
            description: 'Receba sua análise completa em segundos após finalizar.',
        },
    ];

    const showHelp = () => {
        Swal.fire({
            title: 'Como Funciona?',
            html: `
        <div class="text-left space-y-3">
          <p><strong>1.</strong> Escolha um teste de personalidade abaixo</p>
          <p><strong>2.</strong> Responda às questões com honestidade</p>
          <p><strong>3.</strong> Receba seu resultado detalhado instantaneamente</p>
          <p><strong>4.</strong> Compartilhe ou salve em PDF</p>
          <hr class="my-3"/>
          <p class="text-sm text-gray-600">💡 <strong>Dica:</strong> Responda de forma natural, sem pensar muito. A primeira resposta geralmente é a mais autêntica!</p>
        </div>
      `,
            icon: 'info',
            confirmButtonText: 'Entendi!',
            confirmButtonColor: '#7c3aed',
        });
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Prova Social - Gatilho de Cialdini */}
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-bounce-subtle">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                        <span className="text-sm font-semibold">⭐ +5.000 Pessoas Transformaram suas Vidas!</span>
                    </div>

                    {/* Headline Persuasiva - Gatilho de Autoridade + Benefício */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Descubra <span className="text-yellow-300 underline decoration-wavy">Quem Você Realmente É</span>
                        <br />e Transforme Sua Vida!
                    </h1>

                    {/* Subheadline - Gatilho de Reciprocidade + Escassez */}
                    <p className="text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Acesso <strong className="text-yellow-300">100% GRATUITO</strong> aos mesmos testes usados por psicólogos profissionais.
                        <br />
                        <span className="text-lg">✨ Resultados detalhados em segundos + Análise completa do seu perfil</span>
                    </p>

                    {/* CTAs - Gatilho de Urgência + Ação */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button
                            onClick={() => navigate('/ferramentas')}
                            className="group bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-pulse hover:animate-none"
                        >
                            <span>🚀 Começar Agora - É GRÁTIS!</span>
                            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={showHelp}
                            className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-violet-600 transition-all duration-300 flex items-center space-x-2"
                        >
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            <span>Como Funciona?</span>
                        </button>
                    </div>

                    {/* Benefícios Chave - Gatilho de Prova Social + Autoridade */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        {[
                            '✅ 100% Gratuito',
                            '✅ Sem Cadastro Obrigatório',
                            '✅ Resultados em 60 Segundos',
                            '✅ Certificado Cientificamente'
                        ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                                <span className="font-semibold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section - Gatilho de Autoridade + Prova Social */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                            🏆 Por Que Mais de 5.000 Pessoas Escolheram Nossa Plataforma
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Qualidade Profissional,<br />
                            <span className="text-violet-600">Acesso 100% Gratuito</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Mesmos testes utilizados por psicólogos qualificados, agora ao seu alcance sem custo algum
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border-2 border-transparent hover:border-violet-500"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                                    <FontAwesomeIcon icon={benefit.icon} className="text-3xl text-violet-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Prova Social Adicional */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 text-lg">
                            💬 <strong className="text-violet-600">"Descobri aspectos sobre mim que nunca havia percebido!"</strong>
                            <br />
                            <span className="text-sm text-gray-500">— Maria S., São Paulo</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Tests Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Nossos Testes de Personalidade
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            14 testes profissionais para explorar seu autoconhecimento em profundidade
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tests.map((test, index) => (
                            <div
                                key={index}
                                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-violet-500 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${test.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <FontAwesomeIcon icon={test.icon} className="text-2xl text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{test.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{test.description}</p>

                                <ul className="space-y-2 mb-6">
                                    {test.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate(test.path)}
                                    className={`w-full bg-gradient-to-r ${test.gradient} text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                                >
                                    Fazer Teste Agora →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Gatilho de Urgência + Comprometimento */}
            <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-6">
                        ⏰ Não Perca Tempo — Comece Sua Transformação AGORA!
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Pronto Para Descobrir Seu<br />
                        <span className="text-yellow-300">Verdadeiro Potencial?</span>
                    </h2>

                    <p className="text-xl text-violet-100 mb-8 leading-relaxed">
                        Mais de <strong className="text-yellow-300">5.000 pessoas</strong> já transformaram suas vidas com autoconhecimento profundo.
                        <br />
                        <span className="text-lg">💎 Você merece saber quem você realmente é — e é totalmente GRÁTIS!</span>
                    </p>

                    <button
                        onClick={() => navigate('/ferramentas')}
                        className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2 animate-bounce-subtle"
                    >
                        <FontAwesomeIcon icon={faRocket} />
                        <span>Sim, Quero Me Conhecer Melhor Agora!</span>
                    </button>

                    <p className="mt-6 text-sm text-violet-200">
                        ✨ Sem cartão de crédito • Sem cadastro demorado • Resultados em 60 segundos
                    </p>
                </div>
            </section>

            {/* Company CTA - Gatilho de Autoridade + Credibilidade */}
            <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-purple-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-violet-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                        💼 Desenvolvimento Profissional de Sistemas
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold mb-4">
                        Precisa de um Site ou Sistema<br />
                        <span className="text-violet-400">Totalmente Personalizado?</span>
                    </h3>

                    <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                        A <strong className="text-violet-400">3w Online</strong> é especialista em desenvolver soluções digitais sob demanda.
                        Transformamos suas ideias em sistemas robustos, seguros e de alta performance.
                        <br />
                        <span className="text-yellow-400">✨ Mesma qualidade profissional que você viu nesta ferramenta!</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
                        {['React & Vue.js', 'Laravel & Node.js', 'SEO Avançado', 'Design Premium'].map((tech) => (
                            <span key={tech} className="bg-violet-600/30 px-4 py-2 rounded-lg border border-violet-500">{tech}</span>
                        ))}
                    </div>

                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                        🚀 Conheça a 3w Online e Solicite Seu Orçamento →
                    </a>

                    <p className="mt-4 text-sm text-gray-400">
                        Atendimento personalizado • Orçamento sem compromisso
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
