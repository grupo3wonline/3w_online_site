import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    MapPin,
    Globe,
    MessageCircle,
    Headphones,
    ExternalLink
} from 'lucide-react';

const ContatoPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-2">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Fale Conosco
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Entre em Contato
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            Estamos prontos para ajudar! Entre em contato pelo formulário abaixo ou
                            através dos nossos canais de atendimento.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-8 px-4">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <Card className="border-0 shadow-medium">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Headphones className="h-5 w-5 text-primary" />
                                            Empresa Desenvolvedora
                                        </CardTitle>
                                        <CardDescription>
                                            Grupo 3W Online - Soluções Digitais
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground">
                                            Desenvolvemos sites e sistemas personalizados sob demanda para
                                            empresas de todos os portes. Transformamos suas ideias em soluções digitais.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-medium">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-3 rounded-lg">
                                                <Globe className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Website</p>
                                                <a
                                                    href="https://www.3wonline.com.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline flex items-center gap-1"
                                                >
                                                    www.3wonline.com.br
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-3 rounded-lg">
                                                <Mail className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Suporte</p>
                                                <p className="text-muted-foreground">Use o formulário ao lado</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-3 rounded-lg">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Localização</p>
                                                <p className="text-muted-foreground">Brasil</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* CTA Card */}
                                <Card className="border-0 shadow-medium bg-gradient-to-br from-primary to-purple-600 text-white">
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-xl font-bold mb-3">
                                            Precisa de um Site ou Sistema?
                                        </h3>
                                        <p className="text-sm opacity-90 mb-4">
                                            O Grupo 3W Online desenvolve soluções personalizadas para seu negócio.
                                            Sites, sistemas, aplicativos e muito mais!
                                        </p>
                                        <a
                                            href="https://www.3wonline.com.br"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
                                        >
                                            Solicitar Orçamento
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Contact Form - Iframe */}
                            <div className="lg:col-span-2">
                                <Card className="border-0 shadow-strong">
                                    <CardHeader>
                                        <CardTitle>Envie sua Mensagem</CardTitle>
                                        <CardDescription>
                                            Preencha o formulário abaixo e retornaremos o mais breve possível
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <iframe
                                            title="Feedback Form"
                                            src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                            className="w-full h-[530px] border-0 rounded-xl shadow-lg"
                                            style={{ maxWidth: '900px' }}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 bg-secondary/20">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
                            <p className="text-lg text-muted-foreground">
                                Dúvidas comuns sobre nossas ferramentas
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {[
                                {
                                    q: "A ferramenta é realmente gratuita?",
                                    a: "Sim! Todas as nossas ferramentas são 100% gratuitas, sem limites de uso ou cadastro obrigatório."
                                },
                                {
                                    q: "Meus dados estão seguros?",
                                    a: "Absolutamente! Todos os dados são processados localmente no seu navegador e nunca são enviados para nossos servidores."
                                },
                                {
                                    q: "Posso usar para minha empresa?",
                                    a: "Sim! As ferramentas foram desenvolvidas para uso pessoal e empresarial. Você pode criar documentos ilimitados."
                                },
                                {
                                    q: "Como faço para solicitar novos recursos?",
                                    a: "Use o formulário de contato acima para enviar suas sugestões. Estamos sempre ouvindo nossos usuários!"
                                },
                            ].map((faq, index) => (
                                <Card key={index} className="border-0 shadow-soft">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-2">{faq.q}</h3>
                                        <p className="text-muted-foreground text-sm">{faq.a}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContatoPage;
