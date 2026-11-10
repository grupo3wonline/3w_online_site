import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SobrePage: React.FC = () => {
    const features = [
        {
            icon: 'fa-wand-magic-sparkles',
            title: 'Editor Intuitivo',
            description: 'Interface fácil de usar com preview em tempo real para adicionar marcas d\'água profissionais.'
        },
        {
            icon: 'fa-font',
            title: 'Marca D\'Água de Texto',
            description: 'Adicione texto personalizado com controle total sobre cor, tamanho e posição.'
        },
        {
            icon: 'fa-image',
            title: 'Logo Personalizado',
            description: 'Use sua logo ou imagem como marca d\'água com opacidade ajustável.'
        },
        {
            icon: 'fa-layer-group',
            title: 'Processamento em Lote',
            description: 'Processe até 10 imagens de uma só vez e economize tempo.'
        },
        {
            icon: 'fa-arrows-to-dot',
            title: 'Posicionamento Flexível',
            description: '5 opções de posição para colocar sua marca d\'água exatamente onde você quer.'
        },
        {
            icon: 'fa-sliders',
            title: 'Controle Total',
            description: 'Ajuste opacidade, tamanho e cor para resultados perfeitos.'
        },
        {
            icon: 'fa-shield-halved',
            title: 'Processamento Local',
            description: 'Suas imagens são processadas no seu navegador, garantindo privacidade total.'
        },
        {
            icon: 'fa-money-bill-wave',
            title: '100% Gratuito',
            description: 'Sem custos, sem limites, sem cadastro. Use quanto quiser, sempre grátis.'
        }
    ];

    const team = {
        company: 'Grupo 3W Online',
        description: 'Somos uma empresa especializada em desenvolvimento de sites e sistemas personalizados sob demanda. Com foco em inovação e qualidade, entregamos soluções digitais que transformam negócios.',
        values: [
            { icon: 'fa-lightbulb', label: 'Inovação' },
            { icon: 'fa-heart', label: 'Qualidade' },
            { icon: 'fa-handshake', label: 'Compromisso' },
            { icon: 'fa-rocket', label: 'Resultados' }
        ]
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-background via-background to-cyan-500/5 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-6">
                            <i className="fas fa-circle-info"></i>
                            Sobre o Projeto
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Conheça o{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Watermark Wizard
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Uma ferramenta profissional, gratuita e fácil de usar para proteger suas imagens
                            com marcas d'água personalizadas. Desenvolvido com as mais modernas tecnologias web.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/ferramenta">
                                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-600">
                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                    Experimentar Agora
                                </Button>
                            </Link>
                            <Link to="/contato">
                                <Button size="lg" variant="outline">
                                    <i className="fas fa-envelope mr-2"></i>
                                    Fale Conosco
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                                <i className="fas fa-bullseye"></i>
                                Nossa Missão
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Democratizar a Proteção de Imagens
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Acreditamos que todos, desde fotógrafos profissionais até criadores de conteúdo,
                                merecem acesso a ferramentas de qualidade para proteger seu trabalho. Por isso,
                                criamos o Watermark Wizard — uma solução gratuita, poderosa e acessível.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Sem Custos Ocultos</h4>
                                        <p className="text-muted-foreground text-sm">100% gratuito, sem assinaturas ou pagamentos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Privacidade Garantida</h4>
                                        <p className="text-muted-foreground text-sm">Processamento local — suas imagens não são enviadas para servidores.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Sem Cadastro</h4>
                                        <p className="text-muted-foreground text-sm">Use imediatamente, sem criar conta ou fornecer dados.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl blur-3xl opacity-20 scale-95"></div>
                            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-6 bg-muted/50 rounded-2xl">
                                        <div className="text-4xl font-bold text-cyan-500 mb-2">100%</div>
                                        <div className="text-sm text-muted-foreground">Gratuito</div>
                                    </div>
                                    <div className="text-center p-6 bg-muted/50 rounded-2xl">
                                        <div className="text-4xl font-bold text-cyan-500 mb-2">10+</div>
                                        <div className="text-sm text-muted-foreground">Formatos</div>
                                    </div>
                                    <div className="text-center p-6 bg-muted/50 rounded-2xl">
                                        <div className="text-4xl font-bold text-cyan-500 mb-2">∞</div>
                                        <div className="text-sm text-muted-foreground">Sem Limites</div>
                                    </div>
                                    <div className="text-center p-6 bg-muted/50 rounded-2xl">
                                        <div className="text-4xl font-bold text-cyan-500 mb-2">4.9★</div>
                                        <div className="text-sm text-muted-foreground">Avaliação</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-sparkles"></i>
                            Funcionalidades
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Recursos{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Poderosos
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Tudo o que você precisa para proteger suas imagens com marcas d'água profissionais
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${feature.icon} text-cyan-500 text-xl`}></i>
                                </div>
                                <h3 className="font-semibold mb-2 group-hover:text-cyan-500 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Company Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                                <i className="fas fa-building"></i>
                                Quem Somos
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Desenvolvido pelo{' '}
                                <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                    {team.company}
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {team.description}
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {team.values.map((value, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                            <i className={`fas ${value.icon} text-white text-2xl`}></i>
                                        </div>
                                        <span className="font-medium">{value.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center pt-6 border-t border-border">
                                <p className="text-muted-foreground mb-6">
                                    Precisa de um site ou sistema personalizado? O Grupo 3W Online desenvolve
                                    soluções digitais sob demanda para transformar seu negócio.
                                </p>
                                <a
                                    href="https://www.3wonline.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                                >
                                    <i className="fas fa-rocket"></i>
                                    Conheça Nossos Serviços
                                    <i className="fas fa-arrow-right text-xs"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-cyan-500 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Pronto Para Começar?
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            Experimente agora mesmo o Watermark Wizard e proteja suas imagens de forma profissional.
                        </p>
                        <Link to="/ferramenta">
                            <Button size="lg" className="bg-white text-cyan-600 hover:bg-white/90 text-lg px-10 py-6 h-auto shadow-xl transition-all duration-300">
                                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                Acessar Ferramenta Gratuita
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SobrePage;
