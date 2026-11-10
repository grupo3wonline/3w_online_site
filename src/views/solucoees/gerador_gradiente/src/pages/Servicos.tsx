import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';
import CTA from '../components/CTA';

const Servicos = () => {
    const services = [
        {
            icon: 'fa-laptop-code',
            title: 'Desenvolvimento Web',
            description: 'Criamos sites modernos, responsivos e otimizados para SEO usando as melhores tecnologias do mercado.',
            features: [
                'Sites Institucionais',
                'Landing Pages',
                'E-commerce',
                'Portais Corporativos',
            ],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: 'fa-cogs',
            title: 'Sistemas Personalizados',
            description: 'Desenvolvemos sistemas sob medida para atender às necessidades específicas do seu negócio.',
            features: [
                'ERP e CRM',
                'Gestão Empresarial',
                'Automação de Processos',
                'Integrações API',
            ],
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Aplicativos Mobile',
            description: 'Aplicativos nativos e híbridos para iOS e Android com performance e usabilidade excepcionais.',
            features: [
                'Apps iOS e Android',
                'Progressive Web Apps',
                'App Híbridos',
                'Manutenção e Suporte',
            ],
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: 'fa-paint-brush',
            title: 'Design UI/UX',
            description: 'Interfaces modernas e intuitivas que encantam usuários e convertem visitantes em clientes.',
            features: [
                'Design de Interface',
                'Experiência do Usuário',
                'Prototipagem',
                'Design System',
            ],
            color: 'from-pink-500 to-red-500',
        },
        {
            icon: 'fa-search',
            title: 'SEO e Marketing Digital',
            description: 'Estratégias completas para posicionar seu negócio no topo dos resultados de busca.',
            features: [
                'Otimização SEO',
                'Google Ads',
                'Marketing de Conteúdo',
                'Analytics e Métricas',
            ],
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: 'fa-headset',
            title: 'Suporte e Manutenção',
            description: 'Suporte técnico especializado e manutenção preventiva para garantir o funcionamento perfeito.',
            features: [
                'Suporte 24/7',
                'Atualizações Regulares',
                'Backup e Segurança',
                'Monitoramento',
            ],
            color: 'from-indigo-500 to-purple-500',
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Análise e Planejamento',
            description: 'Entendemos seu negócio, objetivos e público-alvo para criar a estratégia perfeita.',
            icon: 'fa-lightbulb',
        },
        {
            step: '02',
            title: 'Design e Prototipação',
            description: 'Criamos protótipos e designs que serão validados antes do desenvolvimento.',
            icon: 'fa-pencil-ruler',
        },
        {
            step: '03',
            title: 'Desenvolvimento',
            description: 'Codificamos seu projeto usando as melhores práticas e tecnologias modernas.',
            icon: 'fa-code',
        },
        {
            step: '04',
            title: 'Testes e Qualidade',
            description: 'Testamos exaustivamente para garantir que tudo funcione perfeitamente.',
            icon: 'fa-check-double',
        },
        {
            step: '05',
            title: 'Lançamento',
            description: 'Deploy em produção com acompanhamento e suporte total.',
            icon: 'fa-rocket',
        },
        {
            step: '06',
            title: 'Suporte Contínuo',
            description: 'Acompanhamento pós-lançamento, atualizações e melhorias constantes.',
            icon: 'fa-life-ring',
        },
    ];

    const whyChooseUs = [
        {
            icon: 'fa-award',
            title: 'Experiência Comprovada',
            description: 'Mais de 10 anos desenvolvendo soluções web de sucesso para diversos segmentos.',
        },
        {
            icon: 'fa-rocket',
            title: 'Tecnologia de Ponta',
            description: 'Utilizamos as tecnologias mais modernas e eficientes do mercado.',
        },
        {
            icon: 'fa-users',
            title: 'Equipe Especializada',
            description: 'Profissionais qualificados e apaixonados pelo que fazem.',
        },
        {
            icon: 'fa-handshake',
            title: 'Parceria Verdadeira',
            description: 'Trabalhamos lado a lado com você para alcançar os melhores resultados.',
        },
    ];

    return (
        <Layout>
            <SEO
                title="Serviços de Desenvolvimento Web e Sistemas | 3w Online"
                description="Desenvolvimento de sites, sistemas personalizados, aplicativos mobile e soluções digitais sob medida. Tecnologia de ponta e suporte especializado."
                keywords="desenvolvimento web, sistemas personalizados, aplicativos mobile, design ui ux, seo, 3w online"
                url="https://app.3wonline.com/gerador_gradiente/servicos"
            />

            <div className="container mx-auto px-4">
                <Breadcrumb items={[{ label: 'Serviços' }]} />

                {/* Hero Section */}
                <section className="py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Nossos <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Serviços</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Soluções completas em desenvolvimento web e tecnologia para transformar
                            seu negócio e levá-lo ao próximo nível digital.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <i className={`fas ${service.icon} text-white text-2xl`}></i>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl px-8 my-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Nosso <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Processo</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Metodologia comprovada para garantir o sucesso do seu projeto
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {process.map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                                    {item.step}
                                </div>

                                <div className="mt-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                                        <i className={`fas ${item.icon} text-indigo-600 text-xl`}></i>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Por Que Escolher a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">3w Online</span>?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Diferenciais que nos tornam a melhor escolha para seu projeto
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${item.icon} text-white text-3xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <CTA
                    title="Pronto para Começar Seu Projeto?"
                    description="Entre em contato conosco e descubra como podemos transformar suas ideias em realidade com tecnologia de ponta e qualidade excepcional."
                    buttonText="Solicitar Proposta Personalizada"
                    variant="secondary"
                />
            </div>
        </Layout>
    );
};

export default Servicos;
