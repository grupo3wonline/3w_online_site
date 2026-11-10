import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRocket,
    faUsers,
    faLightbulb,
    faHeart,
    faArrowRight,
    faCheckCircle,
    faTrophy,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

const Sobre = () => {
    const stats = [
        { icon: faUsers, value: '2.500+', label: 'Usuários Ativos' },
        { icon: faGlobe, value: '50+', label: 'Países' },
        { icon: faTrophy, value: '4.9/5', label: 'Avaliação' },
        { icon: faRocket, value: '100%', label: 'Gratuito' },
    ];

    const values = [
        {
            icon: faLightbulb,
            title: 'Inovação',
            description:
                'Buscamos constantemente formas de melhorar e inovar nossa ferramenta',
        },
        {
            icon: faHeart,
            title: 'Paixão',
            description:
                'Desenvolvemos com amor e dedicação para entregar a melhor experiência',
        },
        {
            icon: faUsers,
            title: 'Comunidade',
            description:
                'Ouvimos nossos usuários e evoluímos com base em suas necessidades',
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Sobre Nós
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto">
                        Criando soluções inovadoras para designers e desenvolvedores desde
                        2024
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Nossa Missão
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Fornecer uma ferramenta <span className="font-bold text-violet-600">gratuita e profissional</span> para
                                geração de textos Lorem Ipsum que economize tempo e aumente a
                                produtividade de profissionais criativos ao redor do mundo.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                Acreditamos que ferramentas de qualidade não precisam ser
                                complexas ou caras. Nossa missão é democratizar o acesso a
                                recursos profissionais, permitindo que qualquer pessoa, em
                                qualquer lugar, possa criar projetos incríveis.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-xl flex-shrink-0"
                                    />
                                    <span className="text-gray-700">
                                        Comprometimento com a excelência
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-xl flex-shrink-0"
                                    />
                                    <span className="text-gray-700">
                                        Foco na experiência do usuário
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-xl flex-shrink-0"
                                    />
                                    <span className="text-gray-700">
                                        Inovação contínua e melhorias
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faRocket}
                                        className="text-white/20 text-9xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nossos Números
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Resultados que comprovam nossa dedicação
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center border border-violet-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl mb-4">
                                    <FontAwesomeIcon
                                        icon={stat.icon}
                                        className="text-white text-2xl"
                                    />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nossos Valores
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Princípios que guiam nosso trabalho diário
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-violet-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon
                                        icon={value.icon}
                                        className="text-white text-2xl"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nossa História
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Em 2024, identificamos a necessidade de uma ferramenta moderna,
                            rápida e gratuita para geração de textos Lorem Ipsum. Cansados de
                            soluções ultrapassadas e limitadas, decidimos criar algo diferente.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Combinando design moderno, tecnologia de ponta e foco total na
                            experiência do usuário, desenvolvemos o <span className="font-bold text-violet-600">Lorem Ipsum+</span>.
                            Uma ferramenta que não apenas gera texto, mas entende as
                            necessidades reais de quem trabalha com design e desenvolvimento.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Hoje, servimos milhares de profissionais em dezenas de países,
                            mantendo nosso compromisso de oferecer uma ferramenta 100% gratuita,
                            sem limitações e sempre em evolução.
                        </p>
                        <Link
                            to="/ferramentas"
                            className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span>Experimentar Agora</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA 3w Online */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Desenvolvido pela 3w Online
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                        Somos especialistas em criar <span className="font-bold text-violet-400">sites e sistemas personalizados</span> que
                        transformam ideias em realidade. Com anos de experiência, entregamos
                        soluções sob medida para o seu negócio.
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
                    >
                        <span>Conheça Nossos Serviços</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
            </section>
        </Layout>
    );
};

export default Sobre;
