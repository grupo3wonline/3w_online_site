interface CTAProps {
    variant?: 'primary' | 'secondary';
    className?: string;
}

const CTA = ({ variant = 'primary', className = '' }: CTAProps) => {
    const isPrimary = variant === 'primary';

    return (
        <div className={`bg-gradient-to-r ${isPrimary ? 'from-violet-600 to-indigo-600' : 'from-gray-800 to-gray-900'} rounded-2xl p-8 md:p-12 text-white shadow-2xl ${className}`}>
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {isPrimary ? (
                        <>
                            <i className="fas fa-rocket mr-3"></i>
                            Precisa de um Sistema Personalizado?
                        </>
                    ) : (
                        <>
                            <i className="fas fa-code mr-3"></i>
                            Quer Desenvolver Sua Solução?
                        </>
                    )}
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                    {isPrimary ? (
                        <>
                            O <span className="font-semibold">Grupo 3w Online</span> desenvolve sites e sistemas{' '}
                            <span className="font-semibold text-yellow-300">sob demanda</span>, totalmente personalizados
                            para as necessidades do seu negócio.
                        </>
                    ) : (
                        <>
                            Transforme suas ideias em realidade com soluções tecnológicas{' '}
                            <span className="font-semibold text-yellow-300">inovadoras e eficientes</span>.
                        </>
                    )}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-white text-violet-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <i className="fas fa-external-link-alt mr-3"></i>
                        Conheça Nossos Serviços
                    </a>

                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-violet-600 transition-all transform hover:scale-105"
                    >
                        <i className="fas fa-phone mr-3"></i>
                        Entre em Contato
                    </a>
                </div>

                {/* Badges de Confiança */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
                    <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-400 mr-2"></i>
                        <span>Atendimento Personalizado</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
                        <span>Segurança Garantida</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-rocket text-yellow-400 mr-2"></i>
                        <span>Entrega Rápida</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
