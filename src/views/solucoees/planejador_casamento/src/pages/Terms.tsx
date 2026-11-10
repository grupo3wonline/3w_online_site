import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';

const Terms = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Termos de Uso', path: '/termos' }
    ];

    const lastUpdate = '01 de Fevereiro de 2026';

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-100">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Termos de Uso
                            </h1>
                            <p className="text-gray-600">
                                Última atualização: <strong>{lastUpdate}</strong>
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-file-contract text-purple-600"></i>
                                    1. Aceitação dos Termos
                                </h2>
                                <p className="leading-relaxed">
                                    Ao acessar e usar o <strong>Planejador de Casamento</strong>, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concorda com qualquer parte destes termos, não deve usar este serviço.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-user-check text-purple-600"></i>
                                    2. Uso do Serviço
                                </h2>
                                <p className="leading-relaxed mb-4">
                                    O Planejador de Casamento é fornecido gratuitamente para uso pessoal e não comercial. Você concorda em:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Usar o serviço apenas para fins legais e legítimos</li>
                                    <li>Não tentar interferir no funcionamento adequado do serviço</li>
                                    <li>Não copiar, modificar ou distribuir o código-fonte sem autorização</li>
                                    <li>Não usar o serviço de forma que possa danificar ou sobrecarregar nossos sistemas</li>
                                    <li>Fornecer informações verdadeiras quando solicitado</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-purple-600"></i>
                                    3. Propriedade Intelectual
                                </h2>
                                <p className="leading-relaxed">
                                    Todo o conteúdo, design, interface, código e funcionalidades do Planejador de Casamento são de propriedade exclusiva da <strong>3w Online</strong> e estão protegidos por leis de direitos autorais, marcas registradas e outros direitos de propriedade intelectual.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-database text-purple-600"></i>
                                    4. Dados e Privacidade
                                </h2>
                                <p className="leading-relaxed mb-4">
                                    A coleta e uso de seus dados estão descritos em nossa{' '}
                                    <a href="/planejador_casamento/privacidade" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                        Política de Privacidade
                                    </a>
                                    . Ao usar este serviço, você concorda com:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>O processamento local dos seus dados sempre que possível</li>
                                    <li>O uso de cookies e tecnologias similares conforme descrito</li>
                                    <li>A coleta de dados analíticos anônimos para melhoria do serviço</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-exclamation-triangle text-purple-600"></i>
                                    5. Isenção de Garantias
                                </h2>
                                <p className="leading-relaxed">
                                    O serviço é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                    <li>O serviço estará sempre disponível e livre de erros</li>
                                    <li>Os cálculos e estimativas serão 100% precisos para sua região</li>
                                    <li>As informações fornecidas substituem aconselhamento profissional</li>
                                    <li>Defeitos serão corrigidos imediatamente</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-balance-scale text-purple-600"></i>
                                    6. Limitação de Responsabilidade
                                </h2>
                                <p className="leading-relaxed">
                                    Em nenhuma circunstância a <strong>3w Online</strong> ou seus desenvolvedores serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de usar este serviço.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-edit text-purple-600"></i>
                                    7. Modificações dos Termos
                                </h2>
                                <p className="leading-relaxed">
                                    Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após sua publicação. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-gavel text-purple-600"></i>
                                    8. Lei Aplicável
                                </h2>
                                <p className="leading-relaxed">
                                    Estes termos serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-envelope text-purple-600"></i>
                                    9. Contato
                                </h2>
                                <p className="leading-relaxed">
                                    Para questões sobre estes Termos de Uso, entre em contato através da nossa{' '}
                                    <a href="/planejador_casamento/contato" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                        página de contato
                                    </a>
                                    .
                                </p>
                            </section>
                        </div>

                        {/* CTA Box */}
                        <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                            <div className="flex items-start gap-4">
                                <i className="fas fa-info-circle text-purple-600 text-2xl mt-1"></i>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Dúvidas sobre os Termos?</h3>
                                    <p className="text-gray-700 mb-4">
                                        Nossa equipe está pronta para esclarecer qualquer questão sobre nossos termos de uso.
                                    </p>
                                    <a
                                        href="/planejador_casamento/contato"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Fale Conosco
                                        <i className="fas fa-arrow-right"></i>
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

export default Terms;
