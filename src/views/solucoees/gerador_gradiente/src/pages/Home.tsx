import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import CTA from '../components/CTA';

const Home = () => {
    const features = [
        {
            icon: 'fa-bolt',
            title: 'Geração Instantânea',
            description: 'Crie gradientes CSS perfeitos em tempo real com visualização imediata.',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: 'fa-palette',
            title: 'Múltiplos Formatos',
            description: 'Suporte para gradientes lineares, radiais e cônicos com controle total.',
            color: 'from-pink-500 to-purple-500',
        },
        {
            icon: 'fa-code',
            title: 'Export CSS',
            description: 'Copie o código CSS pronto para usar em seus projetos instantaneamente.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Responsivo',
            description: 'Interface adaptada para todos os dispositivos - desktop, tablet e mobile.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: 'fa-shield-alt',
            title: '100% Gratuito',
            description: 'Ferramenta completamente gratuita, sem limites e sem necessidade de cadastro.',
            color: 'from-indigo-500 to-purple-500',
        },
        {
            icon: 'fa-lock',
            title: 'Processamento Local',
            description: 'Tudo processado no seu navegador. Seus dados nunca saem do seu computador.',
            color: 'from-red-500 to-pink-500',
        },
    ];

    const benefits = [
        {
            icon: 'fa-rocket',
            title: 'Aumente sua Produtividade',
            description: 'Economize horas de trabalho criando gradientes perfeitos em segundos.',
        },
        {
            icon: 'fa-paint-brush',
            title: 'Design Profissional',
            description: 'Crie gradientes de nível profissional sem precisar ser um expert em CSS.',
        },
        {
            icon: 'fa-users',
            title: 'Usado por Milhares',
            description: 'Mais de 10.000 designers e desenvolvedores já confiam em nossa ferramenta.',
        },
    ];

    const stats = [
        { number: '10.000+', label: 'Usuários Ativos', icon: 'fa-users' },
        { number: '50.000+', label: 'Gradientes Criados', icon: 'fa-palette' },
        { number: '100%', label: 'Gratuito', icon: 'fa-gift' },
        { number: '4.9/5', label: 'Avaliação', icon: 'fa-star' },
    ];

    return (
        <Layout>
            <SEO
                title="Gerador de Gradiente CSS Grátis - Crie Degradês Perfeitos | 3w Online"
                description="Crie gradientes CSS profissionais gratuitamente. Ferramenta online com visualização em tempo real, múltiplos formatos e exportação de código. Comece agora!"
                keywords="gerador gradiente, gradient generator, css gradiente, degradê css, criar gradiente, ferramenta css"
                url="https://app.3wonline.com/gerador_gradiente"
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-6">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                                <i className="fas fa-sparkles mr-2"></i>
                                Ferramenta #1 em Geração de Gradientes
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Crie <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Gradientes CSS</span> Perfeitos em Segundos
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Ferramenta profissional e gratuita para criar degradês incríveis.
                            Visualização em tempo real, múltiplos formatos e código CSS pronto para usar.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link
                                to="/ferramenta"
                                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <span>Começar Agora Grátis</span>
                                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                            </Link>

                            <Link
                                to="/sobre"
                                className="inline-flex items-center space-x-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300"
                            >
                                <i className="fas fa-play-circle"></i>
                                <span>Como Funciona</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <i className={`fas ${stat.icon} text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2`}></i>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Recursos Poderosos
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Tudo que você precisa para criar gradientes profissionais em um só lugar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>

                                <div className="relative">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Por Que Escolher Nossa Ferramenta?
                                </h2>

                                <div className="space-y-6">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                                <i className={`fas ${benefit.icon} text-white text-xl`}></i>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                                <p className="text-gray-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/ferramenta"
                                    className="inline-flex items-center space-x-2 mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    <span>Experimentar Gratuitamente</span>
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                                    <div className="space-y-4">
                                        <div className="h-32 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
                                        <div className="h-32 rounded-lg bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600"></div>
                                        <div className="h-32 rounded-lg bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
                                    </div>
                                    <p className="text-center mt-6 text-gray-600 font-medium">
                                        <i className="fas fa-magic mr-2 text-purple-600"></i>
                                        Exemplos de gradientes criados
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="container mx-auto">
                <CTA />
            </div>
        </Layout>
    );
};

export default Home;
