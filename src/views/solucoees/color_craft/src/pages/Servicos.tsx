import Layout from '@/components/Layout';
import CTASection from '@/components/CTASection';

const Servicos = () => {
    const services = [
        {
            icon: 'fa-code',
            title: 'Desenvolvimento Web',
            description: 'Sites institucionais, landing pages, e-commerce e portais corporativos desenvolvidos com as melhores tecnologias.',
            features: ['React', 'Vue.js', 'Next.js', 'WordPress', 'Otimização SEO', 'Performance'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: 'fa-desktop',
            title: 'Sistemas Personalizados',
            description: 'Desenvolvimento de sistemas sob medida para automatizar e otimizar processos do seu negócio.',
            features: ['ERP', 'CRM', 'Dashboard', 'API Rest', 'Integrações', 'Cloud'],
            color: 'from-violet-500 to-purple-500'
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Aplicativos Mobile',
            description: 'Apps nativos e híbridos para Android e iOS com design intuitivo e performance excepcional.',
            features: ['React Native', 'Flutter', 'PWA', 'Push Notifications', 'Offline First', 'App Stores'],
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: 'fa-paint-brush',
            title: 'UI/UX Design',
            description: 'Interfaces modernas, intuitivas e centradas no usuário para máximo engajamento e conversão.',
            features: ['Wireframes', 'Protótipos', 'Design System', 'User Research', 'A/B Testing', 'Figma'],
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: 'fa-search',
            title: 'SEO & Marketing Digital',
            description: 'Estratégias completas para ranquear seu site no Google e atrair mais clientes qualificados.',
            features: ['Google Ads', 'Analytics', 'Tag Manager', 'Link Building', 'Content Marketing', 'Social Media'],
            color: 'from-orange-500 to-amber-500'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Manutenção & Suporte',
            description: 'Suporte técnico especializado e manutenção preventiva para garantir 100% de disponibilidade.',
            features: ['Backup', 'Segurança', 'Atualizações', 'Monitoramento 24/7', 'SSL', 'LGPD'],
            color: 'from-indigo-500 to-blue-500'
        },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Nossos <span className="text-yellow-300">Serviços</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        Soluções completas em tecnologia para impulsionar seu negócio
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <i className={`fas ${service.icon} text-3xl text-white`}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                <div className="space-y-2">
                                    {service.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center text-sm">
                                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Nosso <span className="text-violet-600">Processo</span>
                        </h2>
                        <p className="text-xl text-gray-600">Metodologia ágil e transparente</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-8">
                            {[
                                { step: '01', title: 'Briefing', desc: 'Entendemos suas necessidades e objetivos', icon: 'fa-comments' },
                                { step: '02', title: 'Planejamento', desc: 'Criamos a estratégia e cronograma', icon: 'fa-tasks' },
                                { step: '03', title: 'Design', desc: 'Desenvolvemos protótipos e layouts', icon: 'fa-paint-brush' },
                                { step: '04', title: 'Desenvolvimento', desc: 'Codificamos sua solução', icon: 'fa-code' },
                                { step: '05', title: 'Testes', desc: 'Garantimos qualidade e performance', icon: 'fa-check-double' },
                                { step: '06', title: 'Entrega', desc: 'Lançamos e monitoramos', icon: 'fa-rocket' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-6 bg-gray-50 p-6 rounded-xl hover:bg-violet-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {item.step}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center">
                                            <i className={`fas ${item.icon} mr-3 text-violet-600`}></i>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Por Que Escolher a <span className="text-violet-600">3w Online</span>?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: 'fa-award', title: '+500 Projetos', desc: 'Projetos entregues com sucesso' },
                            { icon: 'fa-users', title: '+300 Clientes', desc: 'Clientes satisfeitos' },
                            { icon: 'fa-star', title: '4.9/5', desc: 'Avaliação média' },
                            { icon: 'fa-clock', title: '24/7', desc: 'Suporte disponível' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center bg-white p-8 rounded-xl shadow-lg">
                                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className={`fas ${stat.icon} text-2xl text-white`}></i>
                                </div>
                                <div className="text-3xl font-bold text-violet-600 mb-2">{stat.title}</div>
                                <p className="text-gray-600">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </Layout>
    );
};

export default Servicos;
