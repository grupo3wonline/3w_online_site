import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const Contact = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Contato', path: '/contato' }
    ];

    const contactInfo = [
        {
            icon: 'fa-envelope',
            title: 'Email',
            value: 'contato@3wonline.com.br',
            link: 'mailto:contato@3wonline.com.br'
        },
        {
            icon: 'fa-phone',
            title: 'Telefone',
            value: '(11) 9 9999-9999',
            link: 'tel:+5511999999999'
        },
        {
            icon: 'fa-map-marker-alt',
            title: 'Localização',
            value: 'São Paulo, SP - Brasil',
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Entre em Contato
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                            Estamos aqui para ajudar! Envie suas dúvidas, sugestões ou feedbacks
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <i className={`fas ${info.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                                <p className="text-gray-600">{info.value}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Fale Conosco
                            </h2>
                            <p className="text-gray-600">
                                Preencha o formulário abaixo e entraremos em contato em breve
                            </p>
                        </div>

                        {/* Freshdesk Form Iframe */}
                        <div className="flex justify-center">
                            <iframe
                                title="Feedback Form"
                                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                className="w-full h-[530px] border-0 rounded-xl shadow-lg"
                                style={{ maxWidth: '900px' }}
                            ></iframe>
                        </div>

                        <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                            <div className="flex items-start gap-3">
                                <i className="fas fa-info-circle text-purple-500 text-xl mt-1"></i>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Tempo de Resposta</h4>
                                    <p className="text-gray-600 text-sm">
                                        Nossa equipe responde todas as mensagens em até 24 horas úteis.
                                        Para questões urgentes, utilize nosso telefone de contato.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-xl text-gray-600">
                            Antes de entrar em contato, confira se sua dúvida já foi respondida
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: 'Como posso começar a usar o planejador?',
                                answer: 'Basta acessar a seção "Ferramentas" e começar a preencher as informações do seu casamento. Não é necessário cadastro.'
                            },
                            {
                                question: 'O serviço é gratuito?',
                                answer: 'Sim! Todas as funcionalidades são completamente gratuitas e sem limites de uso.'
                            },
                            {
                                question: 'Posso exportar meus dados?',
                                answer: 'Sim! Você pode exportar todos os relatórios em formato PDF para compartilhar ou imprimir.'
                            },
                            {
                                question: 'Os cálculos são precisos?',
                                answer: 'Nossos cálculos são baseados em médias de mercado atualizadas regularmente, mas podem variar conforme sua região e fornecedores escolhidos.'
                            },
                            {
                                question: 'Preciso instalar algum aplicativo?',
                                answer: 'Não! Nossa plataforma funciona direto no navegador, em qualquer dispositivo.'
                            }
                        ].map((faq, index) => (
                            <details
                                key={index}
                                className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <summary className="cursor-pointer list-none flex items-start gap-3">
                                    <i className="fas fa-chevron-right text-purple-500 mt-1 group-open:rotate-90 transition-transform"></i>
                                    <span className="font-bold text-gray-800 flex-1">{faq.question}</span>
                                </summary>
                                <p className="text-gray-600 mt-4 ml-8">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media Links */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Siga-nos nas Redes Sociais
                        </h3>
                        <p className="text-white/90 mb-8">
                            Fique por dentro de novidades, dicas e atualizações
                        </p>
                        <div className="flex justify-center gap-4">
                            {[
                                { icon: 'fa-facebook', link: '#', color: 'hover:bg-blue-600' },
                                { icon: 'fa-instagram', link: '#', color: 'hover:bg-pink-600' },
                                { icon: 'fa-linkedin', link: '#', color: 'hover:bg-blue-700' },
                                { icon: 'fa-twitter', link: '#', color: 'hover:bg-sky-500' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl ${social.color} transition-all duration-300 transform hover:scale-110`}
                                >
                                    <i className={`fab ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default Contact;
