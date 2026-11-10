import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Zap, Shield, Users, Star, Monitor, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '@/components/shared/CTA';

const HomePage = () => {
    return (
        <Layout>
            <div className="overflow-hidden">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-32">
                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto text-center space-y-8 animate-fade-in-up">
                        <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30 bg-primary/5 rounded-full mb-4 hover:bg-primary/10 transition-colors cursor-default">
                            <Star className="w-4 h-4 mr-2 fill-primary" />
                            Ferramenta 100% Gratuita e Profissional
                        </Badge>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                            Domine as Cores do <br />
                            <span className="gradient-text">Seu Projeto Digital</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Conversão instantânea, precisa e segura entre RGB, HEX, HSL e mais.
                            A ferramenta essencial para designers e desenvolvedores que valorizam produtividade.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Button asChild size="lg" className="btn-primary text-lg px-10 py-7 shadow-xl shadow-primary/20 hover:shadow-primary/40 group">
                                <Link to="/ferramenta">
                                    Começar Agora
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 glass-card hover:bg-white/5">
                                <Link to="/sobre">Conhecer a 3W Online</Link>
                            </Button>
                        </div>

                        <div className="pt-12 flex justify-center items-center gap-8 text-muted-foreground text-sm opacity-80">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Sem cadastro</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <span>Dados Seguros</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>Ultra Rápido</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section - Prova Social e Autoridade */}
                <section className="py-24 px-4 bg-secondary/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que usar nossa ferramenta?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Desenvolvida por especialistas para resolver problemas reais do dia a dia de desenvolvimento.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="w-12 h-12 text-yellow-500" />,
                                    title: "Produtividade Máxima",
                                    description: "Pare de perder tempo procurando tabelas. Converta instantaneamente com um clique."
                                },
                                {
                                    icon: <Monitor className="w-12 h-12 text-blue-500" />,
                                    title: "Compatibilidade Total",
                                    description: "Suporte nativo para todos os formatos modernos de web design e impressão."
                                },
                                {
                                    icon: <Fingerprint className="w-12 h-12 text-purple-500" />,
                                    title: "Precisão Garantida",
                                    description: "Algoritmos matemáticos precisos garantem que a cor que você vê é a cor que você usa."
                                }
                            ].map((item, index) => (
                                <Card key={index} className="glass-card p-6 md:p-8 hover-lift border-t-4 border-t-transparent hover:border-t-primary transition-all">
                                    <div className="mb-6 p-4 bg-secondary/50 rounded-2xl w-fit">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Preview */}
                <section className="py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge className="mb-4">Funcionalidades</Badge>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                    Tudo o que você precisa em um só lugar
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        "Conversão em Tempo Real",
                                        "Visualizador de Cores Preciso",
                                        "Cópia com Um Clique (Copy-Paste)",
                                        "Histórico de Cores (Local)",
                                        "Interface Dark/Light Mode",
                                        "Responsivo para Mobile"
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-4 text-lg text-muted-foreground group">
                                            <div className="bg-green-500/10 p-2 rounded-full group-hover:bg-green-500/20 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            </div>
                                            <span className="group-hover:text-foreground transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10">
                                    <Button asChild size="lg" className="btn-primary">
                                        <Link to="/ferramenta">Testar Funcionalidades</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Abstract representation of the tool interface */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 blur-3xl rounded-full" />
                                <Card className="glass-card-strong relative overflow-hidden border-2 border-primary/20 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://placehold.co/800x600/1e1e2e/FFFFFF/png?text=Interface+do+Conversor+de+Cores"
                                        alt="Interface Preview"
                                        className="rounded-xl shadow-2xl w-full"
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof / Stats */}
                <section className="py-20 px-4 bg-primary/5">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-12">Confiado por profissionais em todo o Brasil</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "10k+", label: "Acessos Mensais" },
                                { number: "50k+", label: "Cores Convertidas" },
                                { number: "99%", label: "Uptime Garantido" },
                                { number: "4.9/5", label: "Avaliação Usuários" },
                            ].map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="text-4xl md:text-5xl font-bold text-primary">{stat.number}</div>
                                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 px-4 bg-background">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
                            <p className="text-muted-foreground">Tire suas dúvidas sobre o funcionamento da ferramenta</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { q: "A ferramenta é realmente gratuita?", a: "Sim! 100% gratuita para uso pessoal e comercial, sem limites de conversões." },
                                { q: "Preciso instalar algo?", a: "Não. O Conversor de Cores funciona totalmente no seu navegador, sem necessidade de downloads." },
                                { q: "Meus dados são salvos?", a: "Não. Todo o processamento é feito localmente no seu navegador. Não armazenamos as cores que você converte." },
                                { q: "Posso usar no celular?", a: "Com certeza! Nossa interface é totalmente responsiva e adaptada para dispositivos móveis (Mobile First)." },
                            ].map((faq, index) => (
                                <Card key={index} className="glass-card hover:bg-secondary/20 transition-colors">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
                                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">?</span>
                                            {faq.q}
                                        </h3>
                                        <p className="text-muted-foreground pl-11 leading-relaxed">{faq.a}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <CTA
                    title="Pronto para otimizar seu fluxo de trabalho?"
                    description="Comece a converter suas cores agora mesmo de forma profissional e gratuita."
                    buttonText="Acessar Conversor Agora"
                    buttonLink="/ferramenta"
                />
            </div>
        </Layout>
    );
};

export default HomePage;
