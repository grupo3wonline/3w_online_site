import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const TermsPage = () => {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-6xl mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Termos de Uso</h1>
                    <p className="text-xl text-violet-100 max-w-3xl mx-auto">
                        Leia com atenção antes de utilizar nossos serviços
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-8">
                            <strong>Última atualização:</strong> 03 de Fevereiro de 2026
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Ao acessar e utilizar a plataforma de Testes de Personalidade, você concorda em cumprir e estar sujeito aos seguintes termos e condições de uso.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso do Serviço</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Nossos testes são fornecidos apenas para fins educacionais e de entretenimento. Os resultados não constituem diagnóstico médico, psicológico ou profissional e não devem ser utilizados como tal.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitação de Responsabilidade</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            A plataforma não se responsabiliza por decisões tomadas com base nos resultados dos testes. Para orientação profissional, consulte sempre um especialista qualificado.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriedade Intelectual</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Todo o conteúdo desta plataforma, incluindo textos, gráficos, logotipos e software, é propriedade da 3w Online e está protegido por leis de direitos autorais.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacidade dos Dados</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Seus dados são processados localmente e não são compartilhados com terceiros. Para mais informações, consulte nossa Política de Privacidade.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Modificações dos Termos</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contato</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Para questões sobre estes Termos de Uso, entre em contato conosco em: <a href="mailto:contato@3wonline.com.br" className="text-violet-600 hover:text-violet-800">contato@3wonline.com.br</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;
