import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const PrivacyPage = () => {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faLock} className="text-6xl mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Política de Privacidade</h1>
                    <p className="text-xl text-violet-100 max-w-3xl mx-auto">
                        Seu dados estão seguros e protegidos
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

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados Coletados</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Coletamos os seguintes tipos de dados:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                            <li>Dados de navegação (cookies, endereço IP, páginas visitadas)</li>
                            <li>Respostas aos testes de personalidade (armazenadas localmente no seu navegador)</li>
                            <li>Informações fornecidas voluntariamente em formulários de contato</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso dos Dados</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Utilizamos seus dados para:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                            <li>Fornecer e melhorar nossos serviços</li>
                            <li>Gerar resultados personalizados dos testes</li>
                            <li>Analisar o uso da plataforma (Google Analytics)</li>
                            <li>Responder suas dúvidas e solicitações</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartilhamento de Dados</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Seus dados podem ser compartilhados apenas:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                            <li>Com seu consentimento explícito</li>
                            <li>Para cumprir obrigações legais</li>
                            <li>Com provedores de serviços (Google Analytics, Freshdesk) sob contratos de confidencialidade</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Armazenamento Local</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Os resultados dos testes são armazenados localmente no seu navegador (localStorage) e não são enviados para nossos servidores. Você pode apagá-los a qualquer momento limpando os dados do navegador.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site. Você pode gerenciar suas preferências de cookies através do banner exibido no site.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Seus Direitos (LGPD)</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Você tem direito a:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                            <li>Confirmar a existência de tratamento de dados</li>
                            <li>Acessar seus dados pessoais</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                            <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                            <li>Revogar o consentimento</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Segurança</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações na Política</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do site.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato: <a href="mailto:contato@3wonline.com.br" className="text-violet-600 hover:text-violet-800">contato@3wonline.com.br</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPage;
