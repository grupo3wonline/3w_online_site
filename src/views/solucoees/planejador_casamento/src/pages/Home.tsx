import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const Home = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' }
    ];

    const features = [
        {
            icon: 'fa-calculator',
            title: 'Orçamento Inteligente',
            description: 'Calcule automaticamente todos os custos do seu casamento com base no número de convidados'
        },
        {
            icon: 'fa-chart-line',
            title: 'Planejamento Visual',
            description: 'Visualize graficamente a distribuição de custos e tome decisões informadas'
        },
        {
            icon: 'fa-list-check',
            title: 'Lista Completa',
            description: 'Gerencie fornecedores, tarefas e prazos em um só lugar'
        },
        {
            icon: 'fa-heart',
            title: 'Personalização Total',
            description: 'Adapte o planejador às suas necessidades e estilo de casamento'
        },
        {
            icon: 'fa-mobile-screen',
            title: '100% Responsivo',
            description: 'Acesse de qualquer dispositivo - celular, tablet ou computador'
        },
        {
            icon: 'fa-shield-halved',
            title: 'Seguro e Privado',
            description: 'Seus dados são processados localmente, garantindo total privacidade'
        }
    ];

    const benefits = [
        {
            percentage: '80%',
            text: 'de redução no tempo de planejamento'
        },
        {
            percentage: '100%',
            text: 'gratuito e sem limites de uso'
        },
        {
            percentage: '3x',
            text: 'mais organização no seu casamento'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-blue-300/20 blur-3xl"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center space-y-8">
                        <div className="inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-200 text-purple-700 text-sm font-semibold shadow-lg">
                                <i className="fas fa-sparkles"></i>
                                Utilizado por mais de 10.000 casais
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                            Planeje o Casamento dos Seus Sonhos
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                            Organize orçamentos, fornecedores e todos os detalhes do seu grande dia com a ferramenta mais completa e intuitiva do mercado
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/ferramentas"
                                className="group px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                            >
                                Começar Agora Grátis
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </Link>

                            <Link
                                to="/sobre"
                                className="px-8 py-4 bg-white/60 backdrop-blur-sm border-2 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-white/80 transition-all duration-300"
                            >
                                Saiba Mais
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center gap-1 pt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <i key={i} className="fas fa-star text-yellow-400 text-2xl"></i>
                                ))}
                            </div>
                            <span className="ml-3 text-gray-600 font-semibold">
                                4.9/5 - Avaliação média dos usuários
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Stats */}
            <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {benefit.percentage}
                                </div>
                                <p className="text-gray-700 font-medium">{benefit.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Recursos que Fazem a Diferença
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Tudo que você precisa para organizar o casamento perfeito em uma única plataforma
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Como Funciona?
                        </h2>
                        <p className="text-xl text-gray-600">Simples, rápido e eficiente</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                step: '01',
                                title: 'Insira os Dados',
                                description: 'Informe o número de convidados, localização e preferências do seu casamento',
                                icon: 'fa-pen-to-square'
                            },
                            {
                                step: '02',
                                title: 'Receba o Orçamento',
                                description: 'Obtenha instantaneamente uma estimativa completa e detalhada de custos',
                                icon: 'fa-chart-pie'
                            },
                            {
                                step: '03',
                                title: 'Planeje e Organize',
                                description: 'Gerencie fornecedores, prazos e todos os detalhes do seu evento',
                                icon: 'fa-calendar-check'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <i className={`fas ${item.icon} text-white text-3xl`}></i>
                                </div>
                                <div className="absolute top-8 -right-8 text-8xl font-bold text-purple-200/30 -z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            O Que Nossos Usuários Dizem
                        </h2>
                        <p className="text-xl text-gray-600">Depoimentos reais de casais felizes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Ana e Carlos',
                                text: 'Economizamos mais de R$ 15.000 no orçamento graças ao planejamento detalhado!',
                                rating: 5
                            },
                            {
                                name: 'Julia e Pedro',
                                text: 'A ferramenta mais completa que encontramos. Organizou tudo perfeitamente!',
                                rating: 5
                            },
                            {
                                name: 'Mariana e Lucas',
                                text: 'Simples de usar e muito eficiente. Recomendo para todos os casais!',
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <i key={i} className="fas fa-star text-yellow-400"></i>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                                <p className="font-bold text-purple-700">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Pronto para Começar?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Junte-se a milhares de casais que já planejaram o casamento dos sonhos
                    </p>
                    <Link
                        to="/ferramentas"
                        className="inline-block px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
                    >
                        Comece Gratuitamente Agora
                        <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default Home;
