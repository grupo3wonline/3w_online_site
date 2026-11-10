import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicosPage: React.FC = () => {
    const services = [
        {
            icon: 'fa-globe',
            title: 'Websites Profissionais',
            description: 'Sites institucionais, portfólios e landing pages com design moderno e responsivo.',
            features: ['Design Responsivo', 'SEO Otimizado', 'Alta Performance', 'Suporte Técnico']
        },
        {
            icon: 'fa-laptop-code',
            title: 'Sistemas Web',
            description: 'Aplicações web personalizadas para automatizar e gerenciar seu negócio.',
            features: ['Sob Demanda', 'Escalável', 'Seguro', 'Intuitivo']
        },
        {
            icon: 'fa-store',
            title: 'E-commerce',
            description: 'Lojas virtuais completas com gestão de produtos, pagamentos e entregas.',
            features: ['Múltiplos Pagamentos', 'Gestão de Estoque', 'Relatórios', 'Mobile First']
        },
        {
            icon: 'fa-mobile-screen',
            title: 'Aplicativos',
            description: 'Apps para iOS e Android que conectam você aos seus clientes.',
            features: ['Multiplataforma', 'Push Notifications', 'Offline First', 'UX Otimizado']
        },
        {
            icon: 'fa-chart-line',
            title: 'Marketing Digital',
            description: 'Estratégias de marketing para aumentar sua presença online e vendas.',
            features: ['Google Ads', 'Redes Sociais', 'Email Marketing', 'Analytics']
        },
        {
            icon: 'fa-headset',
            title: 'Suporte & Manutenção',
            description: 'Acompanhamento contínuo para manter seu projeto sempre atualizado.',
            features: ['Monitoramento 24/7', 'Backups', 'Atualizações', 'Prioridade']
        }
    ];

    const benefits = [
        {
            icon: 'fa-rocket',
            title: 'Desenvolvimento Ágil',
            description: 'Metodologias modernas para entregas rápidas e de qualidade.'
        },
        {
            icon: 'fa-shield-halved',
            title: 'Segurança',
            description: 'Proteção de dados e boas práticas de desenvolvimento seguro.'
        },
        {
            icon: 'fa-headset',
            title: 'Suporte Dedicado',
            description: 'Equipe especializada pronta para ajudar quando você precisar.'
        },
        {
            icon: 'fa-chart-simple',
            title: 'Resultados',
            description: 'Foco em métricas e resultados que impactam seu negócio.'
        }
    ];

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
                            <i className="fas fa-briefcase"></i>
                            Nossos Serviços
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Soluções Digitais{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Sob Demanda
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            O Grupo 3W Online desenvolve sites e sistemas personalizados para transformar
                            seu negócio e impulsionar seus resultados.
                        </p>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
                                <i className="fas fa-rocket mr-2"></i>
                                Solicitar Orçamento
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-cogs"></i>
                            O Que Fazemos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Serviços{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Especializados
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Oferecemos uma gama completa de serviços digitais para atender às necessidades do seu negócio
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                    <i className={`fas ${service.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {service.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-full text-xs font-medium"
                                        >
                                            <i className="fas fa-check text-cyan-500 text-[10px]"></i>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Watermark Wizard Feature */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                                        <i className="fas fa-wand-magic-sparkles"></i>
                                        Ferramenta em Destaque
                                    </span>
                                    <h2 className="text-3xl font-bold mb-4">
                                        Watermark Wizard
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Uma das nossas ferramentas gratuitas desenvolvidas para ajudar profissionais
                                        e criadores de conteúdo. Adicione marcas d'água profissionais em suas imagens
                                        de forma rápida e segura.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-3">
                                            <i className="fas fa-check-circle text-cyan-500"></i>
                                            <span>100% gratuito e sem limites</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <i className="fas fa-check-circle text-cyan-500"></i>
                                            <span>Processamento local e seguro</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <i className="fas fa-check-circle text-cyan-500"></i>
                                            <span>Interface moderna e intuitiva</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <i className="fas fa-check-circle text-cyan-500"></i>
                                            <span>Suporte a texto e logo</span>
                                        </li>
                                    </ul>
                                    <Link to="/ferramenta">
                                        <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
                                            <i className="fas fa-external-link-alt mr-2"></i>
                                            Usar Agora
                                        </Button>
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl blur-2xl opacity-20"></div>
                                    <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                    <i className="fas fa-image text-white text-2xl"></i>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Preview da Ferramenta</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1 h-8 bg-muted rounded"></div>
                                            <div className="w-20 h-8 bg-cyan-500 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-star"></i>
                            Por Que Nos Escolher
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Nossos{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Diferenciais
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Trabalhamos com dedicação para entregar resultados que superam expectativas
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <i className={`fas ${benefit.icon} text-white text-3xl`}></i>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-muted-foreground text-sm">{benefit.description}</p>
                            </div>
                        ))}
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
                            Vamos Transformar Seu Negócio?
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            Entre em contato e descubra como podemos ajudar a alavancar sua presença digital.
                            Solicite um orçamento sem compromisso!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="bg-white text-cyan-600 hover:bg-white/90 text-lg px-10 py-6 h-auto shadow-xl transition-all duration-300">
                                    <i className="fas fa-rocket mr-2"></i>
                                    Solicitar Orçamento
                                </Button>
                            </a>
                            <Link to="/contato">
                                <Button size="lg" variant="outline" className="border-white text-gray-600 hover:bg-white/10 text-lg px-10 py-6 h-auto">
                                    <i className="fas fa-envelope mr-2"></i>
                                    Fale Conosco
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicosPage;
