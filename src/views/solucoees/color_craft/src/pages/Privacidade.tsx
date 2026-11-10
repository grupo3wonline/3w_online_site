import Layout from '@/components/Layout';

const Privacidade = () => {
    return (
        <Layout>
            <div className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                        Política de Privacidade
                    </h1>
                    <p className="text-center text-white/90">
                        Última atualização: 03 de Fevereiro de 2026
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-green-50 rounded-xl p-6 mb-8 border-l-4 border-green-500">
                            <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center">
                                <i className="fas fa-shield-alt mr-2"></i>
                                Conformidade com a LGPD
                            </h3>
                            <p className="text-green-800 text-sm">
                                Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                            1. Introdução
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            A 3w Online, desenvolvedora do ColorCraft, respeita sua privacidade e está comprometida em proteger
                            seus dados pessoais. Esta política explica como coletamos, usamos, armazenamos e protegemos suas informações.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-database text-violet-600 mr-3"></i>
                            2. Dados que Coletamos
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <h3 className="font-bold text-lg mb-3">2.1. Dados Coletados Automaticamente:</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Endereço IP</li>
                                <li>Tipo de navegador e versão</li>
                                <li>Sistema operacional</li>
                                <li>Páginas visitadas e tempo de permanência</li>
                                <li>Origem da visita (referrer)</li>
                                <li>Data e hora de acesso</li>
                            </ul>

                            <h3 className="font-bold text-lg mb-3">2.2. Dados de Uso da Ferramenta:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Cores selecionadas e paletas criadas (processadas localmente)</li>
                                <li>Preferências de configuração</li>
                                <li>Interações com a interface</li>
                            </ul>

                            <div className="bg-blue-50 rounded-lg p-4 mt-4">
                                <p className="text-sm text-blue-900">
                                    <i className="fas fa-lock mr-2"></i>
                                    <strong>Importante:</strong> O processamento de cores é feito 100% localmente no seu navegador.
                                    As cores e paletas que você cria NÃO são enviadas para nossos servidores.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-cogs text-violet-600 mr-3"></i>
                            3. Como Usamos seus Dados
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <p className="mb-3">Utilizamos os dados coletados para:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Fornecer e melhorar nossos serviços</li>
                                <li>Analisar o uso da plataforma e identificar tendências</li>
                                <li>Otimizar a experiência do usuário</li>
                                <li>Detectar e prevenir fraudes ou abusos</li>
                                <li>Cumprir obrigações legais</li>
                                <li>Enviar comunicações relevantes (se você optar por receber)</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-cookie-bite text-violet-600 mr-3"></i>
                            4. Cookies e Tecnologias Similares
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <p className="mb-3">Utilizamos os seguintes tipos de cookies:</p>

                            <h3 className="font-bold mb-2">4.1. Cookies Essenciais:</h3>
                            <p className="mb-3">Necessários para o funcionamento básico do site. Não podem ser desativados.</p>

                            <h3 className="font-bold mb-2">4.2. Cookies Analíticos:</h3>
                            <p className="mb-3">Usados para entender como os visitantes interagem com o site (Google Analytics).</p>

                            <h3 className="font-bold mb-2">4.3. Cookies de Preferências:</h3>
                            <p className="mb-3">Armazenam suas preferências e configurações.</p>

                            <div className="bg-violet-50 rounded-lg p-4 mt-4">
                                <p className="text-sm text-violet-900">
                                    <i className="fas fa-hand-pointer mr-2"></i>
                                    Você pode gerenciar suas preferências de cookies através do banner exibido ao acessar o site.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-share-alt text-violet-600 mr-3"></i>
                            5. Compartilhamento de Dados
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <p className="mb-3">NÃO vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.</p>
                            <p className="mb-3">Podemos compartilhar dados com:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Google Analytics:</strong> Para análise de tráfego (dados anônimos)</li>
                                <li><strong>Provedores de hospedagem:</strong> Para manter o site funcionando</li>
                                <li><strong>Autoridades legais:</strong> Quando exigido por lei</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-shield-alt text-violet-600 mr-3"></i>
                            6. Segurança dos Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra acesso
                            não autorizado, alteração, divulgação ou destruição, incluindo:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                            <li>Criptografia SSL/TLS para transmissão de dados</li>
                            <li>Processamento local de dados sensíveis</li>
                            <li>Firewalls e sistemas de detecção de intrusão</li>
                            <li>Backups regulares e seguros</li>
                            <li>Acesso restrito aos dados por pessoal autorizado</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-user-check text-violet-600 mr-3"></i>
                            7. Seus Direitos (LGPD)
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <p className="mb-3">De acordo com a LGPD, você tem os seguintes direitos:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-eye text-violet-600 mr-2"></i>
                                        Acesso
                                    </h4>
                                    <p className="text-sm">Solicitar acesso aos seus dados pessoais</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-edit text-violet-600 mr-2"></i>
                                        Correção
                                    </h4>
                                    <p className="text-sm">Corrigir dados incompletos ou desatualizados</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-trash text-violet-600 mr-2"></i>
                                        Exclusão
                                    </h4>
                                    <p className="text-sm">Solicitar a exclusão de seus dados</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-ban text-violet-600 mr-2"></i>
                                        Oposição
                                    </h4>
                                    <p className="text-sm">Opor-se ao processamento de dados</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-download text-violet-600 mr-2"></i>
                                        Portabilidade
                                    </h4>
                                    <p className="text-sm">Solicitar a portabilidade dos dados</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold mb-2 flex items-center">
                                        <i className="fas fa-info-circle text-violet-600 mr-2"></i>
                                        Informação
                                    </h4>
                                    <p className="text-sm">Obter informações sobre o tratamento</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-clock text-violet-600 mr-3"></i>
                            8. Retenção de Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas
                            nesta política ou conforme exigido por lei. Logs de acesso são mantidos por até 6 meses.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-child text-violet-600 mr-3"></i>
                            9. Menores de Idade
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Nosso serviço não é direcionado a menores de 13 anos. Não coletamos conscientemente dados de crianças.
                            Se você acredita que coletamos dados de uma criança, entre em contato conosco imediatamente.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-globe text-violet-600 mr-3"></i>
                            10. Transferência Internacional de Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Alguns de nossos fornecedores de serviços podem estar localizados fora do Brasil. Quando isso ocorrer,
                            garantimos que medidas adequadas de proteção estejam em vigor.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-sync text-violet-600 mr-3"></i>
                            11. Alterações nesta Política
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através
                            do site ou por e-mail. A data da última atualização está sempre indicada no topo desta página.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-envelope text-violet-600 mr-3"></i>
                            12. Encarregado de Dados (DPO)
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso
                            Encarregado de Proteção de Dados:
                        </p>
                        <div className="bg-violet-50 rounded-xl p-6">
                            <p className="text-gray-700 mb-2">
                                <i className="fas fa-user text-violet-600 mr-2"></i>
                                <strong>Encarregado:</strong> 3w Online - DPO
                            </p>
                            <p className="text-gray-700 mb-2">
                                <i className="fas fa-envelope text-violet-600 mr-2"></i>
                                <strong>E-mail:</strong> dpo@3wonline.com.br
                            </p>
                            <p className="text-gray-700">
                                <i className="fas fa-globe text-violet-600 mr-2"></i>
                                <strong>Website:</strong>{' '}
                                <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 underline">
                                    www.3wonline.com.br
                                </a>
                            </p>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-violet-600">
                            <h3 className="font-bold text-lg mb-3 text-gray-900">Resumo de seus Direitos:</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Você tem total controle sobre seus dados pessoais. Você pode a qualquer momento:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>✓ Acessar seus dados</li>
                                <li>✓ Corrigir informações incorretas</li>
                                <li>✓ Solicitar a exclusão de seus dados</li>
                                <li>✓ Revogar seu consentimento</li>
                                <li>✓ Exportar seus dados</li>
                                <li>✓ Apresentar reclamação à ANPD (Autoridade Nacional de Proteção de Dados)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Privacidade;
