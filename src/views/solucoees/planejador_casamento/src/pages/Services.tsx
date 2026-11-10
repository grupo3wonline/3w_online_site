import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const Services = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Serviços', path: '/servicos' }
    ];

    const services = [
        {
            icon: 'fa-calculator',
            title: 'Calculadora de Orçamento',
            description: 'Estime com precisão todos os custos do seu casamento baseado em dados reais do mercado',
            features: [
                'Cálculo automático por convidado',
                'Categorias detalhadas de custos',
                'Ajustes regionais de preços',
                'Comparativo de custos'
            ],
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: 'fa-clipboard-check',
            title: 'Lista de Tarefas',
            description: 'Organize todas as tarefas do planejamento com cronograma personalizado',
            features: [
                'Checklists por categoria',
                'Lembretes automáticos',
                'Priorização de tarefas',
                'Timeline visual'
            ],
            color: 'from-purple-500 to-indigo-500'
        },
        {
            icon: 'fa-users',
            title: 'Gerenciador de Convidados',
            description: 'Controle a lista de convidados, confirmações e organização de mesas',
            features: [
                'Lista de presença',
                'Controle de convites',
                'Organização de mesas',
                'Confirmações online'
            ],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: 'fa-briefcase',
            title: 'Gestão de Fornecedores',
            description: 'Centralize informações de todos os fornecedores contratados',
            features: [
                'Cadastro completo',
                'Controle de pagamentos',
                'Documentos anexados',
                'Avaliações e notas'
            ],
            color: 'from-teal-500 to-emerald-500'
        },
        {
            icon: 'fa-chart-pie',
            title: 'Relatórios Visuais',
            description: 'Visualize graficamente a distribuição de custos e status do planejamento',
            features: [
                'Gráficos interativos',
                'Exportação em PDF',
                'Comparativos mensais',
                'Análise de tendências'
            ],
            color: 'from-amber-500 to-orange-500'
        },
        {
            icon: 'fa-mobile-screen',
            title: 'Acesso Mobile',
            description: 'Gerencie seu casamento de qualquer lugar, a qualquer momento',
            features: [
                'Design responsivo',
                'Sincronização em tempo real',
                'Modo offline',
                'Notificações push'
            ],
            color: 'from-red-500 to-pink-500'
        }
    ];

    const processSteps = [
        {
            number: '01',
            title: 'Cadastro Gratuito',
            description: 'Crie sua conta em menos de 1 minuto, sem custo algum'
        },
        {
            number: '02',
            title: 'Configure Seu Evento',
            description: 'Insira as informações básicas do seu casamento'
        },
        {
            number: '03',
            title: 'Planeje e Organize',
            description: 'Use todas as ferramentas disponíveis para gerenciar cada detalhe'
        },
        {
            number: '04',
            title: 'Acompanhe o Progresso',
            description: 'Visualize relatórios e mantenha tudo sob controle'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-6">
                        <div className="inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-200 text-purple-700 text-sm font-semibold shadow-lg">
                                <i className="fas fa-sparkles"></i>
                                Ferramentas Profissionais e Gratuitas
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Nossos Serviços
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                            Tudo que você precisa para planejar o casamento perfeito, reunido em uma plataforma completa e intuitiva
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <i className={`fas ${service.icon} text-white text-2xl`}></i>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                <div className="space-y-2">
                                    <div className="text-sm font-semibold text-purple-700 mb-3">Recursos inclusos:</div>
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <i className="fas fa-check text-green-500 mt-1 flex-shrink-0"></i>
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Como Funciona
                        </h2>
                        <p className="text-xl text-gray-600">
                            Comece a usar em 4 passos simples
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                                )}
                                <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <span className="text-2xl font-bold text-white">{step.number}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
                        <div className="text-center text-white space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Por Que Escolher Nossa Plataforma?
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-lock text-white text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">100% Seguro</h3>
                                    <p className="text-white/80">Seus dados são criptografados e protegidos</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-infinity text-white text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Uso Ilimitado</h3>
                                    <p className="text-white/80">Sem restrições de funcionalidades ou tempo</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-headset text-white text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Suporte Dedicado</h3>
                                    <p className="text-white/80">Estamos aqui para ajudar sempre que precisar</p>
                                </div>
                            </div>

                            <div className="pt-8">
                                <a
                                    href="/planejador_casamento/ferramentas"
                                    className="inline-block px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    Comece Agora Gratuitamente
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Perguntas Frequentes
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: 'O serviço é realmente gratuito?',
                                answer: 'Sim! Todas as funcionalidades são 100% gratuitas e sem limites de uso.'
                            },
                            {
                                question: 'Preciso fazer download de algum aplicativo?',
                                answer: 'Não! Nossa plataforma funciona diretamente no navegador, em qualquer dispositivo.'
                            },
                            {
                                question: 'Meus dados estão seguros?',
                                answer: 'Absolutamente! Utilizamos criptografia de ponta e seus dados são processados localmente sempre que possível.'
                            },
                            {
                                question: 'Posso compartilhar o planejamento com meu parceiro(a)?',
                                answer: 'Sim! Você pode convidar outras pessoas para colaborarem no planejamento.'
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-3">
                                    <i className="fas fa-question-circle text-purple-500 mt-1"></i>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 ml-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default Services;
