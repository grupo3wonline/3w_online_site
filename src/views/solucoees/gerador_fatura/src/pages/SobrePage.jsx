import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Users,
    Target,
    Award,
    CheckCircle,
    ArrowRight,
    Globe,
    Zap,
    Shield,
    Heart,
    ExternalLink
} from 'lucide-react';

const SobrePage = () => {
    const values = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Inovação",
            description: "Desenvolvemos soluções criativas e modernas para atender às necessidades do mercado digital."
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Segurança",
            description: "Priorizamos a proteção dos dados e a privacidade dos nossos usuários em todas as soluções."
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Compromisso",
            description: "Nosso compromisso é entregar qualidade e excelência em cada projeto desenvolvido."
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Colaboração",
            description: "Trabalhamos em parceria com nossos clientes para alcançar os melhores resultados."
        },
    ];

    const features = [
        "Geração de notas fiscais profissionais",
        "Criação de recibos em segundos",
        "10+ templates elegantes",
        "Download em PDF de alta qualidade",
        "Interface moderna e responsiva",
        "Processamento 100% local e seguro",
        "Suporte a múltiplas moedas",
        "100% gratuito sem limites",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-2">
                            <Building2 className="mr-2 h-4 w-4" />
                            Conheça Nossa História
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Sobre a Calculadora Aluguel Fácil
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            Uma ferramenta desenvolvida pelo Grupo 3W Online para simplificar a vida de
                            empreendedores brasileiros na gestão de documentos fiscais.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
                                <p className="text-lg text-muted-foreground mb-6">
                                    Democratizar o acesso a ferramentas profissionais de gestão financeira,
                                    permitindo que empreendedores de todos os portes possam criar documentos
                                    fiscais de qualidade sem custos.
                                </p>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Acreditamos que a tecnologia deve ser acessível a todos, por isso desenvolvemos
                                    esta ferramenta 100% gratuita, com interface intuitiva e recursos profissionais.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    <span className="font-medium">+ de 10.000 documentos gerados</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold mb-4">Funcionalidades</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Os princípios que guiam nosso trabalho e desenvolvimento de soluções
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4 rounded-xl w-fit mx-auto mb-4">
                                            {React.cloneElement(value.icon, { className: "h-6 w-6 text-primary" })}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Grupo 3W Online Section */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <Badge variant="outline" className="mb-4">
                                <Award className="mr-2 h-4 w-4" />
                                Empresa Desenvolvedora
                            </Badge>
                            <h2 className="text-3xl font-bold mb-4">Grupo 3W Online</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Desenvolvemos sites e sistemas personalizados sob demanda para empresas de todos os portes
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-0 shadow-soft">
                                <CardContent className="p-6 text-center">
                                    <Globe className="h-10 w-10 mx-auto mb-4 text-primary" />
                                    <h3 className="text-xl font-semibold mb-2">Sites Profissionais</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Criamos sites modernos, responsivos e otimizados para SEO
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-soft">
                                <CardContent className="p-6 text-center">
                                    <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
                                    <h3 className="text-xl font-semibold mb-2">Sistemas Web</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Desenvolvemos sistemas sob medida para automatizar seu negócio
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-soft">
                                <CardContent className="p-6 text-center">
                                    <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
                                    <h3 className="text-xl font-semibold mb-2">Suporte Dedicado</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Acompanhamento e suporte técnico para todas as soluções
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Precisa de uma Solução Personalizada?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                O Grupo 3W Online desenvolve sites e sistemas sob demanda para seu negócio
                            </p>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                                    Solicitar Orçamento
                                    <ExternalLink className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SobrePage;
