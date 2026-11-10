import Layout from '@/components/Layout';
import CTASection from '@/components/CTASection';

const Sobre = () => {
    return (
        <Layout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Sobre o <span className="text-yellow-300">ColorCraft</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        A ferramenta gratuita que revoluciona a criação de paletas de cores
                    </p>
                </div>
            </section>

            {/* Missão */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl mb-6">
                                <i className="fas fa-bullseye text-4xl text-white"></i>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Nossa Missão</h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Democratizar o acesso a ferramentas profissionais de design, permitindo que designers,
                                desenvolvedores e criadores de conteúdo tenham acesso gratuito às melhores tecnologias
                                para criar paletas de cores harmônicas e profissionais.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-heart text-3xl text-violet-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Paixão</h3>
                                <p className="text-gray-600 text-sm">Por design e tecnologia</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-users text-3xl text-violet-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Comunidade</h3>
                                <p className="text-gray-600 text-sm">Mais de 10 mil usuários ativos</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-rocket text-3xl text-violet-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Inovação</h3>
                                <p className="text-gray-600 text-sm">Sempre evoluindo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funcionalidades */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Funcionalidades <span className="text-violet-600">Principais</span>
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-6">
                        {[
                            { icon: 'fa-palette', title: 'Gerador de Paletas Harmônicas', desc: 'Crie paletas baseadas em teoria das cores: complementares, análogas, tríades, tetrádicas e split-complementares' },
                            { icon: 'fa-sync-alt', title: 'Conversor de Cores', desc: 'Converta facilmente entre RGB, HEX, HSL, CMYK e outros formatos de cores' },
                            { icon: 'fa-sliders-h', title: 'Ajuste Fino', desc: 'Controle total sobre saturação, luminosidade e matiz de cada cor' },
                            { icon: 'fa-download', title: 'Exportação Múltipla', desc: 'Exporte suas paletas em diversos formatos: CSS, JSON, SVG, PNG e mais' },
                            { icon: 'fa-mobile-alt', title: 'Totalmente Responsivo', desc: 'Interface otimizada para desktop, tablet e smartphone' },
                            { icon: 'fa-lock', title: 'Privacidade Total', desc: 'Processamento local no navegador, seus dados nunca saem do seu dispositivo' },
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className={`fas ${feature.icon} text-xl text-white`}></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tecnologia */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            Tecnologia de <span className="text-violet-600">Ponta</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Desenvolvido com as melhores tecnologias do mercado
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: 'React 18', icon: 'fab fa-react', color: 'text-blue-500' },
                                { name: 'TypeScript', icon: 'fab fa-js-square', color: 'text-blue-600' },
                                { name: 'Vite', icon: 'fas fa-bolt', color: 'text-purple-500' },
                                { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'text-cyan-500' },
                            ].map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-violet-50 transition-colors">
                                    <i className={`${tech.icon} text-5xl ${tech.color} mb-3`}></i>
                                    <span className="font-semibold text-gray-900">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <CTASection
                title="Desenvolvido pela 3w Online"
                subtitle="Somos especialistas em desenvolvimento de sites e sistemas personalizados. Com mais de 500 projetos entregues, transformamos ideias em soluções digitais de sucesso."
                buttonText="Conhecer a 3w Online"
            />
        </Layout>
    );
};

export default Sobre;
