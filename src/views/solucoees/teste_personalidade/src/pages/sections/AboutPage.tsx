import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBrain,
    faUsers,
    faChartLine,
    faShieldAlt,
    faHeart,
    faLightbulb,
    faCheckCircle,
    faStar,
    faGlobe,
    faLock,
    faFilePdf,
    faAward,
    faBullseye,
    faHandshake,
    faEye,
    faRocket,
    faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
    const navigate = useNavigate();

    const methodologies = [
        { name: 'DISC', description: 'Análise de 4 perfis comportamentais para comunicação e liderança', color: 'from-purple-500 to-indigo-600' },
        { name: 'Eneagrama', description: '9 tipos de personalidade com motivações e medos profundos', color: 'from-blue-500 to-cyan-600' },
        { name: 'Big Five (OCEAN)', description: '5 grandes fatores reconhecidos pela psicologia moderna', color: 'from-cyan-500 to-teal-600' },
        { name: 'MBTI Simplificado', description: '16 tipos de personalidade baseados nas preferências de Jung', color: 'from-violet-500 to-fuchsia-600' },
        { name: 'Teste Vocacional', description: 'Mapeamento de 8 áreas profissionais e orientação de carreira', color: 'from-green-500 to-emerald-600' },
        { name: 'Método STAR', description: 'Avaliação de competências comportamentais em cenários reais', color: 'from-orange-500 to-amber-600' },
        { name: 'Temperamento', description: '4 temperamentos clássicos: Sanguíneo, Colérico, Melancólico, Fleumático', color: 'from-rose-500 to-red-600' },
        { name: 'Teste Profiler', description: 'Perfil profissional: Executor, Comunicador, Planejador ou Analista', color: 'from-slate-500 to-gray-700' },
        { name: 'Perfil Animal', description: '12 perfis animais que representam seus traços de personalidade', color: 'from-emerald-500 to-teal-600' },
        { name: '3 Animais', description: 'Autoimagem, imagem social e identidade real em 3 escolhas', color: 'from-lime-500 to-green-600' },
        { name: 'Floresta Tropical', description: 'Jornada simbólica projetiva para revelar o inconsciente', color: 'from-green-600 to-emerald-700' },
        { name: 'Raciocínio Cognitivo', description: 'Avaliação de raciocínio lógico, verbal e matemático', color: 'from-amber-500 to-orange-600' },
        { name: 'Maturidade Mental', description: 'Idade mental com análise de 6 dimensões emocionais', color: 'from-pink-500 to-rose-600' },
        { name: 'Saúde Mental', description: 'Triagem de indicadores de humor e ansiedade (PHQ-9)', color: 'from-red-500 to-pink-600' },
    ];

    return (
        <div className="bg-white">
            <Helmet>
                <title>Sobre Nós — Plataforma de Testes de Personalidade</title>
                <meta name="description" content="Conheça nossa missão, metodologias e valores. 14 testes de personalidade científicos, gratuitos e com resultados detalhados." />
            </Helmet>

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                        <span className="text-sm font-semibold">Plataforma #1 em Testes de Personalidade no Brasil</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Sobre <span className="text-yellow-300">Nós</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed">
                        Democratizamos o autoconhecimento com <strong className="text-yellow-300">14 testes científicos gratuitos</strong>, 
                        resultados detalhados e metodologias reconhecidas mundialmente.
                    </p>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: faBullseye,
                                title: 'Nossa Missão',
                                description: 'Democratizar o acesso a ferramentas de autoconhecimento científico, tornando testes de personalidade profissionais gratuitos e acessíveis para todos.',
                                color: 'from-violet-500 to-purple-600',
                            },
                            {
                                icon: faEye,
                                title: 'Nossa Visão',
                                description: 'Ser a plataforma de referência em autoconhecimento no Brasil, ajudando milhões de pessoas a descobrirem seu potencial e tomarem decisões melhores.',
                                color: 'from-blue-500 to-cyan-600',
                            },
                            {
                                icon: faHandshake,
                                title: 'Nossos Valores',
                                description: 'Acessibilidade, rigor científico, privacidade do usuário, transparência nos resultados e compromisso com a educação em saúde mental.',
                                color: 'from-green-500 to-emerald-600',
                            },
                        ].map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                                <div className="relative bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-violet-200 hover:shadow-xl transition-all duration-300 h-full">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                                        <FontAwesomeIcon icon={item.icon} className="text-2xl text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                            Nossa Plataforma em Números
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: faBrain, title: '14', subtitle: 'Testes Científicos', color: 'text-violet-600' },
                                { icon: faUsers, title: '+5.000', subtitle: 'Pessoas Atendidas', color: 'text-blue-600' },
                                { icon: faChartLine, title: '100%', subtitle: 'Gratuito Sempre', color: 'text-green-600' },
                                { icon: faShieldAlt, title: 'Total', subtitle: 'Privacidade', color: 'text-amber-600' },
                            ].map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                                    <FontAwesomeIcon icon={stat.icon} className={`text-4xl ${stat.color} mb-3`} />
                                    <div className="text-3xl font-bold text-gray-900">{stat.title}</div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.subtitle}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodologies */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                            🧠 Metodologias Reconhecidas Mundialmente
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            14 Testes Baseados em Ciência
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Cada teste utiliza metodologias validadas pela psicologia, adaptadas para oferecer resultados claros e acionáveis
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {methodologies.map((method, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-violet-300 transition-all duration-300 group">
                                <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">{method.name}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{method.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features / Differentiators */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        O Que Nos Diferencia
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Mais do que testes — uma experiência completa de autoconhecimento
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: faAward, title: 'Baseado em Ciência', description: 'Testes fundamentados em teorias psicológicas reconhecidas como Big Five, DISC, Eneagrama e Jung.' },
                            { icon: faHeart, title: 'Gratuito Para Todos', description: 'Autoconhecimento não deve ter barreiras. Todos os 14 testes são 100% gratuitos, sem cadastro obrigatório.' },
                            { icon: faLightbulb, title: 'Resultados Detalhados', description: 'Análises completas com gráficos, pontuações por dimensão, dicas personalizadas e próximos passos.' },
                            { icon: faLock, title: 'Privacidade Total', description: 'Dados processados localmente no navegador. Nada é armazenado em servidores — sua privacidade é absoluta.' },
                            { icon: faFilePdf, title: 'Exportação em PDF', description: 'Salve seus resultados em PDF profissional para consultar quando quiser ou compartilhar com um especialista.' },
                            { icon: faGlobe, title: 'Compartilhamento Fácil', description: 'Compartilhe seus resultados por WhatsApp, e-mail ou PDF com amigos, familiares ou profissionais.' },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={feature.icon} className="text-3xl text-violet-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O Que Dizem Nossos Usuários</h2>
                        <p className="text-lg text-gray-600">Milhares de pessoas já descobriram mais sobre si mesmas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Maria S.', city: 'São Paulo, SP', text: 'Descobri aspectos sobre mim que nunca havia percebido! O teste DISC me ajudou muito na minha carreira.', stars: 5 },
                            { name: 'Carlos R.', city: 'Rio de Janeiro, RJ', text: 'O Eneagrama foi revelador. Compartilhei com minha equipe inteira e melhoramos nossa comunicação.', stars: 5 },
                            { name: 'Ana L.', city: 'Belo Horizonte, MG', text: 'Os 14 testes são incríveis! Fiz todos e agora tenho uma visão completa da minha personalidade. Recomendo demais!', stars: 5 },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                                <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-violet-200 mb-4" />
                                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.city}</div>
                                    </div>
                                    <div className="flex space-x-1">
                                        {Array.from({ length: testimonial.stars }).map((_, i) => (
                                            <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-16 bg-amber-50 border-y-4 border-amber-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">⚠️ Aviso Importante</h3>
                    <p className="text-amber-800 leading-relaxed text-center">
                        Nossos testes são para fins <strong>educacionais e de entretenimento</strong>.
                        Eles não substituem avaliação psicológica profissional. Para questões clínicas ou
                        diagnósticos precisos, consulte sempre um psicólogo qualificado.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faRocket} className="text-5xl mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Pronto para se Conhecer Melhor?
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 leading-relaxed">
                        14 testes gratuitos esperando por você. Comece agora e descubra seu verdadeiro potencial!
                    </p>
                    <button
                        onClick={() => navigate('/ferramentas')}
                        className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        🚀 Explorar Todos os Testes →
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
