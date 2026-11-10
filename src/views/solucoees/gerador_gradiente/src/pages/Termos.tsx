import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';

const Termos = () => {
    return (
        <Layout>
            <SEO
                title="Termos de Uso - Gerador de Gradiente | 3w Online"
                description="Leia nossos termos de uso e condições de utilização da ferramenta Gerador de Gradiente CSS."
                keywords="termos de uso, condições de uso, legal"
                url="https://app.3wonline.com/gerador_gradiente/termos"
            />

            <div className="container mx-auto px-4 pb-12">
                <Breadcrumb items={[{ label: 'Termos de Uso' }]} />

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
                                <i className="fas fa-file-contract text-white text-2xl"></i>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Termos de Uso
                                </span>
                            </h1>
                            <p className="text text-gray-600">
                                Última atualização: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-info-circle text-indigo-600 mr-2"></i>
                                    1. Termos e Condições Gerais
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Ao acessar e usar o <strong>Gerador de Gradiente CSS</strong> ("Ferramenta"), você concorda com os seguintes termos e condições.
                                    Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa ferramenta.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-shield-alt text-indigo-600 mr-2"></i>
                                    2. Uso Permitido
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    A Ferramenta é fornecida gratuitamente para uso pessoal e comercial. Você está autorizado a:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li>Utilizar a ferramenta para criar gradientes CSS para seus projetos</li>
                                    <li>Copiar e usar o código CSS gerado sem restrições</li>
                                    <li>Compartilhar a ferramenta com outras pessoas</li>
                                    <li>Usar os gradientes criados em projetos pessoais ou comerciais</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-ban text-indigo-600 mr-2"></i>
                                    3. Uso Proibido
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Você não está autorizado a:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                                    <li>Copiar, modificar ou redistribuir o código-fonte da ferramenta</li>
                                    <li>Usar a ferramenta para fins ilegais ou não autorizados</li>
                                    <li>Tentar hackear, sobrecarregar ou comprometer a segurança da ferramenta</li>
                                    <li>Remover créditos ou marcas registradas da 3w Online</li>
                                    <li>Usar a ferramenta de forma que possa danificar, desabilitar ou prejudicar o serviço</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-exclamation-triangle text-indigo-600 mr-2"></i>
                                    4. Isenção de Garantias
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    A Ferramenta é fornecida "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas.
                                    Não garantimos que a ferramenta será ininterrupta, livre de erros ou completamente segura.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-gavel text-indigo-600 mr-2"></i>
                                    5. Limitação de Responsabilidade
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Em nenhuma circunstância a <strong>3w Online</strong> será responsável por quaisquer danos diretos, indiretos, incidentais,
                                    especiais ou consequenciais resultantes do uso ou da incapacidade de usar a Ferramenta.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-copyright text-indigo-600 mr-2"></i>
                                    6. Propriedade Intelectual
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Todo o conteúdo, design, código e materiais da Ferramenta são de propriedade da <strong>3w Online</strong> e protegidos
                                    por leis de direitos autorais e outras leis de propriedade intelectual.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Os gradientes CSS gerados pela ferramenta são de sua propriedade e podem ser usados livremente em seus projetos.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-sync-alt text-indigo-600 mr-2"></i>
                                    7. Alterações nos Termos
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente
                                    após sua publicação. O uso continuado da Ferramenta após as alterações constitui sua aceitação dos novos termos.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-balance-scale text-indigo-600 mr-2"></i>
                                    8. Lei Aplicável
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas
                                    exclusivamente nos tribunais competentes do Brasil.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <i className="fas fa-envelope text-indigo-600 mr-2"></i>
                                    9. Contato
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
                                </p>
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-100">
                                    <p className="font-medium text-gray-800 mb-2">
                                        <i className="fas fa-building text-indigo-600 mr-2"></i>
                                        3w Online
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <i className="fas fa-envelope text-indigo-600 mr-2"></i>
                                        Email: <a href="mailto:contato@3wonline.com.br" className="text-indigo-600 hover:underline">contato@3wonline.com.br</a>
                                    </p>
                                    <p className="text-gray-700">
                                        <i className="fas fa-globe text-indigo-600 mr-2"></i>
                                        Website: <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.3wonline.com.br</a>
                                    </p>
                                </div>
                            </section>

                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white text-center mt-12">
                                <i className="fas fa-check-circle text-4xl mb-4"></i>
                                <p className="text-lg">
                                    Ao usar nossa ferramenta, você concorda com estes Termos de Uso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Termos;
