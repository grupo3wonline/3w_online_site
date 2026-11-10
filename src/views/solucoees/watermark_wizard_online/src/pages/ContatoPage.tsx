import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContatoPage: React.FC = () => {
    const contactInfo = [
        {
            icon: 'fa-globe',
            title: 'Website',
            value: 'www.3wonline.com.br',
            link: 'https://www.3wonline.com.br'
        },
        {
            icon: 'fa-envelope',
            title: 'E-mail',
            value: 'contato@3wonline.com.br',
            link: 'mailto:contato@3wonline.com.br'
        },
        {
            icon: 'fa-map-marker-alt',
            title: 'Localização',
            value: 'Brasil',
            link: null
        }
    ];

    const socialLinks = [
        { icon: 'fa-facebook-f', label: 'Facebook', url: 'https://www.facebook.com/grupo3wonline' },
        { icon: 'fa-instagram', label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline' },
        { icon: 'fa-linkedin-in', label: 'LinkedIn', url: 'https://www.linkedin.com/company/grupo3wonline' },
        { icon: 'fa-youtube', label: 'YouTube', url: 'https://www.youtube.com/@grupo3wonline' }
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
                            <i className="fas fa-envelope"></i>
                            Fale Conosco
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Entre em{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Contato
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Tem dúvidas, sugestões ou precisa de um projeto personalizado?
                            Estamos aqui para ajudar. Envie sua mensagem e responderemos em breve!
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Company Info */}
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <i className="fas fa-building text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Grupo 3W Online</h3>
                                        <p className="text-sm text-muted-foreground">Soluções Digitais Sob Demanda</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6">
                                    O <strong>Grupo 3W Online</strong> é especializado em desenvolvimento de sites
                                    e sistemas personalizados. Transformamos ideias em soluções digitais de alto
                                    impacto para negócios de todos os tamanhos.
                                </p>

                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                                                <i className={`fas ${info.icon} text-cyan-500`}></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">{info.title}</p>
                                                {info.link ? (
                                                    <a
                                                        href={info.link}
                                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                        className="font-medium text-foreground hover:text-cyan-500 transition-colors"
                                                    >
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="font-medium">{info.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <i className="fas fa-share-alt text-cyan-500"></i>
                                    Redes Sociais
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Siga-nos nas redes sociais para ficar por dentro das novidades!
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-sm"
                                            aria-label={social.label}
                                        >
                                            <i className={`fab ${social.icon} text-lg`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
                                <h3 className="font-bold text-lg mb-3">
                                    <i className="fas fa-rocket mr-2"></i>
                                    Transforme Seu Negócio
                                </h3>
                                <p className="text-white/80 text-sm mb-6">
                                    Precisa de um site, sistema ou aplicativo personalizado?
                                    O Grupo 3W Online desenvolve soluções sob medida para você!
                                </p>
                                <a
                                    href="https://www.3wonline.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 font-medium rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                    Solicitar Orçamento
                                </a>
                            </div>
                        </div>

                        {/* Contact Form (iframe) */}
                        <div className="lg:col-span-2">
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <i className="fas fa-paper-plane text-white text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">Envie sua Mensagem</h3>
                                        <p className="text-sm text-muted-foreground">Responderemos o mais breve possível</p>
                                    </div>
                                </div>

                                <div className="bg-muted/30 rounded-xl p-4 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <i className="fas fa-shield-halved text-cyan-500"></i>
                                        <span>Seus dados estão protegidos conforme nossa <Link to="/politica-de-privacidade" className="text-cyan-500 hover:underline">Política de Privacidade</Link></span>
                                    </div>
                                </div>

                                <iframe
                                    title="Formulário de Contato"
                                    src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                    className="w-full h-[530px] border-0 rounded-xl shadow-lg bg-background"
                                    style={{ maxWidth: '900px' }}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-4">
                            <i className="fas fa-question-circle"></i>
                            Perguntas Frequentes
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Dúvidas{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Comuns
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Encontre respostas para as perguntas mais frequentes
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="fas fa-chevron-right text-cyan-500 text-sm"></i>
                                O Watermark Wizard é realmente gratuito?
                            </h3>
                            <p className="text-muted-foreground text-sm pl-6">
                                Sim! O Watermark Wizard é 100% gratuito, sem limites de uso, sem cadastro e sem custos ocultos.
                                Use quantas vezes quiser.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="fas fa-chevron-right text-cyan-500 text-sm"></i>
                                Minhas imagens são armazenadas em algum servidor?
                            </h3>
                            <p className="text-muted-foreground text-sm pl-6">
                                Não! Todo o processamento é feito localmente no seu navegador. Suas imagens nunca são
                                enviadas para nossos servidores, garantindo total privacidade.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="fas fa-chevron-right text-cyan-500 text-sm"></i>
                                Quais formatos de imagem são suportados?
                            </h3>
                            <p className="text-muted-foreground text-sm pl-6">
                                Suportamos PNG, JPG, JPEG e WEBP. Você pode processar até 10 imagens por vez.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="fas fa-chevron-right text-cyan-500 text-sm"></i>
                                O Grupo 3W Online desenvolve projetos personalizados?
                            </h3>
                            <p className="text-muted-foreground text-sm pl-6">
                                Sim! Desenvolvemos sites, sistemas, aplicativos e e-commerces personalizados sob demanda.
                                Entre em contato para solicitar um orçamento.
                            </p>
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
                            Vamos Conversar?
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            Seja para tirar dúvidas, fazer sugestões ou solicitar um projeto personalizado,
                            estamos prontos para ajudar!
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
                            <Link to="/ferramenta">
                                <Button size="lg" variant="outline" className="border-white text-gray-600 hover:bg-white/10 text-lg px-10 py-6 h-auto">
                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                    Usar Ferramenta
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContatoPage;
