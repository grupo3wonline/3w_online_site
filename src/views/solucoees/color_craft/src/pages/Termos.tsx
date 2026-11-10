import Layout from '@/components/Layout';

const Termos = () => {
    return (
        <Layout>
            <div className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                        Termos de Uso
                    </h1>
                    <p className="text-center text-white/90">
                        Última atualização: 03 de Fevereiro de 2026
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-file-contract text-violet-600 mr-3"></i>
                            1. Aceitação dos Termos
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Ao acessar e usar o ColorCraft, você concorda em estar vinculado a estes Termos de Uso.
                            Se você não concordar com qualquer parte destes termos, não deverá usar nosso serviço.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                            2. Descrição do Serviço
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            O ColorCraft é uma ferramenta online gratuita para criação de paletas de cores harmônicas.
                            O serviço é fornecido "como está" e pode ser modificado, suspenso ou descontinuado a qualquer momento.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-user-shield text-violet-600 mr-3"></i>
                            3. Uso Aceitável
                        </h2>
                        <div className="text-gray-600 leading-relaxed mb-6">
                            <p className="mb-3">Você concorda em:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Usar o serviço apenas para fins legais</li>
                                <li>Não tentar hackear, prejudicar ou comprometer a segurança do sistema</li>
                                <li>Não usar o serviço para distribuir malware ou conteúdo malicioso</li>
                                <li>Não sobrecarregar nossos servidores com requisições excessivas</li>
                                <li>Respeitar os direitos de propriedade intelectual</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-copyright text-violet-600 mr-3"></i>
                            4. Propriedade Intelectual
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            O código-fonte, design, logotipo e demais elementos do ColorCraft são propriedade da 3w Online.
                            As paletas de cores geradas por você são de sua propriedade e podem ser usadas livremente em
                            projetos pessoais e comerciais.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-shield-alt text-violet-600 mr-3"></i>
                            5. Privacidade e Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Respeitamos sua privacidade. Todo o processamento de cores é feito localmente no seu navegador.
                            Para mais informações, consulte nossa{' '}
                            <a href="/color_craft/privacidade" className="text-violet-600 hover:text-violet-700 font-semibold underline">
                                Política de Privacidade
                            </a>.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-exclamation-triangle text-violet-600 mr-3"></i>
                            6. Isenção de Garantias
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            O serviço é fornecido "como está" sem garantias de qualquer tipo. Não garantimos que o serviço
                            será ininterrupto, seguro ou livre de erros. Você usa o serviço por sua conta e risco.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-ban text-violet-600 mr-3"></i>
                            7. Limitação de Responsabilidade
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Em hipótese alguma a 3w Online será responsável por danos diretos, indiretos, incidentais,
                            especiais ou consequenciais resultantes do uso ou impossibilidade de uso do serviço.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-edit text-violet-600 mr-3"></i>
                            8. Modificações dos Termos
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão
                            em vigor imediatamente após a publicação. O uso continuado do serviço após as alterações
                            constitui aceitação dos novos termos.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-gavel text-violet-600 mr-3"></i>
                            9. Lei Aplicável
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                            será resolvida nos tribunais competentes de São Paulo, SP.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                            <i className="fas fa-envelope text-violet-600 mr-3"></i>
                            10. Contato
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco:
                        </p>
                        <div className="bg-violet-50 rounded-xl p-6">
                            <p className="text-gray-700 mb-2">
                                <i className="fas fa-envelope text-violet-600 mr-2"></i>
                                <strong>E-mail:</strong> contato@3wonline.com.br
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
                            <p className="text-sm text-gray-600">
                                <strong>Nota:</strong> Ao utilizar o ColorCraft, você declara ter lido, compreendido e
                                concordado com todos os termos e condições aqui estabelecidos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Termos;
