import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faMapMarkerAlt,
    faComments,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faComments} className="text-6xl mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Entre em Contato</h1>
                    <p className="text-xl text-violet-100 max-w-3xl mx-auto">
                        Estamos aqui para ajudar! Envie sua mensagem e responderemos em breve.
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: faEnvelope,
                                title: 'E-mail',
                                info: 'contato@3wonline.com.br',
                                link: 'mailto:contato@3wonline.com.br',
                            },
                            {
                                icon: faGlobe,
                                title: 'Site',
                                info: 'www.3wonline.com.br',
                                link: 'https://www.3wonline.com.br',
                            },
                            {
                                icon: faMapMarkerAlt,
                                title: 'Localização',
                                info: 'Brasil',
                                link: 'https://www.3wonline.com.br',
                            },
                        ].map((contact, index) => (
                            <div key={index} className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={contact.icon} className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                                {contact.link ? (
                                    <a href={contact.link} className="text-violet-600 hover:text-violet-800 font-medium">
                                        {contact.info}
                                    </a>
                                ) : (
                                    <p className="text-gray-600">{contact.info}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Freshdesk Form */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                                Formulário de Contato
                            </h2>
                            <p className="text-gray-600 text-center mb-8">
                                Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
                            </p>
                            <iframe
                                title="Feedback Form"
                                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                className="w-full h-[530px] border-0 rounded-xl shadow-lg"
                                style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-4xl font-bold mb-4">
                        Precisa de um Sistema Personalizado?
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                        A <strong className="text-violet-400">3w Online</strong> desenvolve soluções sob demanda.
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Conheça a 3w Online →
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
