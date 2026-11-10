import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, ShoppingCart, BarChart, Server, Check, ArrowRight } from 'lucide-react';
import CTA from '@/components/shared/CTA';

const ServicosPage = () => {
    const services = [
        {
            icon: <Laptop className="w-10 h-10 text-blue-500" />,
            title: "Desenvolvimento Web",
            description: "Sites institucionais, landing pages de alta conversão e portais corporativos com as tecnologias mais modernas.",
            features: ["React / Next.js", "Design Responsivo", "SEO Otimizado", "Performance Máxima"]
        },
        {
            icon: <ShoppingCart className="w-10 h-10 text-purple-500" />,
            title: "E-commerce",
            description: "Lojas virtuais completas, seguras e prontas para vender. Integração com meios de pagamento e logística.",
            features: ["Gestão de Produtos", "Checkout Transparente", "Painel Administrativo", "Integrações Diversas"]
        },
        {
            icon: <BarChart className="w-10 h-10 text-green-500" />,
            title: "Sistemas Personalizados",
            description: "Soluções de software sob medida para automatizar processos e resolver os desafios específicos do seu negócio.",
            features: ["Arquitetura Escalável", "Dashboards", "Automação", "API RESTful"]
        },
        {
            icon: <Server className="w-10 h-10 text-orange-500" />,
            title: "Consultoria Tech",
            description: "Análise técnica, arquitetura de sistemas e modernização de legado para empresas que buscam evolução.",
            features: ["Cloud Computing", "DevOps", "Segurança", "Code Review"]
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen py-12 px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        Nossos Serviços
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Soluções digitais completas desenvolvidas pelo Grupo 3W Online para impulsionar o seu negócio.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, index) => (
                        <Card key={index} className="glass-card hover-lift flex flex-col h-full overflow-hidden group border-t-4 border-t-transparent hover:border-t-primary transition-all duration-300">
                            <CardHeader className="pb-4">
                                <div className="mb-4 p-3 bg-secondary/50 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-2xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <div className="bg-green-500/10 p-1 rounded-full">
                                                <Check className="w-3 h-3 text-green-500" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-6 border-t border-border/50">
                                <Button variant="ghost" className="w-full group" asChild>
                                    <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">
                                        Saiba Mais
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Process Section */}
                <section className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Como Trabalhamos</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Discovery", desc: "Entendemos profundamente sua necessidade e objetivos." },
                            { step: "02", title: "Planejamento", desc: "Desenhamos a melhor solução técnica e visual." },
                            { step: "03", title: "Desenvolvimento", desc: "Codificamos com as melhores práticas do mercado." },
                            { step: "04", title: "Entrega", desc: "Testes rigorosos, deploy e acompanhamento." }
                        ].map((item, index) => (
                            <div key={index} className="text-center relative">
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                                )}
                                <div className="w-16 h-16 rounded-full bg-card border-2 border-primary mx-auto flex items-center justify-center text-xl font-bold text-primary mb-4 shadow-lg shadow-primary/20">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground px-4">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <CTA
                    title="Pronto para começar?"
                    description="Entre em contato hoje e vamos tirar seu projeto do papel."
                    buttonText="Solicitar Orçamento Grátis"
                    buttonLink="https://www.3wonline.com.br/contato"
                    secondaryButtonText="Ver Projetos"
                    secondaryButtonLink="https://www.3wonline.com.br/portfolio"
                />
            </div>
        </Layout>
    );
};

export default ServicosPage;
