import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faDesktop,
    faMobile,
    faCloud,
    faShoppingCart,
    faChartLine,
    faArrowRight,
    faCheckCircle,
    faCog,
    faUsers,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

const Servicos = () => {
    const services = [
        {
            icon: faDesktop,
            title: 'Desenvolvimento Web',
            description:
                'Sites institucionais, landing pages e portais personalizados com design moderno e responsivo.',
            features: [
                'Design responsivo e moderno',
                'SEO otimizado',
                'Performance máxima',
                'Manutenção inclusa',
            ],
        },
        {
            icon: faCode,
            title: 'Sistemas Personalizados',
            description:
                'Desenvolvimento de sistemas sob medida para automatizar e otimizar seus processos de negócio.',
            features: [
                'Análise de requisitos',
                'Arquitetura escalável',
                'Integração com APIs',
                'Suporte técnico',
            ],
        },
        {
            icon: faMobile,
            title: 'Aplicativos Mobile',
            description:
                'Apps nativos e híbridos para iOS e Android com interface intuitiva e performance excepcional.',
            features: [
                'UI/UX profissional',
                'Notificações push',
                'Sincronização em nuvem',
                'Deploy nas lojas',
            ],
        },
        {
            icon: faShoppingCart,
            title: 'E-commerce',
            description:
                'Lojas virtuais completas com gestão de produtos, pagamentos, estoque e muito mais.',
            features: [
                'Múltiplos gateways de pagamento',
                'Gestão de estoque',
                'Painel administrativo',
                'Relatórios e análises',
            ],
        },
        {
            icon: faCloud,
            title: 'Cloud & DevOps',
            description:
                'Infraestrutura em nuvem, CI/CD, containerização e automação de deploys.',
            features: [
                'Deploy automatizado',
                'Monitoramento 24/7',
                'Backup automático',
                'Escalabilidade',
            ],
        },
        {
            icon: faChartLine,
            title: 'Consultoria Digital',
            description:
                'Análise, estratégia e consultoria para transformação digital do seu negócio.',
            features: [
                'Auditoria técnica',
                'Plano de ação',
                'Otimização de processos',
                'Treinamento de equipe',
            ],
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Análise',
            description: 'Entendemos suas necessidades e objetivos',
            icon: faLightbulb,
        },
        {
            step: '02',
            title: 'Planejamento',
            description: 'Criamos uma estratégia personalizada',
            icon: faCog,
        },
        {
            step: '03',
            title: 'Desenvolvimento',
            description: 'Construímos sua solução com excelência',
            icon: faCode,
        },
        {
            step: '04',
            title: 'Entrega',
            description: 'Lançamos e oferecemos suporte contínuo',
            icon: faUsers,
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
                        Nossos Serviços
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto">
                        Soluções completas em tecnologia para transformar seu negócio
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            O Que Oferecemos
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Serviços completos de desenvolvimento com qualidade e excelência
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-violet-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon
                                        icon={service.icon}
                                        className="text-white text-2xl"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start space-x-3">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="text-violet-600 text-lg mt-0.5 flex-shrink-0"
                                            />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nosso Processo
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Metodologia comprovada para entregar resultados excepcionais
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full text-white font-bold text-xl shadow-lg">
                                        {item.step}
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md">
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="text-violet-600"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Por Que Escolher a 3w Online?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                Somos mais que uma empresa de desenvolvimento. Somos seus
                                <span className="font-bold text-violet-600"> parceiros estratégicos</span> na transformação digital.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-xl">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-2xl mt-1 flex-shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Experiência Comprovada
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Anos de mercado com projetos de sucesso em diversos
                                            segmentos
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-xl">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-2xl mt-1 flex-shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Tecnologia de Ponta
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Utilizamos as melhores e mais modernas tecnologias do
                                            mercado
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-xl">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-2xl mt-1 flex-shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Suporte Dedicado
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Acompanhamento contínuo e suporte ágil sempre que precisar
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 p-4 bg-violet-50 rounded-xl">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-violet-600 text-2xl mt-1 flex-shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            Resultados Mensuráveis
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            Foco total em ROI e resultados concretos para seu negócio
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faCode}
                                        className="text-white/20 text-9xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Pronto Para Transformar Seu Negócio?
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                        Entre em contato e descubra como podemos criar a solução perfeita
                        para o seu projeto
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contato"
                            className="inline-flex items-center space-x-3 bg-white text-violet-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                        >
                            <span>Solicitar Orçamento</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                        >
                            <span>Conheça a 3w Online</span>
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Servicos;
