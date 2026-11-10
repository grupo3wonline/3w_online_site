import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermosDeUsoPage: React.FC = () => {
    const lastUpdate = '15 de Janeiro de 2026';

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-br from-background via-background to-cyan-500/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-6">
                            <i className="fas fa-gavel"></i>
                            Documento Legal
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Termos de{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Uso
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Última atualização: {lastUpdate}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg prose prose-gray dark:prose-invert max-w-none">

                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-8">
                                <p className="text-sm text-muted-foreground m-0">
                                    <i className="fas fa-info-circle text-cyan-500 mr-2"></i>
                                    Ao utilizar o Watermark Wizard, você concorda com os termos e condições descritos neste documento.
                                    Recomendamos a leitura completa antes de usar nossos serviços.
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                                Aceitação dos Termos
                            </h2>
                            <p>
                                Ao acessar e utilizar o Watermark Wizard ("Ferramenta"), você declara ter lido, compreendido
                                e concordado com estes Termos de Uso. Caso não concorde com alguma das condições,
                                solicitamos que não utilize a Ferramenta.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                                Descrição do Serviço
                            </h2>
                            <p>
                                O Watermark Wizard é uma ferramenta online gratuita que permite aos usuários adicionar
                                marcas d'água (texto ou imagem) em suas fotografias e imagens digitais. O serviço é oferecido
                                pelo <strong>Grupo 3W Online</strong>.
                            </p>
                            <p>
                                A Ferramenta realiza todo o processamento localmente no navegador do usuário, sem envio
                                de imagens para servidores externos.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                                Uso Permitido
                            </h2>
                            <p>O usuário compromete-se a utilizar a Ferramenta de forma ética e legal, sendo vedado:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Utilizar para fins ilegais ou que violem direitos de terceiros;</li>
                                <li>Processar imagens que contenham conteúdo ilegal, ofensivo, difamatório ou pornográfico;</li>
                                <li>Tentar acessar, modificar ou interferir no funcionamento da Ferramenta;</li>
                                <li>Utilizar mecanismos automatizados para acessar o serviço;</li>
                                <li>Reproduzir, copiar ou redistribuir a Ferramenta sem autorização.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">4</span>
                                Propriedade Intelectual
                            </h2>
                            <p>
                                Todo o conteúdo da Ferramenta, incluindo código-fonte, design, logotipos, textos e
                                elementos visuais, é de propriedade exclusiva do Grupo 3W Online ou de seus licenciadores,
                                sendo protegido pelas leis de propriedade intelectual aplicáveis.
                            </p>
                            <p>
                                As imagens processadas pelo usuário permanecem de propriedade exclusiva do usuário.
                                O Grupo 3W Online não reivindica qualquer direito sobre o conteúdo processado.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">5</span>
                                Responsabilidades do Usuário
                            </h2>
                            <p>O usuário é inteiramente responsável por:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Garantir que possui os direitos necessários sobre as imagens processadas;</li>
                                <li>O uso que faz das imagens geradas pela Ferramenta;</li>
                                <li>Manter backups de suas imagens originais;</li>
                                <li>Verificar a adequação do resultado antes de utilizar publicamente.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">6</span>
                                Limitação de Responsabilidade
                            </h2>
                            <p>
                                A Ferramenta é fornecida "como está", sem garantias de qualquer natureza, expressas
                                ou implícitas. O Grupo 3W Online não se responsabiliza por:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Danos diretos, indiretos, incidentais ou consequentes decorrentes do uso;</li>
                                <li>Perdas de dados ou interrupções do serviço;</li>
                                <li>Incompatibilidade com determinados navegadores ou dispositivos;</li>
                                <li>Resultados obtidos com o uso da Ferramenta.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">7</span>
                                Disponibilidade
                            </h2>
                            <p>
                                O Grupo 3W Online reserva-se o direito de modificar, suspender ou descontinuar a
                                Ferramenta a qualquer momento, sem aviso prévio, não sendo devida qualquer indenização
                                ao usuário.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">8</span>
                                Alterações nos Termos
                            </h2>
                            <p>
                                Estes Termos de Uso podem ser atualizados periodicamente. Recomendamos que o usuário
                                revise esta página regularmente. O uso continuado da Ferramenta após alterações
                                constitui aceitação dos novos termos.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">9</span>
                                Lei Aplicável e Foro
                            </h2>
                            <p>
                                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
                                Fica eleito o foro da comarca do domicílio do Grupo 3W Online para dirimir quaisquer
                                controvérsias decorrentes deste documento.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">10</span>
                                Contato
                            </h2>
                            <p>
                                Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através da
                                página de <Link to="/contato" className="text-cyan-500 hover:underline">Contato</Link> ou
                                acesse <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">www.3wonline.com.br</a>.
                            </p>

                            <div className="bg-muted/50 border border-border rounded-xl p-6 mt-8">
                                <p className="text-sm text-muted-foreground m-0">
                                    <strong>Grupo 3W Online</strong><br />
                                    Desenvolvimento de Sites e Sistemas Personalizados<br />
                                    <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">www.3wonline.com.br</a>
                                </p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <Link to="/politica-de-privacidade">
                                <Button variant="outline" size="lg">
                                    <i className="fas fa-shield-halved mr-2"></i>
                                    Política de Privacidade
                                </Button>
                            </Link>
                            <Link to="/ferramenta">
                                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                    Usar Ferramenta
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermosDeUsoPage;
