import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const Privacy = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Política de Privacidade', path: '/privacidade' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-100">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Política de Privacidade
                            </h1>
                            <p className="text-gray-600">
                                Última atualização: <strong>01 de Fevereiro de 2026</strong>
                            </p>
                            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-100 rounded-full">
                                <i className="fas fa-shield-alt text-green-600"></i>
                                <span className="text-green-700 font-semibold">100% Conforme LGPD</span>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-user-shield text-purple-600"></i>
                                    1. Introdução
                                </h2>
                                <p>
                                    O <strong>Planejador de Casamento</strong>, desenvolvido por <strong>3w Online</strong>, está comprometido com a proteção da sua privacidade. Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-database text-purple-600"></i>
                                    2. Dados Coletados
                                </h2>
                                <p className="mb-4">Coletamos as seguintes categorias de dados:</p>
                                <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                                    <div>
                                        <h4 className="font-bold text-purple-800 mb-2">
                                            <i className="fas fa-check-circle mr-2"></i>Dados Fornecidos Voluntariamente:
                                        </h4>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Informações do evento (data, local, número de convidados)</li>
                                            <li>Dados de contato (quando utiliza formulários)</li>
                                            <li>Preferências e configurações do planejamento</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-800 mb-2">
                                            <i className="fas fa-chart-line mr-2"></i>Dados Coletados Automaticamente:
                                        </h4>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Endereço IP e localização aproximada</li>
                                            <li>Tipo de navegador e dispositivo</li>
                                            <li>Páginas visitadas e tempo de permanência</li>
                                            <li>Cookies e tecnologias similares</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-bullseye text-purple-600"></i>
                                    3. Finalidade do Tratamento
                                </h2>
                                <p className="mb-4">Utilizamos seus dados para:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Fornecer e melhorar nossos serviços</li>
                                    <li>Personalizar sua experiência de uso</li>
                                    <li>Realizar análises estatísticas e de desempenho</li>
                                    <li>Comunicar atualizações e novidades (mediante consentimento)</li>
                                    <li>Cumprir obrigações legais e regulatórias</li>
                                    <li>Prevenir fraudes e garantir a segurança da plataforma</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-cookie-bite text-purple-600"></i>
                                    4. Cookies e Tecnologias Similares
                                </h2>
                                <p className="mb-4">Utilizamos cookies para:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { type: 'Essenciais', desc: 'Necessários para funcionamento básico', icon: 'fa-cog' },
                                        { type: 'Analíticos', desc: 'Google Analytics 4 e GTM', icon: 'fa-chart-bar' },
                                        { type: 'Preferências', desc: 'Salvam suas configurações', icon: 'fa-sliders-h' },
                                        { type: 'Marketing', desc: 'Melhoram experiência (opcional)', icon: 'fa-bullhorn' }
                                    ].map((cookie, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-lg border border-purple-100">
                                            <div className="flex items-start gap-3">
                                                <i className={`fas ${cookie.icon} text-purple-500 mt-1`}></i>
                                                <div>
                                                    <h5 className="font-bold text-gray-800">{cookie.type}</h5>
                                                    <p className="text-sm text-gray-600">{cookie.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-share-alt text-purple-600"></i>
                                    5. Compartilhamento de Dados
                                </h2>
                                <p className="mb-4">
                                    Seus dados <strong>NÃO</strong> são vendidos. Compartilhamos apenas quando:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Necessário para fornecer os serviços (ex: Google Analytics)</li>
                                    <li>Exigido por lei ou autoridades competentes</li>
                                    <li>Com seu consentimento explícito</li>
                                    <li>Para proteção de direitos e segurança</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-users-cog text-purple-600"></i>
                                    6. Seus Direitos (LGPD)
                                </h2>
                                <p className="mb-4">De acordo com a LGPD, você tem direito a:</p>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { right: 'Confirmação', desc: 'Se seus dados estão sendo tratados' },
                                            { right: 'Acesso', desc: 'Consultar seus dados armazenados' },
                                            { right: 'Correção', desc: 'Atualizar dados incompletos ou incorretos' },
                                            { right: 'Anonimização', desc: 'Tornar dados anônimos' },
                                            { right: 'Portabilidade', desc: 'Transferir dados para outro fornecedor' },
                                            { right: 'Eliminação', desc: 'Excluir dados desnecessários' },
                                            { right: 'Revogação', desc: 'Retirar consentimento a qualquer momento' },
                                            { right: 'Oposição', desc: 'Opor-se ao tratamento de dados' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <i className="fas fa-check text-green-500 mt-1"></i>
                                                <div>
                                                    <strong className="text-gray-800">{item.right}:</strong>
                                                    <span className="text-gray-600 text-sm ml-1">{item.desc}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm">
                                    Para exercer qualquer desses direitos, entre em contato através da nossa{' '}
                                    <a href="/planejador_casamento/contato" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                        página de contato
                                    </a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-lock text-purple-600"></i>
                                    7. Segurança dos Dados
                                </h2>
                                <p>
                                    Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, controles de acesso e monitoramento contínuo.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-clock text-purple-600"></i>
                                    8. Retenção de Dados
                                </h2>
                                <p>
                                    Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas, salvo se um período de retenção mais longo for exigido ou permitido por lei.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-baby text-purple-600"></i>
                                    9. Menores de Idade
                                </h2>
                                <p>
                                    Nosso serviço não é direcionado a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se tomarmos conhecimento de coleta inadvertida, os dados serão excluídos imediatamente.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-edit text-purple-600"></i>
                                    10. Alterações na Política
                                </h2>
                                <p>
                                    Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas através do site. Recomendamos revisar esta página regularmente.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-envelope text-purple-600"></i>
                                    11. Contato - Encarregado de Dados (DPO)
                                </h2>
                                <div className="bg-purple-50 p-6 rounded-xl">
                                    <p className="mb-4">
                                        Para questões sobre privacidade ou para exercer seus direitos:
                                    </p>
                                    <div className="space-y-2">
                                        <p><strong>Empresa:</strong> 3w Online</p>
                                        <p><strong>Email:</strong> privacidade@3wonline.com.br</p>
                                        <p>
                                            <strong>Formulário:</strong>{' '}
                                            <a href="/planejador_casamento/contato" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                                Página de Contato
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border border-green-200">
                            <div className="flex items-start gap-4">
                                <i className="fas fa-shield-alt text-green-600 text-3xl mt-1"></i>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2 text-xl">Seu Controle, Sua Privacidade</h3>
                                    <p className="text-gray-700 mb-4">
                                        Respeitamos sua privacidade e estamos comprometidos com a proteção dos seus dados pessoais.
                                        Você tem total controle sobre suas informações.
                                    </p>
                                    <a
                                        href="/planejador_casamento/contato"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Exercer Meus Direitos
                                        <i className="fas fa-user-shield"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default Privacy;
