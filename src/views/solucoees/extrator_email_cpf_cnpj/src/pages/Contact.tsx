import Breadcrumb from '@/components/Breadcrumb';
import CTA from '@/components/CTA';

const Contact = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Breadcrumb items={[{ label: 'Contato' }]} />

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        <i className="fas fa-envelope text-violet-600 mr-3"></i>
                        Entre em Contato
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Estamos aqui para ajudar! Envie sua mensagem e responderemos o mais rápido possível.
                    </p>
                </div>

                {/* Informações de Contato */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: 'fa-headset',
                            color: 'from-blue-600 to-blue-800',
                            title: 'Suporte Técnico',
                            description: 'Dúvidas sobre a ferramenta? Estamos prontos para ajudar!',
                            action: 'Abrir Formulário'
                        },
                        {
                            icon: 'fa-briefcase',
                            color: 'from-purple-600 to-purple-800',
                            title: 'Projetos',
                            description: 'Precisa de um sistema personalizado? Fale conosco!',
                            action: 'Solicitar Orçamento'
                        },
                        {
                            icon: 'fa-handshake',
                            color: 'from-green-600 to-green-800',
                            title: 'Parcerias',
                            description: 'Interessado em parcerias? Vamos conversar!',
                            action: 'Enviar Proposta'
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2`}
                        >
                            <i className={`fas ${item.icon} text-6xl mb-6 block`}></i>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="opacity-90 mb-6">{item.description}</p>
                            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold">
                                <i className="fas fa-arrow-down mr-2"></i>
                                {item.action}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulário de Contato */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-comment-dots text-violet-600 mr-3"></i>
                            Fale Conosco
                        </h2>
                        <p className="text-gray-600">
                            Preencha o formulário abaixo e entraremos em contato em breve
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <iframe
                            title="Feedback Form"
                            src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                            className="w-full h-[530px] border-0 rounded-xl shadow-lg"
                            style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}
                        />
                    </div>
                </div>

                {/* Informações Adicionais */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                        Outras Formas de Contato
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <i className="fas fa-globe text-4xl text-blue-600 mb-4 block"></i>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Site Oficial</h3>
                            <p className="text-gray-600 mb-4">
                                Visite nosso site para conhecer todos os nossos serviços e projetos
                            </p>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold"
                            >
                                www.3wonline.com.br
                                <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <i className="fas fa-clock text-4xl text-green-600 mb-4 block"></i>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Horário de Atendimento</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>
                                    <i className="far fa-calendar mr-2 text-violet-600"></i>
                                    <span className="font-semibold">Segunda a Sexta:</span> 9h às 18h
                                </p>
                                <p>
                                    <i className="far fa-calendar mr-2 text-violet-600"></i>
                                    <span className="font-semibold">Sábados:</span> 9h às 13h
                                </p>
                                <p className="text-sm text-gray-500 mt-4">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Respondemos em até 24 horas úteis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Rápido */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                        Perguntas Frequentes
                    </h2>
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {[
                            {
                                question: 'A ferramenta é realmente gratuita?',
                                answer: 'Sim! 100% gratuita, sem limites de uso e sem necessidade de cadastro.'
                            },
                            {
                                question: 'Meus dados ficam armazenados?',
                                answer: 'Não! Todo o processamento é feito localmente no seu navegador. Nenhum dado é enviado ou armazenado em nossos servidores.'
                            },
                            {
                                question: 'Posso usar comercialmente?',
                                answer: 'Sim! Você pode usar a ferramenta para fins pessoais ou comerciais sem restrições.'
                            },
                            {
                                question: 'Como solicitar suporte técnico?',
                                answer: 'Use o formulário acima ou visite nosso site oficial para obter suporte personalizado.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-start">
                                    <i className="fas fa-question-circle text-violet-600 mr-3 mt-1"></i>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 ml-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <CTA variant="primary" />
            </div>
        </div>
    );
};

export default Contact;
