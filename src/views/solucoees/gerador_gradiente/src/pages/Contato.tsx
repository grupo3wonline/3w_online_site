import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';
import CTA from '../components/CTA';

const Contato = () => {
    const contactInfo = [
        {
            icon: 'fa-envelope',
            title: 'Email',
            value: 'contato@3wonline.com.br',
            link: 'mailto:contato@3wonline.com.br',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: 'fa-globe',
            title: 'Site',
            value: 'https://3wonline.com.br',
            link: 'https://3wonline.com.br',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: 'fa-map-marker-alt',
            title: 'Localização',
            value: 'Brasil',
            link: '#',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: 'fa-clock',
            title: 'Horário',
            value: 'Seg-Sex: 9h às 18h',
            link: '#',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const socialMedia = [
        { icon: 'fab fa-facebook', name: 'Facebook', url: 'https://facebook.com/3wonline', color: 'hover:text-blue-600' },
        { icon: 'fab fa-instagram', name: 'Instagram', url: 'https://instagram.com/3wonline', color: 'hover:text-pink-600' },
        { icon: 'fab fa-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/company/3wonline', color: 'hover:text-blue-700' },
        { icon: 'fab fa-youtube', name: 'YouTube', url: 'https://youtube.com/3wonline', color: 'hover:text-red-600' },
        { icon: 'fab fa-whatsapp', name: 'WhatsApp', url: 'https://wa.me/5511999999999', color: 'hover:text-green-600' },
    ];

    const faq = [
        {
            question: 'Quanto tempo leva para desenvolver um projeto?',
            answer: 'O prazo varia de acordo com a complexidade e escopo do projeto. Projetos simples podem levar de 2 a 4 semanas, enquanto projetos mais complexos podem levar de 2 a 6 meses.',
        },
        {
            question: 'Quais tecnologias vocês utilizam?',
            answer: 'Trabalhamos com as tecnologias mais modernas do mercado: React, Vue, Laravel, Node.js, TypeScript, Tailwind CSS, entre outras.',
        },
        {
            question: 'Vocês oferecem suporte após a entrega?',
            answer: 'Sim! Oferecemos planos de suporte e manutenção para garantir que seu projeto continue funcionando perfeitamente.',
        },
    ];

    return (
        <Layout>
            <SEO
                title="Contato - Fale Conosco | 3w Online"
                description="Entre em contato com a 3w Online. Estamos prontos para ajudar você a transformar suas ideias em realidade. Solicite um orçamento gratuito!"
                keywords="contato, 3w online, orçamento, suporte, atendimento"
                url="https://app.3wonline.com/gerador_gradiente/contato"
            />

            <div className="container mx-auto px-4">
                <Breadcrumb items={[{ label: 'Contato' }]} />

                {/* Hero Section */}
                <section className="py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Entre em <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Contato</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Estamos aqui para ajudar! Preencha o formulário abaixo ou use nossos canais de contato.
                            Responderemos o mais breve possível.
                        </p>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                className="group bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <i className={`fas ${info.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                                <p className="text-gray-600">{info.value}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
                                <i className="fas fa-paper-plane text-4xl mb-4"></i>
                                <h2 className="text-3xl font-bold mb-2">Fale Conosco</h2>
                                <p className="text-white/90">
                                    Preencha o formulário abaixo e nossa equipe entrará em contato em breve
                                </p>
                            </div>

                            <div className="p-8">
                                <iframe
                                    title="Feedback Form"
                                    src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                    className="w-full h-[530px] border-0 rounded-xl"
                                    style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media Section */}
                <section className="py-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Siga-nos nas Redes Sociais</h2>
                        <p className="text-gray-600">
                            Fique por dentro das novidades e conteúdos exclusivos
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {socialMedia.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex items-center space-x-2 bg-white rounded-lg px-6 py-3 border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 ${social.color}`}
                            >
                                <i className={`${social.icon} text-2xl`}></i>
                                <span className="font-medium">{social.name}</span>
                                <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </a>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl px-8 my-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Perguntas <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Frequentes</span>
                            </h2>
                            <p className="text-xl text-gray-600">
                                Respostas para as dúvidas mais comuns
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faq.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="flex items-start font-bold text-lg mb-3">
                                        <i className="fas fa-question-circle text-indigo-600 mr-3 mt-1"></i>
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed ml-8">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTA
                    title="Prefere Conversar Diretamente?"
                    description="Nossa equipe está pronta para atendê-lo! Entre em contato por telefone ou WhatsApp e tire todas as suas dúvidas sobre nossos serviços."
                    buttonText="Chamar no WhatsApp"
                    variant="secondary"
                />
            </div>
        </Layout>
    );
};

export default Contato;
