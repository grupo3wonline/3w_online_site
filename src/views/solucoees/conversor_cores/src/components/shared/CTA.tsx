import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

const CTA = ({
    title = "Pronto para otimizar seu fluxo de trabalho?",
    description = "Junte-se a milhares de profissionais que usam nossas ferramentas diariamente para aumentar a produtividade e precisão.",
    buttonText = "Acessar Ferramenta Grátis",
    buttonLink = "/ferramenta",
    secondaryButtonText = "Fale Conosco",
    secondaryButtonLink = "/contato"
}: CTAProps) => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                    {/* Background Gradient Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
                            {title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                asChild
                                size="lg"
                                className="btn-primary text-lg px-8 py-6 w-full sm:w-auto group-hover:scale-105 transition-transform"
                            >
                                <Link to={buttonLink}>
                                    {buttonText}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                            {secondaryButtonText && (
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto text-lg px-8 py-6 hover:bg-secondary/50"
                                >
                                    <a href={secondaryButtonLink.startsWith('http') ? secondaryButtonLink : undefined}>
                                        {secondaryButtonLink.startsWith('http') ? (
                                            <a href={secondaryButtonLink} target="_blank" rel="noopener noreferrer">{secondaryButtonText}</a>
                                        ) : (
                                            <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                                        )}
                                    </a>
                                </Button>
                            )}
                        </div>

                        <p className="mt-8 text-sm text-muted-foreground">
                            Desenvolvido por <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Grupo 3W Online</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
