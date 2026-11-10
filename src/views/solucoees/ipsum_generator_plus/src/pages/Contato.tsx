import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faClock,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import Layout from '../components/Layout';

const Contato = () => {
    const contactInfo = [
        {
            icon: faEnvelope,
            title: 'E-mail',
            content: 'contato@3wonline.com.br',
            link: 'mailto:contato@3wonline.com.br',
        },
        {
            icon: faGlobe,
            title: 'Site',
            content: 'www.3wonline.com.br',
            link: 'https://www.3wonline.com.br',
        },
        {
            icon: faClock,
            title: 'Horário',
            content: 'Seg - Sex: 9h às 18h',
            link: null,
        },
    ];

    const socialLinks = [
        {
            icon: faFacebook,
            name: 'Facebook',
            url: 'https://www.facebook.com/3wonline',
            color: 'hover:text-blue-600',
        },
        {
            icon: faTwitter,
            name: 'Twitter',
            url: 'https://www.twitter.com/3wonline',
            color: 'hover:text-blue-400',
        },
        {
            icon: faInstagram,
            name: 'Instagram',
            url: 'https://www.instagram.com/3wonline',
            color: 'hover:text-pink-600',
        },
        {
            icon: faLinkedin,
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/3wonline',
            color: 'hover:text-blue-700',
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Entre em Contato
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto">
                        Estamos aqui para ajudar. Envie sua mensagem e responderemos em breve!
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center border border-violet-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon
                                        icon={info.icon}
                                        className="text-white text-2xl"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="text-violet-600 hover:text-violet-800 transition-colors duration-300"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-gray-600">{info.content}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Siga-nos nas Redes Sociais
                        </h3>
                        <div className="flex items-center justify-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                    aria-label={social.name}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Envie Sua Mensagem
                            </h2>
                            <p className="text-xl text-gray-600">
                                Preencha o formulário abaixo e nossa equipe entrará em contato
                            </p>
                        </div>

                        {/* Freshdesk Iframe */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-violet-100">
                            <iframe
                                title="Feedback Form"
                                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                className="w-full h-[530px] border-0 rounded-xl"
                                style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}
                            ></iframe>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Ou envie um e-mail direto para:{' '}
                                <a
                                    href="mailto:contato@3wonline.com.br"
                                    className="text-violet-600 hover:text-violet-800 font-semibold transition-colors duration-300"
                                >
                                    contato@3wonline.com.br
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-xl text-gray-600">
                            Respostas rápidas para dúvidas comuns
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-white to-violet-50 p-6 rounded-2xl shadow-lg border border-violet-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Qual o prazo médio para desenvolvimento de um site?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                O prazo varia conforme a complexidade do projeto, mas em média
                                um site institucional leva de 15 a 30 dias. Projetos mais
                                complexos podem levar mais tempo.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-violet-50 p-6 rounded-2xl shadow-lg border border-violet-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Vocês oferecem suporte após a entrega?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Sim! Oferecemos garantia e suporte técnico em todos os nossos
                                projetos. Também temos planos de manutenção mensal para
                                atualizações contínuas.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-violet-50 p-6 rounded-2xl shadow-lg border border-violet-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Como funciona o processo de orçamento?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Após enviar sua mensagem, nossa equipe agendará uma reunião para
                                entender suas necessidades. Em seguida, elaboramos uma proposta
                                personalizada sem compromisso.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-violet-50 p-6 rounded-2xl shadow-lg border border-violet-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                É possível parcelar o investimento?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Sim! Oferecemos condições flexíveis de pagamento para facilitar
                                seu investimento em tecnologia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Transforme Sua Ideia em Realidade
                    </h2>
                    <p className="text-xl text-violet-100 mb-8">
                        A <span className="font-bold">3w Online</span> está pronta para criar a
                        solução perfeita para o seu negócio. Entre em contato e vamos
                        conversar!
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 bg-white text-violet-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                    >
                        <span>Visite Nosso Site</span>
                    </a>
                </div>
            </section>
        </Layout>
    );
};

export default Contato;
