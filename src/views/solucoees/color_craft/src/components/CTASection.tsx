interface CTASectionProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonIcon?: string;
}

const CTASection = ({
    title = "Precisa de um Site ou Sistema Personalizado?",
    subtitle = "A 3w Online desenvolve sites e sistemas sob demanda com tecnologia de ponta. Transforme sua ideia em realidade com quem entende do assunto. Solicite um orçamento sem compromisso e descubra como podemos impulsionar seu negócio!",
    buttonText = "Solicitar Orçamento Grátis",
    buttonIcon = "fa-rocket"
}: CTASectionProps) => {
    return (
        <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group hover:scale-110 transition-transform duration-300">
                        <i className={`fas ${buttonIcon} text-4xl text-white group-hover:rotate-12 transition-transform`}></i>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                        {subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <i className={`fas ${buttonIcon} mr-3 group-hover:rotate-12 transition-transform`}></i>
                            {buttonText}
                            <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
                        </a>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="flex items-center justify-center space-x-3 text-white/90">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-check-circle text-xl"></i>
                            </div>
                            <span className="font-semibold">Desenvolvimento Ágil</span>
                        </div>

                        <div className="flex items-center justify-center space-x-3 text-white/90">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-shield-alt text-xl"></i>
                            </div>
                            <span className="font-semibold">Segurança Garantida</span>
                        </div>

                        <div className="flex items-center justify-center space-x-3 text-white/90">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-headset text-xl"></i>
                            </div>
                            <span className="font-semibold">Suporte 24/7</span>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-8 flex items-center justify-center space-x-2 text-white/80 text-sm">
                        <i className="fas fa-star text-yellow-300"></i>
                        <i className="fas fa-star text-yellow-300"></i>
                        <i className="fas fa-star text-yellow-300"></i>
                        <i className="fas fa-star text-yellow-300"></i>
                        <i className="fas fa-star text-yellow-300"></i>
                        <span className="ml-2 font-semibold">Mais de 500 clientes satisfeitos</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
