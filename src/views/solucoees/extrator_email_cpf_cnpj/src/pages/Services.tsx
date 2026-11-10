import Breadcrumb from '@/components/Breadcrumb';
import CTA from '@/components/CTA';

const Services = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Breadcrumb items={[{ label: 'Serviços' }]} />

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        <i className="fas fa-briefcase text-violet-600 mr-3"></i>
                        Nossos Serviços
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Soluções completas em tecnologia desenvolvidas pelo{' '}
                        <span className="font-bold text-violet-600">Grupo 3w Online</span>
                    </p>
                </div>

                {/* Serviços Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {[
                        {
                            icon: 'fa-globe',
                            color: 'from-blue-600 to-blue-800',
                            title: 'Desenvolvimento de Sites',
                            description: 'Sites institucionais, landing pages e portais corporativos responsivos e otimizados para SEO.',
                            features: [
                                'Design moderno e profissional',
                                'Responsivo (Mobile First)',
                                'Otimização para motores de busca',
                                'Integração com redes sociais',
                                'Painel administrativo'
                            ]
                        },
                        {
                            icon: 'fa-code',
                            color: 'from-purple-600 to-purple-800',
                            title: 'Sistemas Personalizados',
                            description: 'Desenvolvimento de sistemas web sob medida para atender as necessidades específicas do seu negócio.',
                            features: [
                                'Análise de requisitos detalhada',
                                'Arquitetura escalável',
                                'Interface intuitiva',
                                'Integração com APIs',
                                'Suporte e manutenção'
                            ]
                        },
                        {
                            icon: 'fa-mobile-alt',
                            color: 'from-green-600 to-green-800',
                            title: 'Aplicações Web',
                            description: 'Aplicações web modernas e performáticas com as melhores tecnologias do mercado.',
                            features: [
                                'React, Vue.js ou Angular',
                                'Progressive Web Apps (PWA)',
                                'Tempo real (WebSocket)',
                                'Offline-first',
                                'Alta performance'
                            ]
                        },
                        {
                            icon: 'fa-shopping-cart',
                            color: 'from-orange-600 to-orange-800',
                            title: 'E-commerce',
                            description: 'Lojas virtuais completas com integração de pagamento e gestão de produtos.',
                            features: [
                                'Carrinho de compras inteligente',
                                'Integração com gateways',
                                'Gestão de estoque',
                                'Relatórios e dashboards',
                                'Multi-plataforma'
                            ]
                        },
                        {
                            icon: 'fa-chart-line',
                            color: 'from-red-600 to-red-800',
                            title: 'Dashboards e BI',
                            description: 'Painéis de controle e business intelligence para tomada de decisões estratégicas.',
                            features: [
                                'Visualização de dados',
                                'Relatórios customizados',
                                'Indicadores de performance',
                                'Exportação de dados',
                                'Atualização em tempo real'
                            ]
                        },
                        {
                            icon: 'fa-tools',
                            color: 'from-indigo-600 to-indigo-800',
                            title: 'Manutenção e Suporte',
                            description: 'Suporte técnico contínuo para manter seus sistemas sempre atualizados e funcionando.',
                            features: [
                                'Correção de bugs',
                                'Atualizações de segurança',
                                'Melhorias de performance',
                                'Backup e recuperação',
                                'Consultoria técnica'
                            ]
                        }
                    ].map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
                        >
                            <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                                <i className={`fas ${service.icon} text-5xl mb-4 block`}></i>
                                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                                <p className="opacity-90 leading-relaxed">{service.description}</p>
                            </div>
                            <div className="p-8">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                    Principais Recursos:
                                </h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <i className="fas fa-chevron-right text-violet-600 mt-1"></i>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Processo de Trabalho */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-cogs text-violet-600 mr-3"></i>
                        Nosso Processo de Trabalho
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                step: '1',
                                icon: 'fa-comments',
                                title: 'Reunião Inicial',
                                description: 'Entendemos suas necessidades e objetivos'
                            },
                            {
                                step: '2',
                                icon: 'fa-pencil-ruler',
                                title: 'Planejamento',
                                description: 'Criamos a estratégia e arquitetura do projeto'
                            },
                            {
                                step: '3',
                                icon: 'fa-laptop-code',
                                title: 'Desenvolvimento',
                                description: 'Codificamos com as melhores práticas'
                            },
                            {
                                step: '4',
                                icon: 'fa-rocket',
                                title: 'Entrega',
                                description: 'Deploy e treinamento da equipe'
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
                                        <i className={`fas ${step.icon}`}></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold shadow-lg">
                                        {step.step}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diferenciais */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-star text-yellow-500 mr-3"></i>
                        Por Que Escolher o Grupo 3w Online?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'fa-award',
                                color: 'text-yellow-600',
                                title: 'Qualidade Garantida',
                                description: 'Código limpo, documentado e seguindo as melhores práticas do mercado'
                            },
                            {
                                icon: 'fa-clock',
                                color: 'text-blue-600',
                                title: 'Prazos Cumpridos',
                                description: 'Planejamento realista e entregas dentro do prazo estabelecido'
                            },
                            {
                                icon: 'fa-headset',
                                color: 'text-green-600',
                                title: 'Suporte Dedicado',
                                description: 'Atendimento personalizado durante e após o projeto'
                            },
                            {
                                icon: 'fa-shield-alt',
                                color: 'text-purple-600',
                                title: 'Segurança',
                                description: 'Implementação de boas práticas de segurança em todos os projetos'
                            },
                            {
                                icon: 'fa-chart-line',
                                color: 'text-orange-600',
                                title: 'Escalabilidade',
                                description: 'Arquitetura preparada para crescer junto com seu negócio'
                            },
                            {
                                icon: 'fa-dollar-sign',
                                color: 'text-indigo-600',
                                title: 'Custo-Benefício',
                                description: 'Soluções profissionais com excelente relação custo-benefício'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center">
                                <i className={`fas ${item.icon} ${item.color} text-5xl mb-4 block`}></i>
                                <h3 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <CTA variant="primary" />
            </div>
        </div>
    );
};

export default Services;
