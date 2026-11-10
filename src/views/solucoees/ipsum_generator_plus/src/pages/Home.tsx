import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRocket,
    faBolt,
    faShield,
    faPalette,
    faCode,
    faGlobe,
    faArrowRight,
    faCheckCircle,
    faStar,
    faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

const Home = () => {
    const features = [
        {
            icon: faBolt,
            title: 'Ultra Rápido',
            description: 'Gere textos instantaneamente com apenas um clique',
        },
        {
            icon: faPalette,
            title: 'Múltiplos Estilos',
            description: 'Clássico, Mussum, Hipster, Bacon e muito mais',
        },
        {
            icon: faCode,
            title: 'Formatos Variados',
            description: 'HTML, JSON, texto puro - escolha o que precisa',
        },
        {
            icon: faShield,
            title: '100% Seguro',
            description: 'Processamento local, seus dados não saem do navegador',
        },
        {
            icon: faGlobe,
            title: 'Totalmente Gratuito',
            description: 'Sem limites, sem cadastro, sem pegadinhas',
        },
        {
            icon: faRocket,
            title: 'Sempre Disponível',
            description: 'Acesse de qualquer lugar, a qualquer hora',
        },
    ];

    const benefits = [
        'Economize tempo em seus projetos de design',
        'Crie protótipos profissionais rapidamente',
        'Teste layouts com conteúdo realista',
        'Múltiplas opções de personalização',
        'Interface intuitiva e responsiva',
        'Sem necessidade de cadastro ou login',
    ];

    const testimonials = [
        {
            name: 'Maria Silva',
            role: 'Designer UX/UI',
            text: 'Ferramenta indispensável! Uso diariamente para criar protótipos. A variedade de estilos é incrível!',
            rating: 5,
        },
        {
            name: 'João Santos',
            role: 'Desenvolvedor Frontend',
            text: 'Extremamente rápido e eficiente. A opção de exportar em JSON me economiza muito tempo.',
            rating: 5,
        },
        {
            name: 'Ana Costa',
            role: 'Gerente de Projetos',
            text: 'Interface moderna e fácil de usar. Recomendo para toda a equipe!',
            rating: 5,
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-8">
                        <div className="inline-block">
                            <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                                <span>Ferramenta #1 em Geração de Texto</span>
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Gerador de Lorem Ipsum
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                                Profissional e Gratuito
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed">
                            Crie textos <span className="font-bold text-white">Lorem Ipsum personalizados</span> em
                            segundos! Múltiplos estilos, formatos e totalmente gratuito. A
                            ferramenta que designers e desenvolvedores confiam.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                to="/ferramentas"
                                className="group inline-flex items-center space-x-3 bg-white text-violet-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
                            >
                                <span>Começar Agora</span>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </Link>
                            <Link
                                to="/sobre"
                                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                            >
                                <span>Saiba Mais</span>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center space-x-8 pt-8 text-sm">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-300" />
                                <span>100% Gratuito</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-300" />
                                <span>Sem Cadastro</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-300" />
                                <span>Ilimitado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Por Que Escolher Nossa Ferramenta?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Desenvolvida com foco em produtividade, simplicidade e resultados profissionais
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-violet-100"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon
                                            icon={feature.icon}
                                            className="text-white text-2xl"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Tudo Que Você Precisa Para Seus Projetos
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Nossa ferramenta foi projetada para atender todas as necessidades
                                de designers, desenvolvedores e criadores de conteúdo.
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            className="text-violet-600 text-xl mt-1 flex-shrink-0"
                                        />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/ferramentas"
                                className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-8"
                            >
                                <span>Experimentar Grátis</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full">
                                        <div className="space-y-3">
                                            <div className="h-4 bg-white/30 rounded w-3/4"></div>
                                            <div className="h-4 bg-white/30 rounded w-full"></div>
                                            <div className="h-4 bg-white/30 rounded w-5/6"></div>
                                            <div className="h-4 bg-white/30 rounded w-full"></div>
                                            <div className="h-4 bg-white/30 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            O Que Nossos Usuários Dizem
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Mais de 2.500 profissionais confiam em nossa ferramenta
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-violet-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-violet-100"
                            >
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FontAwesomeIcon
                                            key={i}
                                            icon={faStar}
                                            className="text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <FontAwesomeIcon
                                    icon={faQuoteLeft}
                                    className="text-violet-300 text-3xl mb-4"
                                />
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {testimonial.text}
                                </p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Pronto Para Transformar Seus Projetos?
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                        Junte-se a milhares de profissionais que já descobriram a forma mais
                        rápida e eficiente de gerar textos Lorem Ipsum
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/ferramentas"
                            className="inline-flex items-center space-x-3 bg-white text-violet-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                        >
                            <span>Começar Gratuitamente</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <Link
                            to="/contato"
                            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                        >
                            <span>Entrar em Contato</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA 3w Online */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Precisa de um Sistema Personalizado?
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                        A <span className="font-bold text-violet-400">3w Online</span> desenvolve
                        sites e sistemas sob medida para o seu negócio. Transforme sua ideia em
                        realidade com nossa equipe especializada!
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
                    >
                        <span>Conheça a 3w Online</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
