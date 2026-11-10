import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const About = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Sobre', path: '/sobre' }
    ];

    const values = [
        {
            icon: 'fa-heart',
            title: 'Paixão',
            description: 'Somos apaixonados por ajudar casais a realizarem o casamento dos sonhos'
        },
        {
            icon: 'fa-lightbulb',
            title: 'Inovação',
            description: 'Utilizamos tecnologia de ponta para simplificar o planejamento'
        },
        {
            icon: 'fa-handshake',
            title: 'Compromisso',
            description: 'Comprometidos com a excelência e satisfação dos nossos usuários'
        },
        {
            icon: 'fa-shield-halved',
            title: 'Segurança',
            description: 'Seus dados são protegidos com os mais altos padrões de segurança'
        }
    ];

    const stats = [
        { number: '10.000+', label: 'Casais Atendidos' },
        { number: '4.9/5', label: 'Avaliação Média' },
        { number: '50+', label: 'Categorias de Custos' },
        { number: '100%', label: 'Gratuito' }
    ];

    const team = [
        {
            role: 'Desenvolvedor',
            name: '3w Online',
            description: 'Especialistas em soluções web personalizadas'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Sobre o Planejador de Casamento
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                            Transformando sonhos em realidade através da tecnologia e planejamento inteligente
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full">
                                <span className="text-purple-700 font-semibold">Nossa Missão</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800">
                                Simplificar o Planejamento do Seu Casamento
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Sabemos que organizar um casamento pode ser estressante e complexo. Nossa missão é
                                tornar esse processo simples, organizado e até mesmo divertido, permitindo que você
                                foque no que realmente importa: celebrar o amor.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Com ferramentas intuitivas e cálculos precisos, ajudamos você a ter controle total
                                sobre orçamentos, fornecedores e todos os detalhes do seu grande dia.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-30"></div>
                            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-100">
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                {stat.number}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Nossos Valores
                        </h2>
                        <p className="text-xl text-gray-600">
                            Os princípios que guiam nosso trabalho
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <i className={`fas ${value.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-purple-100">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossa História</h2>
                        </div>
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p>
                                O <strong>Planejador de Casamento</strong> nasceu da necessidade real de casais que
                                enfrentavam dificuldades para organizar e controlar os custos de seus casamentos.
                            </p>
                            <p>
                                Após anos de experiência no desenvolvimento de soluções web, a equipe da
                                <strong> 3w Online</strong> decidiu criar uma ferramenta que pudesse ajudar milhares
                                de casais a planejarem o dia mais importante de suas vidas de forma organizada e sem estresse.
                            </p>
                            <p>
                                Hoje, somos orgulhosos de servir mais de <strong>10.000 casais</strong> que confiaram
                                em nossa plataforma para transformar seus sonhos em realidade. E continuamos evoluindo,
                                sempre com foco na experiência do usuário e na inovação tecnológica.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Desenvolvido Por
                        </h2>
                        <p className="text-xl text-gray-600">
                            Especialistas dedicados ao seu sucesso
                        </p>
                    </div>

                    <div className="max-w-md mx-auto">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl border border-purple-100 text-center"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-code text-white text-4xl"></i>
                                </div>
                                <div className="text-sm text-purple-600 font-semibold mb-2">{member.role}</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{member.name}</h3>
                                <p className="text-gray-600">{member.description}</p>
                                <div className="mt-6">
                                    <a
                                        href="https://www.3wonline.com.br"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Conheça Nossos Serviços
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Comece a Planejar Hoje!
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Junte-se a milhares de casais satisfeitos e organize o casamento perfeito
                        </p>
                        <a
                            href="/planejador_casamento/ferramentas"
                            className="inline-block px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
                        >
                            Começar Gratuitamente
                            <i className="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default About;
