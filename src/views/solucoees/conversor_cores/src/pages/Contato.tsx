import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

const ContatoPage = () => {
    const [iframeLoading, setIframeLoading] = useState(true);

    return (
        <Layout>
            <div className="min-h-screen py-12 px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                        Fale Conosco
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Estamos aqui para ajudar. Envie sua mensagem, dúvida ou sugestão.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="glass-card h-fit">
                            <CardContent className="p-6 space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        Endereço
                                    </h3>
                                    <p className="text-muted-foreground text-sm pl-7">
                                        <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">www.3wonline.com.br</a>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-primary" />
                                        Email
                                    </h3>
                                    <a href="mailto:contato@3wonline.com.br" className="text-muted-foreground text-sm pl-7 hover:text-primary transition-colors">
                                        contato@3wonline.com.br
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Horário
                                    </h3>
                                    <p className="text-muted-foreground text-sm pl-7">
                                        Segunda a Sexta<br />
                                        09:00 - 18:00
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-border/50">
                                    <a
                                        href="https://www.3wonline.com.br"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                                    >
                                        Visitar Site Oficial
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/10">
                            <h3 className="font-bold mb-2">Suporte Premium</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Precisa de uma solução personalizada ou suporte empresarial?
                            </p>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm font-semibold hover:underline"
                            >
                                Conheça nossos planos corporativos →
                            </a>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <Card className="glass-card-strong min-h-[600px] relative overflow-hidden">
                            <CardContent className="p-0 flex items-center justify-center h-full bg-white rounded-xl">
                                {iframeLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                    </div>
                                )}
                                <iframe
                                    title="Feedback Form"
                                    src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                    className="w-full h-[580px] border-0 rounded-xl"
                                    style={{ maxWidth: '100%' }}
                                    onLoad={() => setIframeLoading(false)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContatoPage;
