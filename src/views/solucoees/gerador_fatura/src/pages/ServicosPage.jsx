import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Globe,
    Code,
    Smartphone,
    ShoppingCart,
    BarChart3,
    Headphones,
    CheckCircle,
    ArrowRight,
    ExternalLink,
    Sparkles
} from 'lucide-react';

const ServicosPage = () => {
    const services = [
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Sites Profissionais",
            description: "Criamos sites modernos, responsivos e otimizados para SEO que convertem visitantes em clientes.",
            features: ["Design Responsivo", "Otimização SEO", "Velocidade de Carregamento", "SSL Gratuito"],
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: "Sistemas Web",
            description: "Desenvolvemos sistemas personalizados para automatizar processos e aumentar a produtividade.",
            features: ["Desenvolvimento Sob Demanda", "Integração com APIs", "Painel Administrativo", "Relatórios Avançados"],
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: <Smartphone className="h-8 w-8" />,
            title: "Aplicativos Mobile",
            description: "Transformamos sua ideia em aplicativo para iOS e Android com experiência nativa.",
            features: ["Apps Nativos", "Design Intuitivo", "Publicação nas Lojas", "Manutenção Contínua"],
            color: "from-green-500 to-green-600",
        },
        {
            icon: <ShoppingCart className="h-8 w-8" />,
            title: "E-commerce",
            description: "Lojas virtuais completas com gestão de produtos, pagamentos e entregas integrados.",
            features: ["Catálogo de Produtos", "Pagamentos Online", "Gestão de Estoque", "Relatórios de Vendas"],
            color: "from-orange-500 to-orange-600",
        },
        {
            icon: <BarChart3 className="h-8 w-8" />,
            title: "Marketing Digital",
            description: "Estratégias de marketing para aumentar sua visibilidade e atrair mais clientes.",
            features: ["Google Ads", "Social Media", "Email Marketing", "Análise de Dados"],
            color: "from-pink-500 to-pink-600",
        },
        {
            icon: <Headphones className="h-8 w-8" />,
            title: "Suporte e Manutenção",
            description: "Acompanhamento técnico contínuo para garantir o melhor funcionamento das soluções.",
            features: ["Suporte 24/7", "Atualizações", "Backup Diário", "Monitoramento"],
            color: "from-cyan-500 to-cyan-600",
        },
    ];

    const benefits = [
        "Equipe especializada com anos de experiência",
        "Soluções personalizadas para cada negócio",
        "Tecnologias modernas e escaláveis",
        "Suporte técnico dedicado",
        "Prazos de entrega respeitados",
        "Preços competitivos no mercado",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-2">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Soluções Digitais
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Nossos Serviços
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            O Grupo 3W Online oferece soluções completas em desenvolvimento web e marketing digital
                            para impulsionar seu negócio no ambiente online.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
                                    <CardHeader>
                                        <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-fit mb-4 text-white`}>
                                            {service.icon}
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Por que Escolher o Grupo 3W Online?</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Somos uma empresa especializada em desenvolvimento de soluções digitais,
                                    com foco em resultados e satisfação do cliente.
                                </p>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                            <span className="text-lg">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-8 rounded-2xl">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-primary mb-2">100+</div>
                                    <p className="text-muted-foreground mb-6">Projetos Entregues</p>
                                    <div className="text-6xl font-bold text-primary mb-2">98%</div>
                                    <p className="text-muted-foreground mb-6">Clientes Satisfeitos</p>
                                    <div className="text-6xl font-bold text-primary mb-2">5+</div>
                                    <p className="text-muted-foreground">Anos de Experiência</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Pronto para Transformar seu Negócio?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Entre em contato e descubra como podemos ajudar sua empresa a crescer no mundo digital
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://www.3wonline.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6 w-full sm:w-auto">
                                        Solicitar Orçamento
                                        <ExternalLink className="ml-2 h-5 w-5" />
                                    </Button>
                                </a>
                                <Link to="/contato">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto border-white text-gray-600 hover:bg-white/10">
                                        Fale Conosco
                                        <ArrowRight className="ml-2 h-5 w-5" />
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

export default ServicosPage;
