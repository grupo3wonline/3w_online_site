import Layout from '@/components/Layout';
import CTASection from '@/components/CTASection';

const Contato = () => {
    return (
        <Layout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Entre em <span className="text-yellow-300">Contato</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        Estamos prontos para atender você e transformar suas ideias em realidade
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Contact Info */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Fale Conosco</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Nossa equipe está pronta para atender você. Entre em contato através dos canais abaixo
                                ou preencha o formulário ao lado.
                            </p>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-envelope text-2xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">E-mail</h3>
                                        <a
                                            href="mailto:contato@3wonline.com.br"
                                            className="text-violet-600 hover:text-violet-700"
                                        >
                                            contato@3wonline.com.br
                                        </a>
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-phone text-2xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Website</h3>
                                        <a
                                            href="https://www.3wonline.com.br"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-violet-600 hover:text-violet-700"
                                        >
                                            www.3wonline.com.br
                                        </a>
                                    </div>
                                </div>

                                {/* Horário */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-clock text-2xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Horário</h3>
                                        <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                                        <p className="text-gray-600">Sábado: 9h às 13h</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8">
                                <h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.facebook.com/3wonline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors"
                                    >
                                        <i className="fab fa-facebook-f text-xl"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/3wonline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center text-white transition-colors"
                                    >
                                        <i className="fab fa-instagram text-xl"></i>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/3wonline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center text-white transition-colors"
                                    >
                                        <i className="fab fa-linkedin-in text-xl"></i>
                                    </a>
                                    <a
                                        href="https://github.com/3wonline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors"
                                    >
                                        <i className="fab fa-github text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Freshdesk Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                    <i className="fas fa-paper-plane text-violet-600 mr-3"></i>
                                    Envie sua Mensagem
                                </h2>

                                <div className="flex items-center justify-center">
                                    <iframe
                                        title="Feedback Form"
                                        src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                                        className="w-full h-[530px] border-0 rounded-xl"
                                        style={{ maxWidth: '900px' }}
                                    />
                                </div>

                                <div className="mt-6 p-4 bg-violet-50 rounded-xl">
                                    <div className="flex items-start space-x-3">
                                        <i className="fas fa-info-circle text-violet-600 text-xl mt-1"></i>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Política de Privacidade</h4>
                                            <p className="text-sm text-gray-600">
                                                Seus dados estão protegidos conforme a LGPD. Não compartilhamos suas informações com terceiros.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Perguntas <span className="text-violet-600">Frequentes</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                    <span className="flex items-center">
                                        <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                        Qual o prazo médio de desenvolvimento?
                                    </span>
                                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                    O prazo varia de acordo com a complexidade do projeto. Sites institucionais levam de 15 a 30 dias,
                                    enquanto sistemas personalizados podem levar de 2 a 6 meses.
                                </p>
                            </details>

                            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                    <span className="flex items-center">
                                        <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                        Vocês oferecem manutenção?
                                    </span>
                                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                    Sim! Oferecemos planos de manutenção mensal que incluem atualizações, backup, monitoramento,
                                    suporte técnico e correção de bugs.
                                </p>
                            </details>

                            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                    <span className="flex items-center">
                                        <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                        Como funciona o pagamento?
                                    </span>
                                    <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                    Trabalhamos com pagamento parcelado: 50% no início do projeto e 50% na entrega.
                                    Aceitamos PIX, cartão de crédito e boleto bancário.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection
                title="Pronto para Começar?"
                subtitle="Solicite um orçamento sem compromisso e descubra como podemos transformar suas ideias em realidade digital"
                buttonText="Solicitar Orçamento"
                buttonIcon="fa-paper-plane"
            />
        </Layout>
    );
};

export default Contato;
