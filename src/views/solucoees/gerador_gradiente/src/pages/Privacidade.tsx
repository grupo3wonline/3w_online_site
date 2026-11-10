import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';

const Privacidade = () => {
    return (
        <Layout>
            <SEO
                title="Política de Privacidade - Gerador de Gradiente | 3w Online"
                description="Conheça nossa política de privacidade e como tratamos seus dados conforme a LGPD."
                keywords="política de privacidade, lgpd, proteção de dados, privacidade"
                url="https://app.3wonline.com/gerador_gradiente/privacidade"
            />

            <div className="container mx-auto px-4 pb-12">
                <Breadcrumb items={[{ label: 'Política de Privacidade' }]} />

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
                                <i className="fas fa-shield-alt text-white text-2xl"></i>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Política de Privacidade
                                </span>
                            </h1>
                            <p className="text-gray-600">
                                Última atualização: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                            <div className="inline-block mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                                <i className="fas fa-check-circle mr-2"></i>
                                Conforme LGPD (Lei nº 13.709/2018)
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-info-circle text-green-600 mr-2"></i>
                                    1. Introdução
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    A <strong>3w Online</strong> ("nós", "nosso" ou "nos") respeita sua privacidade e está comprometida em proteger
                                    seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e compartilhamos suas
                                    informações ao utilizar o <strong>Gerador de Gradiente CSS</strong>.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Esta política está em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-database text-green-600 mr-2"></i>
                                    2. Dados Coletados
                                </h2>

                                <h3 className="text-xl font-bold mb-3 mt-6">2.1. Processamento Local</h3>
                                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        <i className="fas fa-lock text-green-600 mr-2"></i>
                                        <strong>IMPORTANTE:</strong> O Gerador de Gradiente processa todos os dados <strong>localmente no seu navegador</strong>.
                                        As cores, configurações e gradientes criados <strong>NÃO são enviados</strong> para nossos servidores.
                                    </p>
                                </div>

                                <h3 className="text-xl font-bold mb-3 mt-6">2.2. Dados Automaticamente Coletados</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Coletamos automaticamente algumas informações quando você acessa nossa ferramenta:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li><strong>Dados de Navegação:</strong> endereço IP, tipo de navegador, sistema operacional, páginas visitadas</li>
                                    <li><strong>Cookies:</strong> pequenos arquivos de texto para melhorar sua experiência</li>
                                    <li><strong>Analytics:</strong> dados anônimos de uso através do Google Analytics</li>
                                </ul>

                                <h3 className="text-xl font-bold mb-3 mt-6">2.3. Dados Fornecidos por Você</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Se você entrar em contato conosco através do formulário, coletamos:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li>Nome completo</li>
                                    <li>Endereço de e-mail</li>
                                    <li>Mensagem e conteúdo da comunicação</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-bullseye text-green-600 mr-2"></i>
                                    3. Finalidade do Uso dos Dados
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Utilizamos seus dados para:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li>Melhorar a funcionalidade e experiência da ferramenta</li>
                                    <li>Analisar padrões de uso e estatísticas de acesso</li>
                                    <li>Responder suas dúvidas e solicitações de suporte</li>
                                    <li>Garantir a segurança e prevenir fraudes</li>
                                    <li>Cumprir obrigações legais</li>
                                    <li>Enviar comunicações sobre atualizações (apenas se você concordar)</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-cookie-bite text-green-600 mr-2"></i>
                                    4. Cookies e Tecnologias Similares
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Utilizamos cookies para:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico da ferramenta</li>
                                    <li><strong>Cookies de Preferências:</strong> Lembram suas configurações e escolhas</li>
                                    <li><strong>Cookies Analytics:</strong> Google Analytics para análise de tráfego (anônimo)</li>
                                    <li><strong>Cookies de Marketing:</strong> Google Tag Manager para campanhas (com seu consentimento)</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Você pode gerenciar ou desabilitar cookies através das configurações do seu navegador.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-share-alt text-green-600 mr-2"></i>
                                    5. Compartilhamento de Dados
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li><strong>Serviços de Analytics:</strong> Google Analytics (dados anônimos)</li>
                                    <li><strong>Hospedagem:</strong> Provedores de serviços de infraestrutura</li>
                                    <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou ordem judicial</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-lock text-green-600 mr-2"></i>
                                    6. Segurança dos Dados
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li>Criptografia SSL/TLS (HTTPS)</li>
                                    <li>Processamento local no navegador</li>
                                    <li>Acesso restrito aos dados</li>
                                    <li>Monitoramento de segurança contínuo</li>
                                    <li>Backups regulares</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-user-shield text-green-600 mr-2"></i>
                                    7. Seus Direitos (LGPD)
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    De acordo com a LGPD, você tem os seguintes direitos:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                        <strong>Confirmação:</strong> Saber se processamos seus dados
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-eye text-green-600 mr-2"></i>
                                        <strong>Acesso:</strong> Solicitar acesso aos seus dados
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-edit text-green-600 mr-2"></i>
                                        <strong>Correção:</strong> Corrigir dados incompletos ou incorretos
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-ban text-green-600 mr-2"></i>
                                        <strong>Anonimização:</strong> Bloquear ou anonimizar dados
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-trash text-green-600 mr-2"></i>
                                        <strong>Exclusão:</strong> Solicitar eliminação de dados
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <i className="fas fa-file-export text-green-600 mr-2"></i>
                                        <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Para exercer seus direitos, entre em contato conosco através do e-mail <a href="mailto:contato@3wonline.com.br" className="text-green-600 hover:underline">contato@3wonline.com.br</a>.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-clock text-green-600 mr-2"></i>
                                    8. Retenção de Dados
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política,
                                    a menos que um período de retenção mais longo seja exigido por lei.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-child text-green-600 mr-2"></i>
                                    9. Menores de Idade
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Nossa ferramenta não coleta intencionalmente dados de menores de 18 anos. Se você é pai/mãe ou responsável e
                                    acredita que seu filho forneceu dados pessoais, entre em contato conosco.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-sync-alt text-green-600 mr-2"></i>
                                    10. Alterações na Política
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas
                                    publicando a nova política nesta página e atualizando a data de "Última atualização".
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-envelope text-green-600 mr-2"></i>
                                    11. Contato e Encarregado de Dados
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos:
                                </p>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-100">
                                    <p className="font-medium text-gray-800 mb-2">
                                        <i className="fas fa-building text-green-600 mr-2"></i>
                                        3w Online - Encarregado de Dados (DPO)
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <i className="fas fa-envelope text-green-600 mr-2"></i>
                                        Email: <a href="mailto:contato@3wonline.com.br" className="text-green-600 hover:underline">contato@3wonline.com.br</a>
                                    </p>
                                    <p className="text-gray-700">
                                        <i className="fas fa-globe text-green-600 mr-2"></i>
                                        Website: <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">www.3wonline.com.br</a>
                                    </p>
                                </div>
                            </section>

                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white text-center mt-12">
                                <i className="fas fa-shield-alt text-4xl mb-4"></i>
                                <p className="text-lg font-medium mb-2">
                                    Seu privacidade e segurança são nossas prioridades
                                </p>
                                <p className="text-sm opacity-90">
                                    Comprometidos com a transparência e proteção dos seus dados conforme a LGPD
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Privacidade;
