import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PoliticaDePrivacidadePage: React.FC = () => {
    const lastUpdate = '15 de Janeiro de 2026';

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-br from-background via-background to-cyan-500/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-500 mb-6">
                            <i className="fas fa-shield-halved"></i>
                            Conformidade LGPD
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Política de{' '}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Privacidade
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
                                    <i className="fas fa-lock text-cyan-500 mr-2"></i>
                                    Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações
                                    em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                                Informações Gerais
                            </h2>
                            <p>
                                O <strong>Watermark Wizard</strong> é uma ferramenta online desenvolvida e mantida pelo
                                <strong> Grupo 3W Online</strong>, que atua como controlador dos dados pessoais coletados
                                através desta plataforma.
                            </p>
                            <p>
                                Comprometemo-nos a proteger sua privacidade e garantir a segurança de seus dados pessoais,
                                em conformidade com a legislação brasileira de proteção de dados.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                                Dados Coletados
                            </h2>
                            <p>
                                O Watermark Wizard foi projetado para coletar o mínimo de dados necessários.
                                <strong> Suas imagens são processadas localmente no seu navegador e NUNCA são enviadas
                                    para nossos servidores.</strong>
                            </p>
                            <p>Podemos coletar os seguintes tipos de informações:</p>

                            <h3 className="text-lg font-semibold mt-6 mb-3">2.1. Dados Coletados Automaticamente</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Cookies:</strong> Utilizamos cookies para melhorar sua experiência, lembrar suas preferências (como tema escuro/claro) e realizar análises de uso;</li>
                                <li><strong>Dados de Navegação:</strong> Informações como páginas visitadas, tempo de permanência, tipo de navegador e sistema operacional;</li>
                                <li><strong>Endereço IP:</strong> Coletado para fins de segurança e análise geográfica agregada.</li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-3">2.2. Dados Fornecidos pelo Usuário</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Formulário de Contato:</strong> Nome, e-mail e mensagem quando você nos contata através do formulário;</li>
                                <li><strong>Preferências:</strong> Configurações de tema e consentimento de cookies.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                                Finalidade do Tratamento
                            </h2>
                            <p>Os dados coletados são utilizados para as seguintes finalidades:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Fornecer e melhorar nossos serviços;</li>
                                <li>Personalizar sua experiência de uso;</li>
                                <li>Analisar o uso da plataforma para melhorias;</li>
                                <li>Responder às suas solicitações e dúvidas;</li>
                                <li>Cumprir obrigações legais.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">4</span>
                                Base Legal
                            </h2>
                            <p>O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais (Art. 7º da LGPD):</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Consentimento:</strong> Para cookies não essenciais e comunicações de marketing;</li>
                                <li><strong>Legítimo Interesse:</strong> Para análises de uso e melhorias da plataforma;</li>
                                <li><strong>Cumprimento de Obrigação Legal:</strong> Quando exigido por lei.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">5</span>
                                Compartilhamento de Dados
                            </h2>
                            <p>
                                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
                                comerciais. Podemos compartilhar informações apenas nas seguintes situações:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Prestadores de Serviço:</strong> Google Analytics, para análise de tráfego;</li>
                                <li><strong>Obrigação Legal:</strong> Quando exigido por lei ou ordem judicial;</li>
                                <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">6</span>
                                Cookies
                            </h2>
                            <p>Utilizamos os seguintes tipos de cookies:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Essenciais:</strong> Necessários para o funcionamento básico do site;</li>
                                <li><strong>Preferências:</strong> Armazenam suas configurações (tema, idioma);</li>
                                <li><strong>Análise:</strong> Google Analytics para entender como você usa o site.</li>
                            </ul>
                            <p>
                                Você pode gerenciar suas preferências de cookies através do banner exibido no primeiro
                                acesso ou nas configurações do seu navegador.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">7</span>
                                Seus Direitos (LGPD)
                            </h2>
                            <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los;</li>
                                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos ou desatualizados;</li>
                                <li><strong>Anonimização/Bloqueio/Eliminação:</strong> Solicitar tratamento de dados desnecessários;</li>
                                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado;</li>
                                <li><strong>Revogação do Consentimento:</strong> Retirar consentimento a qualquer momento;</li>
                                <li><strong>Oposição:</strong> Opor-se ao tratamento em determinadas situações;</li>
                                <li><strong>Informação:</strong> Ser informado sobre compartilhamento de dados.</li>
                            </ul>
                            <p>
                                Para exercer qualquer desses direitos, entre em contato através da nossa página de{' '}
                                <Link to="/contato" className="text-cyan-500 hover:underline">Contato</Link>.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">8</span>
                                Segurança
                            </h2>
                            <p>
                                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados
                                contra acessos não autorizados, alteração, divulgação ou destruição. Entre as medidas adotadas:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Processamento local de imagens (não enviadas a servidores);</li>
                                <li>Conexão segura via HTTPS;</li>
                                <li>Acesso restrito a dados pessoais.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">9</span>
                                Retenção de Dados
                            </h2>
                            <p>
                                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades
                                descritas nesta política, exceto quando a retenção for exigida por lei.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">10</span>
                                Alterações
                            </h2>
                            <p>
                                Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você
                                revise esta página regularmente para estar ciente de eventuais mudanças.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">11</span>
                                Contato e Encarregado de Dados
                            </h2>
                            <p>
                                Para dúvidas, solicitações ou exercício de seus direitos relacionados à privacidade,
                                entre em contato conosco:
                            </p>
                            <div className="bg-muted/50 border border-border rounded-xl p-6 mt-4">
                                <p className="text-sm text-muted-foreground m-0">
                                    <strong>Grupo 3W Online</strong><br />
                                    Controlador de Dados<br />
                                    Website: <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">www.3wonline.com.br</a><br />
                                    Contato: <Link to="/contato" className="text-cyan-500 hover:underline">Formulário de Contato</Link>
                                </p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <Link to="/termos-de-uso">
                                <Button variant="outline" size="lg">
                                    <i className="fas fa-gavel mr-2"></i>
                                    Termos de Uso
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

export default PoliticaDePrivacidadePage;
