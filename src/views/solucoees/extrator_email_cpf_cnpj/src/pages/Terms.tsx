import Breadcrumb from '@/components/Breadcrumb';

const Terms = () => {
    const lastUpdate = '01 de fevereiro de 2026';

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
                <Breadcrumb items={[{ label: 'Termos de Uso' }]} />

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-file-contract text-violet-600 mr-3"></i>
                            Termos de Uso
                        </h1>
                        <p className="text-gray-600">
                            <i className="far fa-calendar-alt mr-2"></i>
                            Última atualização: {lastUpdate}
                        </p>
                    </div>

                    {/* Conteúdo */}
                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                                1. Aceite dos Termos
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Ao acessar e usar o <strong>Extrator de Email, CPF e CNPJ</strong>, você concorda
                                em cumprir e estar sujeito aos seguintes termos e condições de uso. Se você não concordar com
                                qualquer parte destes termos, não deverá usar esta ferramenta.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-tools text-violet-600 mr-3"></i>
                                2. Descrição do Serviço
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                O Extrator de Email, CPF e CNPJ é uma ferramenta gratuita de extração e validação de emails, CPF e CNPJ fornecida
                                "como está". A ferramenta realiza todo o processamento localmente no navegador do usuário,
                                sem enviar ou armazenar dados em servidores externos.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-user-check text-violet-600 mr-3"></i>
                                3. Uso Apropriado
                            </h2>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-4">
                                <p className="text-gray-700 mb-3"><strong>Você concorda em:</strong></p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                        <span>Usar a ferramenta apenas para fins legítimos e legais</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                        <span>Respeitar a privacidade e os direitos de terceiros</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                        <span>Não utilizar a ferramenta para spam ou práticas maliciosas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                                        <span>Cumprir todas as leis aplicáveis, incluindo a LGPD</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-shield-alt text-violet-600 mr-3"></i>
                                4. Privacidade e Segurança dos Dados
                            </h2>
                            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>Processamento Local:</strong> Todos os dados inseridos são processados exclusivamente
                                    no seu navegador. Não coletamos, armazenamos ou transmitimos os dados processados pela ferramenta.
                                    Você é o único responsável pelos dados que insere e processa.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-exclamation-triangle text-violet-600 mr-3"></i>
                                5. Isenção de Responsabilidade
                            </h2>
                            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    A ferramenta é fornecida <strong>"como está"</strong> e <strong>"conforme disponível"</strong>,
                                    sem garantias de qualquer tipo, expressas ou implícitas:
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-yellow-600 mr-3 mt-1"></i>
                                        <span>Não garantimos a precisão absoluta dos resultados</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-yellow-600 mr-3 mt-1"></i>
                                        <span>Não nos responsabilizamos pelo uso indevido da ferramenta</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-chevron-right text-yellow-600 mr-3 mt-1"></i>
                                        <span>Não garantimos disponibilidade ininterrupta do serviço</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-balance-scale text-violet-600 mr-3"></i>
                                6. Limitação de Responsabilidade
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Em nenhuma circunstância o <strong>Grupo 3w Online</strong> ou seus desenvolvedores serão
                                responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos
                                decorrentes do uso ou incapacidade de usar esta ferramenta.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-copyright text-violet-600 mr-3"></i>
                                7. Propriedade Intelectual
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Todo o conteúdo, design, código-fonte e funcionalidades desta ferramenta são de propriedade
                                exclusiva do <strong>Grupo 3w Online</strong> e são protegidos por leis de direitos autorais
                                e outras leis de propriedade intelectual.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-sync-alt text-violet-600 mr-3"></i>
                                8. Modificações
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão
                                em vigor imediatamente após a publicação. É sua responsabilidade revisar periodicamente estes termos.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-gavel text-violet-600 mr-3"></i>
                                9. Lei Aplicável
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Estes termos serão regidos e interpretados de acordo com as leis do Brasil, incluindo a
                                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <i className="fas fa-envelope text-violet-600 mr-3"></i>
                                10. Contato
                            </h2>
                            <div className="bg-violet-50 border-l-4 border-violet-600 p-6 rounded-r-lg">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    Para questões sobre estes Termos de Uso, entre em contato conosco:
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-gray-700">
                                        <i className="fas fa-globe text-violet-600 mr-3"></i>
                                        <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer"
                                            className="text-violet-600 hover:text-violet-700 font-semibold">
                                            www.3wonline.com.br
                                        </a>
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <i className="fas fa-building text-violet-600 mr-3"></i>
                                        <span><strong>Grupo 3w Online</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
                        <p className="text-gray-600 mb-4">
                            <i className="fas fa-check-circle text-green-600 mr-2"></i>
                            Ao usar esta ferramenta, você confirma que leu e concordou com estes Termos de Uso
                        </p>
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

export default Terms;
