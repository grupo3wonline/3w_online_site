interface CTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    variant?: 'primary' | 'secondary';
}

const CTA = ({
    title = 'Precisa de um Site ou Sistema Personalizado?',
    description = 'O Grupo 3w Online desenvolve sites e sistemas sob demanda, com tecnologia de ponta e design profissional. Transforme sua ideia em realidade!',
    buttonText = 'Criar Meu Projeto Agora',
    variant = 'primary',
}: CTAProps) => {
    const gradients = {
        primary: 'from-indigo-600 via-purple-600 to-pink-600',
        secondary: 'from-emerald-600 via-teal-600 to-cyan-600',
    };

    return (
        <section className="py-16 px-4">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradients[variant]} p-1`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-8 md:p-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                <i className="fas fa-rocket text-white text-4xl"></i>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {title}
                        </h2>

                        <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <div className="flex items-center space-x-2 text-white">
                                <i className="fas fa-check-circle text-green-300"></i>
                                <span>+500 Projetos Entregues</span>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                            <div className="flex items-center space-x-2 text-white">
                                <i className="fas fa-star text-yellow-300"></i>
                                <span>Avaliação 4.9/5.0</span>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                            <div className="flex items-center space-x-2 text-white">
                                <i className="fas fa-clock text-blue-300"></i>
                                <span>Suporte 24/7</span>
                            </div>
                        </div>

                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <span>{buttonText}</span>
                            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                        </a>

                        <p className="text-white/80 text-sm mt-6">
                            <i className="fas fa-shield-alt mr-2"></i>
                            Garantia de satisfação ou seu dinheiro de volta
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
