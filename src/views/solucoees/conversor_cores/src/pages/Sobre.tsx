import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Rocket, Users, Globe, Smartphone, ShieldCheck } from 'lucide-react';
import CTA from '@/components/shared/CTA';

const SobrePage = () => {
    const values = [
        {
            icon: <Rocket className="w-8 h-8 text-primary" />,
            title: "Inovação Constante",
            description: "Buscamos sempre as tecnologias mais recentes para oferecer soluções de ponta."
        },
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Foco no Usuário",
            description: "Desenvolvemos pensando na melhor experiência possível para quem usa nossas ferramentas."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: "Segurança e Privacidade",
            description: "Compromisso total com a proteção de dados e segurança das informações."
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative py-20 px-4 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-l-full pointer-events-none" />

                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                            Transformando Ideias em <br /> Soluções Digitais
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                            Somos o Grupo 3W Online, uma empresa apaixonada por tecnologia e inovação.
                            Desenvolvemos sistemas personalizados e ferramentas que facilitam a vida de profissionais e empresas.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 px-4 bg-secondary/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
                                <div className="space-y-6 text-muted-foreground leading-relaxed">
                                    <p>
                                        No Grupo 3W Online, acreditamos que a tecnologia deve ser acessível, intuitiva e poderosa.
                                        Nossa missão é criar ferramentas digitais que eliminem a complexidade e permitam que nossos
                                        usuários foquem no que realmente importa: criar e realizar.
                                    </p>
                                    <p>
                                        Com anos de experiência no mercado de desenvolvimento web, combinamos design de alta qualidade
                                        com engenharia de software robusta para entregar produtos excepcionais.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                <div className="relative grid grid-cols-2 gap-4">
                                    <Card className="glass-card hover-lift p-6">
                                        <Code className="w-10 h-10 text-primary mb-4" />
                                        <h3 className="font-bold mb-2">Clean Code</h3>
                                        <p className="text-sm text-muted-foreground">Código limpo e sustentável</p>
                                    </Card>
                                    <Card className="glass-card hover-lift p-6 mt-8">
                                        <Globe className="w-10 h-10 text-purple-500 mb-4" />
                                        <h3 className="font-bold mb-2">Global</h3>
                                        <p className="text-sm text-muted-foreground">Padrões internacionais</p>
                                    </Card>
                                    <Card className="glass-card hover-lift p-6">
                                        <Smartphone className="w-10 h-10 text-pink-500 mb-4" />
                                        <h3 className="font-bold mb-2">Mobile First</h3>
                                        <p className="text-sm text-muted-foreground">Adaptável a qualquer tela</p>
                                    </Card>
                                    <Card className="glass-card hover-lift p-6 mt-8">
                                        <Users className="w-10 h-10 text-blue-500 mb-4" />
                                        <h3 className="font-bold mb-2">Suporte</h3>
                                        <p className="text-sm text-muted-foreground">Atendimento humanizado</p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16">Nossos Valores</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((item, index) => (
                                <Card key={index} className="glass-card hover-lift text-center border-t-4 border-t-primary">
                                    <CardContent className="pt-8 pb-8">
                                        <div className="inline-flex items-center justify-center p-4 bg-secondary rounded-full mb-6">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <CTA
                    title="Tem um projeto em mente?"
                    description="Podemos desenvolver a solução perfeita para o seu negócio."
                    buttonText="Solicitar Orçamento"
                    buttonLink="https://www.3wonline.com.br"
                    secondaryButtonText="Ver Portfólio"
                    secondaryButtonLink="/servicos"
                />
            </div>
        </Layout>
    );
};

export default SobrePage;
