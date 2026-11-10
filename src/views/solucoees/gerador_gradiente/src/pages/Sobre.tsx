import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';
import CTA from '../components/CTA';

const Sobre = () => {
    const values = [
        {
            icon: 'fa-lightbulb',
            title: 'Inovação',
            description: 'Buscamos constantemente novas tecnologias e métodos para entregar as melhores soluções.',
        },
        {
            icon: 'fa-heart',
            title: 'Paixão',
            description: 'Amamos o que fazemos e isso se reflete na qualidade de cada projeto entregue.',
        },
        {
            icon: 'fa-users-cog',
            title: 'Colaboração',
            description: 'Trabalho em equipe e comunicação transparente são fundamentais para nosso sucesso.',
        },
        {
            icon: 'fa-award',
            title: 'Excelência',
            description: 'Comprometimento com a qualidade e superação de expectativas em cada entrega.',
        },
    ];

    const team = [
        {
            role: 'Desenvolvimento',
            description: 'Equipe especializada em React, Vue, Laravel e tecnologias modernas.',
            icon: 'fa-code',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            role: 'Design',
            description: 'Designers talentosos focados em UI/UX e experiência do usuário.',
            icon: 'fa-paint-brush',
            color: 'from-pink-500 to-purple-500',
        },
        {
            role: 'Suporte',
            description: 'Atendimento dedicado para garantir sua satisfação total.',
            icon: 'fa-headset',
            color: 'from-green-500 to-emerald-500',
        },
    ];

    return (
        <Layout>
            <SEO
                title="Sobre Nós - Gerador de Gradiente CSS | 3w Online"
                description="Conheça a 3w Online, empresa especializada em desenvolvimento web e criação de ferramentas profissionais para designers e desenvolvedores."
                keywords="sobre, 3w online, desenvolvimento web, ferramentas web, equipe"
                url="https://app.3wonline.com/gerador_gradiente/sobre"
            />

            <div className="container mx-auto px-4">
                <Breadcrumb items={[{ label: 'Sobre' }]} />

                {/* Hero Section */}
                <section className="py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Sobre o <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Gerador de Gradiente</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Desenvolvido pela 3w Online, este projeto nasceu da necessidade de ter uma ferramenta
                            simples, rápida e profissional para criar gradientes CSS.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Facilitar o trabalho de designers e desenvolvedores fornecendo ferramentas gratuitas,
                                profissionais e fáceis de usar. Acreditamos que tecnologia de qualidade deve ser
                                acessível a todos.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                O Gerador de Gradiente é apenas uma das nossas ferramentas desenvolvidas com carinho
                                e atenção aos detalhes, pensando sempre na melhor experiência do usuário.
                            </p>
                            <div className="flex items-center space-x-6 mt-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-600">Projetos Entregues</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        10+
                                    </div>
                                    <div className="text-sm text-gray-600">Anos de Experiência</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        100%
                                    </div>
                                    <div className="text-sm text-gray-600">Satisfação</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 rounded-lg bg-gradient-to-r from-purple-400 to-pink-600"></div>
                                    <div className="h-32 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-600"></div>
                                    <div className="h-32 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600"></div>
                                    <div className="h-32 rounded-lg bg-gradient-to-r from-orange-400 to-red-600"></div>
                                </div>
                                <div className="mt-6 text-center">
                                    <i className="fas fa-palette text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"></i>
                                    <p className="text-gray-700 font-medium mt-2">Gradientes Infinitos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Nossos <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Valores</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Princípios que guiam nosso trabalho e relacionamento com clientes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${value.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Nossa <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Equipe</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Profissionais apaixonados por tecnologia e design
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center mb-4`}>
                                    <i className={`fas ${member.icon} text-white text-3xl`}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{member.role}</h3>
                                <p className="text-gray-600 leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <CTA
                    title="Transforme Sua Ideia em Realidade!"
                    description="A 3w Online tem a experiência e o talento para criar o site ou sistema perfeito para seu negócio. Vamos conversar sobre seu projeto?"
                    buttonText="Solicitar Orçamento Gratuito"
                />
            </div>
        </Layout>
    );
};

export default Sobre;
