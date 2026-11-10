import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Receipt,
    Calculator,
    Wrench,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Download
} from 'lucide-react';

const FerramentasPage = () => {
    const tools = [
        {
            icon: <FileText className="h-10 w-10" />,
            title: "Gerador de Notas Fiscais",
            description: "Crie notas fiscais profissionais com múltiplos templates elegantes. Personalize com os dados da sua empresa e do cliente.",
            features: ["10+ Templates", "Múltiplas Moedas", "Cálculo Automático", "PDF de Alta Qualidade"],
            link: "/app",
            color: "from-blue-500 to-blue-600",
            popular: true,
        },
        {
            icon: <Receipt className="h-10 w-10" />,
            title: "Gerador de Recibos",
            description: "Gere recibos fiscais de forma rápida e prática. Ideal para vendas, serviços e comprovantes diversos.",
            features: ["4 Modelos", "Pré-visualização", "Dados Salvos", "Download Instantâneo"],
            link: "/receipt",
            color: "from-green-500 to-green-600",
            popular: false,
        },
        {
            icon: <Calculator className="h-10 w-10" />,
            title: "Calculadora de Impostos",
            description: "Calcule automaticamente os impostos sobre suas vendas e serviços. Suporte para diferentes alíquotas.",
            features: ["Cálculo Automático", "Múltiplas Taxas", "Integrado", "Resultado Instantâneo"],
            link: "/app",
            color: "from-purple-500 to-purple-600",
            popular: false,
        },
    ];

    const benefits = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Ultra Rápido",
            description: "Crie documentos em segundos com nossa interface intuitiva"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "100% Seguro",
            description: "Seus dados são processados localmente, nunca enviamos para servidores"
        },
        {
            icon: <Download className="h-6 w-6" />,
            title: "Download Grátis",
            description: "Baixe PDFs ilimitados sem nenhum custo"
        },
        {
            icon: <Star className="h-6 w-6" />,
            title: "Qualidade Profissional",
            description: "Templates desenhados por profissionais para impressionar"
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-2">
                            <Wrench className="mr-2 h-4 w-4" />
                            Ferramentas Profissionais
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Nossas Ferramentas
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            Ferramentas gratuitas e profissionais para simplificar a gestão financeira do seu negócio.
                            Crie documentos de qualidade em segundos!
                        </p>
                    </div>
                </section>

                {/* Tools Grid */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tools.map((tool, index) => (
                                <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-all duration-300 relative overflow-hidden group">
                                    {tool.popular && (
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-gradient-to-r from-primary to-purple-600">
                                                <Star className="h-3 w-3 mr-1 fill-current" />
                                                Popular
                                            </Badge>
                                        </div>
                                    )}
                                    <CardHeader className="pb-4">
                                        <div className={`bg-gradient-to-r ${tool.color} p-4 rounded-xl w-fit mb-4 text-white`}>
                                            {tool.icon}
                                        </div>
                                        <CardTitle className="text-2xl">{tool.title}</CardTitle>
                                        <CardDescription className="text-base">{tool.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-2">
                                            {tool.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <Link to={tool.link} className="block">
                                            <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group-hover:shadow-medium transition-all">
                                                Usar Ferramenta
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Por que Usar Nossas Ferramentas?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Desenvolvidas com foco em simplicidade, segurança e qualidade profissional
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="text-center p-6">
                                    <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4 rounded-xl w-fit mx-auto mb-4">
                                        {React.cloneElement(benefit.icon, { className: "h-6 w-6 text-primary" })}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Instructions Section */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Como Usar</h2>
                            <p className="text-lg text-muted-foreground">
                                Siga estes passos simples para criar seus documentos
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: "1", title: "Escolha a Ferramenta", desc: "Selecione entre notas fiscais ou recibos" },
                                { step: "2", title: "Preencha os Dados", desc: "Adicione as informações da empresa e cliente" },
                                { step: "3", title: "Escolha o Template", desc: "Selecione um dos nossos templates profissionais" },
                                { step: "4", title: "Baixe o PDF", desc: "Faça download do documento pronto para usar" },
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                                    </div>
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Comece a Criar Agora!
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                100% gratuito, sem cadastro e sem limites
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/app">
                                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6 w-full sm:w-auto">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Criar Nota Fiscal
                                    </Button>
                                </Link>
                                <Link to="/receipt">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto border-white text-gray-600 hover:bg-white/10">
                                        <Receipt className="mr-2 h-5 w-5" />
                                        Criar Recibo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FerramentasPage;
