const CTA3wOnline = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400 rounded-full">
                            <span className="text-purple-300 font-semibold text-sm">
                                <i className="fas fa-code mr-2"></i>
                                Desenvolvimento Profissional
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Precisa de um Site ou Sistema Personalizado?
                        </h2>

                        <p className="text-xl text-gray-300 leading-relaxed">
                            A <strong className="text-purple-400">3w Online</strong> é especializada em criar
                            soluções web sob medida para seu negócio. Transformamos suas ideias em realidade
                            com tecnologia de ponta e design profissional.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: 'fa-globe', text: 'Sites Profissionais' },
                                { icon: 'fa-shopping-cart', text: 'E-commerce' },
                                { icon: 'fa-cogs', text: 'Sistemas Web' },
                                { icon: 'fa-mobile-alt', text: 'Apps Responsivos' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className={`fas ${item.icon} text-purple-400`}></i>
                                    </div>
                                    <span className="text-gray-300 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                            >
                                Conheça Nossos Serviços
                                <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                            </a>

                            <a
                                href="https://www.3wonline.com.br/contato"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-purple-400 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                            >
                                <i className="fas fa-comments"></i>
                                Solicitar Orçamento
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { number: '500+', label: 'Projetos Entregues', icon: 'fa-check-circle' },
                            { number: '98%', label: 'Clientes Satisfeitos', icon: 'fa-smile' },
                            { number: '10+', label: 'Anos de Experiência', icon: 'fa-calendar' },
                            { number: '24/7', label: 'Suporte Dedicado', icon: 'fa-headset' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                                    <i className={`fas ${stat.icon} text-purple-400 text-xl`}></i>
                                </div>
                                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-rocket text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    Desenvolvido por Grupo 3w Online
                                </h3>
                                <p className="text-gray-400">
                                    Especialistas em criar soluções digitais que geram resultados
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 whitespace-nowrap"
                        >
                            Visite Nosso Site
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA3wOnline;
