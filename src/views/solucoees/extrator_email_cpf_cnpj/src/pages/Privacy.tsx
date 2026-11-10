import Breadcrumb from '@/components/Breadcrumb';

const Privacy = () => {
    const lastUpdate = '01 de fevereiro de 2026';

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
                <Breadcrumb items={[{ label: 'Política de Privacidade' }]} />

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-shield-alt text-violet-600 mr-3"></i>
                            Política de Privacidade
                        </h1>
                        <p className="text-gray-600">
                            <i className="far fa-calendar-alt mr-2"></i>
                            Última atualização: {lastUpdate}
                        </p>
                        <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mt-4">
                            <i className="fas fa-check-circle mr-2"></i>
                            Conforme LGPD (Lei nº 13.709/2018)
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                                1. Introdução
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                O <strong>Grupo 3w Online</strong>, responsável pelo <strong>Extrator de Email, CPF e CNPJ</strong>,
                                está comprometido com a proteção da sua privacidade e dos seus dados pessoais,
                                em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                                <p className="text-gray-700">
                                    <i className="fas fa-lightbulb text-blue-600 mr-2"></i>
                                    <strong>Importante:</strong> Esta ferramenta foi projetada para processar todos os dados
                                    <strong> localmente no seu navegador</strong>, sem transmissão ou armazenamento em servidores externos.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-database text-violet-600 mr-3"></i>
                                2. Coleta de Dados
                            </h2>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.1. Dados da Ferramenta</h3>
                            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-4">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    <i className="fas fa-shield-check text-green-600 mr-2"></i>
                                    <strong>NÃO coletamos, armazenamos ou transmitimos</strong> os dados que você processa na ferramenta:
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                                        <span>Emails extraídos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                                        <span>CPFs processados</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                                        <span>CNPJs verificados</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                                        <span>Textos inseridos na ferramenta</span>
                                    </li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.2. Dados de Navegação (Cookies)</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Coletamos dados mínimos de navegação por meio de cookies para:
                            </p>
                            <ul className="space-y-2 text-gray-700 mb-4">
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                    <span><strong>Google Analytics:</strong> Análise de tráfego e comportamento do usuário (dados anonimizados)</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                    <span><strong>Google Tag Manager:</strong> Gerenciamento de tags e scripts</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                    <span><strong>Cookies de Preferência:</strong> Armazenamento de aceite de cookies</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-cogs text-violet-600 mr-3"></i>
                                3. Uso dos Dados
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Os dados de navegação coletados são utilizados exclusivamente para:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Melhorar a experiência do usuário',
                                    'Análise de tráfego do site',
                                    'Estatísticas de uso da ferramenta',
                                    'Otimização de performance',
                                    'Identificação de erros técnicos',
                                    'Desenvolvimento de melhorias'
                                ].map((item, index) => (
                                    <div key={index} className="bg-violet-50 p-4 rounded-lg flex items-start">
                                        <i className="fas fa-check-circle text-violet-600 mr-3 mt-1"></i>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-share-alt text-violet-600 mr-3"></i>
                                4. Compartilhamento de Dados
                            </h2>
                            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    <strong>NÃO compartilhamos</strong> seus dados pessoais com terceiros, exceto:
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-chart-line text-yellow-600 mr-3 mt-1"></i>
                                        <span>Google Analytics (dados anonimizados para análise de tráfego)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-balance-scale text-yellow-600 mr-3 mt-1"></i>
                                        <span>Quando exigido por lei ou ordem judicial</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-cookie-bite text-violet-600 mr-3"></i>
                                5. Cookies
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Utilizamos os seguintes tipos de cookies:
                            </p>
                            <div className="space-y-4">
                                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                                    <h4 className="font-bold text-gray-900 mb-2">
                                        <i className="fas fa-cog text-gray-600 mr-2"></i>
                                        Cookies Essenciais
                                    </h4>
                                    <p className="text-gray-700 text-sm">
                                        Necessários para o funcionamento básico do site (aceite de cookies).
                                    </p>
                                </div>
                                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                                    <h4 className="font-bold text-gray-900 mb-2">
                                        <i className="fas fa-chart-bar text-blue-600 mr-2"></i>
                                        Cookies Analíticos
                                    </h4>
                                    <p className="text-gray-700 text-sm">
                                        Google Analytics para análise de tráfego e comportamento (anonimizados).
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mt-4 text-sm">
                                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                                Você pode gerenciar cookies através das configurações do seu navegador.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-user-shield text-violet-600 mr-3"></i>
                                6. Seus Direitos (LGPD)
                            </h2>
                            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-4 font-semibold">
                                    De acordo com a LGPD, você tem os seguintes direitos:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Confirmação da existência de tratamento',
                                        'Acesso aos dados',
                                        'Correção de dados incompletos ou inexatos',
                                        'Anonimização, bloqueio ou eliminação',
                                        'Portabilidade dos dados',
                                        'Eliminação dos dados',
                                        'Informação sobre compartilhamento',
                                        'Revogação do consentimento'
                                    ].map((right, index) => (
                                        <div key={index} className="flex items-start">
                                            <i className="fas fa-check-double text-violet-600 mr-3 mt-1"></i>
                                            <span className="text-gray-700 text-sm">{right}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-lock text-violet-600 mr-3"></i>
                                7. Segurança
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Implementamos medidas técnicas e organizacionais para proteger seus dados:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <i className="fas fa-shield-alt text-green-600 mr-3 mt-1"></i>
                                    <span>Processamento local - dados não saem do seu dispositivo</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-lock text-green-600 mr-3 mt-1"></i>
                                    <span>Conexão HTTPS criptografada</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-server text-green-600 mr-3 mt-1"></i>
                                    <span>Servidores seguros e atualizados</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-clock text-violet-600 mr-3"></i>
                                8. Retenção de Dados
                            </h2>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>Dados da ferramenta:</strong> Como o processamento é local, nenhum dado é retido por nós.
                                    <br /><br />
                                    <strong>Dados de navegação (cookies):</strong> Mantidos conforme políticas do Google Analytics,
                                    podendo ser excluídos a qualquer momento através das configurações do navegador.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-sync-alt text-violet-600 mr-3"></i>
                                9. Alterações nesta Política
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente.
                                Recomendamos que você revise esta página regularmente para se manter informado sobre
                                como protegemos seus dados.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-envelope text-violet-600 mr-3"></i>
                                10. Contato e DPO
                            </h2>
                            <div className="bg-violet-50 border-l-4 border-violet-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade,
                                    entre em contato conosco:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-700">
                                        <i className="fas fa-building text-violet-600 mr-3"></i>
                                        <span><strong>Responsável:</strong> Grupo 3w Online</span>
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <i className="fas fa-globe text-violet-600 mr-3"></i>
                                        <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer"
                                            className="text-violet-600 hover:text-violet-700 font-semibold">
                                            www.3wonline.com.br
                                        </a>
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <i className="fas fa-info-circle text-violet-600 mr-3 mt-1"></i>
                                        <span>Responderemos todas as solicitações em até 15 dias úteis</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <i className="fas fa-check-circle text-green-600 text-3xl mb-3 block"></i>
                            <p className="text-gray-700">
                                <strong>Seu consentimento:</strong> Ao continuar usando esta ferramenta, você concorda
                                com esta Política de Privacidade e com o uso de cookies conforme descrito.
                            </p>
                        </div>
                        <a
                            href="/"
                            className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Voltar para a página inicial
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
