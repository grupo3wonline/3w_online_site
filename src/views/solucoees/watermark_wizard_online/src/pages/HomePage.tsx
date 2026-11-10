import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const HomePage: React.FC = () => {
    const features = [
        {
            icon: 'fa-bolt',
            title: 'Super Rápido',
            description: 'Processe suas imagens em segundos. Interface intuitiva e resultados instantâneos.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: 'fa-palette',
            title: 'Totalmente Personalizável',
            description: 'Controle completo sobre posição, opacidade, cores e tamanho da marca d\'água.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: 'fa-shield-halved',
            title: '100% Seguro',
            description: 'Suas imagens são processadas localmente. Nenhum upload para servidores externos.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: 'fa-layer-group',
            title: 'Processamento em Lote',
            description: 'Adicione marca d\'água em até 10 imagens de uma só vez. Economize tempo.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: 'fa-image',
            title: 'Texto ou Logo',
            description: 'Use texto personalizado ou faça upload do seu logo como marca d\'água.',
            color: 'from-indigo-500 to-violet-500'
        },
        {
            icon: 'fa-money-bill-wave',
            title: '100% Gratuito',
            description: 'Sem custos ocultos, sem cadastro, sem limites de uso. Totalmente grátis.',
            color: 'from-cyan-500 to-teal-500'
        }
    ];

    const steps = [
        {
            number: '01',
            title: 'Faça Upload',
            description: 'Selecione até 10 imagens do seu computador nos formatos PNG, JPG, JPEG ou WEBP.',
            icon: 'fa-cloud-arrow-up'
        },
        {
            number: '02',
            title: 'Configure',
            description: 'Escolha entre texto ou logo, ajuste posição, opacidade e cor da marca d\'água.',
            icon: 'fa-sliders'
        },
        {
            number: '03',
            title: 'Baixe',
            description: 'Visualize o resultado em tempo real e baixe suas imagens com marca d\'água.',
            icon: 'fa-download'
        }
    ];

    const testimonials = [
        {
            name: 'Maria Silva',
            role: 'Fotógrafa Profissional',
            text: 'Economizo horas de trabalho! A ferramenta é simplesmente incrível e muito fácil de usar.',
            avatar: 'MS',
            rating: 5
        },
        {
            name: 'João Santos',
            role: 'Designer Gráfico',
            text: 'Finalmente uma ferramenta gratuita que funciona perfeitamente. Recomendo a todos!',
            avatar: 'JS',
            rating: 5
        },
        {
            name: 'Ana Costa',
            role: 'Criadora de Conteúdo',
            text: 'Protejo todas as minhas imagens com essa ferramenta. Interface intuitiva e moderna.',
            avatar: 'AC',
            rating: 5
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background to-cyan-500/5 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500">
                                <i className="fas fa-star animate-pulse"></i>
                                <span>Ferramenta #1 em Marca D'Água Online</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                Adicione{' '}
                                <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                    Marca D'Água
                                </span>{' '}
                                Profissional em Suas Imagens
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl text-muted-foreground max-w-xl">
                                Ferramenta gratuita e fácil de usar para proteger suas imagens com marcas d'água
                                personalizadas. Sem instalação, sem complicação, 100% online.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/ferramenta">
                                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 group">
                                        <i className="fas fa-wand-magic-sparkles mr-2 group-hover:rotate-12 transition-transform"></i>
                                        Começar Agora - É Grátis
                                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                    </Button>
                                </Link>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link to="/sobre">
                                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-border hover:bg-muted group">
                                                <i className="fas fa-play-circle mr-2"></i>
                                                Ver Como Funciona
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Veja um tutorial rápido de como usar a ferramenta</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-8 pt-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-500">100%</div>
                                    <div className="text-sm text-muted-foreground">Gratuito</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-500">10+</div>
                                    <div className="text-sm text-muted-foreground">Formatos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-500">∞</div>
                                    <div className="text-sm text-muted-foreground">Sem Limites</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-500">4.9★</div>
                                    <div className="text-sm text-muted-foreground">Avaliação</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image/Demo */}
                        <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl blur-3xl opacity-20 scale-95"></div>
                            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                                {/* Mock Editor Preview */}
                                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                                                <i className="fas fa-image text-white text-4xl"></i>
                                            </div>
                                            <p className="text-muted-foreground">Preview em Tempo Real</p>
                                        </div>
                                    </div>
                                    {/* Watermark Demo */}
                                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 opacity-60">
                                        © Sua Marca D'Água
                                    </div>
                                </div>
                                {/* Controls Preview */}
                                <div className="mt-6 flex gap-4">
                                    <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse"></div>
                                    <div className="w-24 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-sparkles"></i>
                            Recursos Poderosos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Por Que Escolher o{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Watermark Wizard?
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            A maneira mais simples e eficiente de proteger suas imagens com marcas d'água profissionais
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-card border border-border rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={`fas ${feature.icon} text-white text-xl`}></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-list-ol"></i>
                            Como Funciona
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Adicione Marca D'Água em{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                3 Passos Simples
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Não precisa de conhecimento técnico. É tão fácil quanto 1, 2, 3!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500 to-cyan-500/20"></div>

                        {steps.map((step, index) => (
                            <div key={index} className="relative text-center">
                                <div className="relative inline-flex mb-6">
                                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-3xl flex items-center justify-center border border-cyan-500/20 shadow-lg">
                                        <i className={`fas ${step.icon} text-cyan-500 text-4xl`}></i>
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <Link to="/ferramenta">
                            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-lg px-10 py-6 h-auto shadow-xl hover:shadow-cyan-500/25 transition-all duration-300">
                                <i className="fas fa-rocket mr-2"></i>
                                Experimentar Agora - Grátis
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-comments"></i>
                            Depoimentos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            O Que Nossos{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Usuários Dizem
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Milhares de profissionais confiam no Watermark Wizard para proteger suas imagens
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <i key={i} className="fas fa-star text-yellow-500"></i>
                                    ))}
                                </div>
                                {/* Quote */}
                                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-gradient-to-br from-cyan-500 to-cyan-600 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Pronto Para Proteger Suas Imagens?
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            Comece agora mesmo, é gratuito e não requer cadastro.
                            Sua primeira marca d'água está a um clique de distância.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/ferramenta">
                                <Button size="lg" className="bg-white text-cyan-600 hover:bg-white/90 text-lg px-10 py-6 h-auto shadow-xl transition-all duration-300">
                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                    Adicionar Marca D'Água Agora
                                </Button>
                            </Link>
                            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-gray-600 hover:bg-white/10 text-lg px-10 py-6 h-auto">
                                    <i className="fas fa-globe mr-2"></i>
                                    Conhecer Grupo 3W Online
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
