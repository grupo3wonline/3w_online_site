import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PoliticaPrivacidadePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
            <Header />

            <main className="flex-1">
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <Link to="/">
                            <Button variant="ghost" className="mb-6">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar ao Início
                            </Button>
                        </Link>

                        <Badge variant="secondary" className="mb-6 px-4 py-2">
                            <Shield className="mr-2 h-4 w-4" />
                            Conformidade LGPD
                        </Badge>

                        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Política de Privacidade
                        </h1>

                        <Card className="shadow-medium border-0">
                            <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-muted-foreground mb-6">
                                    <strong>Última atualização:</strong> Janeiro de 2026
                                </p>

                                <p className="text-lg">
                                    Esta Política de Privacidade descreve como o Gerador de Contratos coleta, usa e
                                    protege suas informações pessoais em conformidade com a Lei Geral de Proteção de
                                    Dados (LGPD - Lei nº 13.709/2018).
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Dados Coletados</h2>
                                <p>O Gerador de Contratos pode coletar os seguintes tipos de dados:</p>

                                <h3 className="text-xl font-medium mt-6 mb-3">1.1 Dados Fornecidos pelo Usuário</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Informações inseridas nos formulários de geração de documentos</li>
                                    <li>Dados de empresa (nome, endereço, telefone, CNPJ)</li>
                                    <li>Dados de clientes para documentos</li>
                                    <li>Informações de itens e valores</li>
                                </ul>

                                <h3 className="text-xl font-medium mt-6 mb-3">1.2 Dados Coletados Automaticamente</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
                                    <li>Informações do dispositivo (tipo, navegador, sistema operacional)</li>
                                    <li>Endereço IP e localização aproximada</li>
                                    <li>Cookies e tecnologias similares</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Como Usamos seus Dados</h2>
                                <p>Utilizamos seus dados para:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Fornecer o Serviço:</strong> Gerar documentos conforme suas solicitações</li>
                                    <li><strong>Melhorar a Experiência:</strong> Salvar preferências localmente no navegador</li>
                                    <li><strong>Análises:</strong> Compreender como o serviço é utilizado (Google Analytics)</li>
                                    <li><strong>Segurança:</strong> Proteger contra uso indevido e fraudes</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Armazenamento de Dados</h2>
                                <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900">
                                    <p className="text-green-800 dark:text-green-200 font-medium">
                                        🔒 <strong>Importante:</strong> Todos os dados de documentos são processados e
                                        armazenados LOCALMENTE no seu navegador (localStorage). Nenhum dado de documento
                                        é enviado para nossos servidores.
                                    </p>
                                </div>
                                <p className="mt-4">
                                    Os únicos dados transmitidos para servidores externos são dados anônimos de
                                    análise (Google Analytics) para fins estatísticos.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
                                <p>Utilizamos cookies para:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Cookies Necessários:</strong> Funcionamento básico do site</li>
                                    <li><strong>Cookies de Análise:</strong> Google Analytics para estatísticas de uso</li>
                                    <li><strong>Cookies de Preferências:</strong> Salvar configurações como tema (claro/escuro)</li>
                                </ul>
                                <p className="mt-4">
                                    Você pode gerenciar suas preferências de cookies através do banner exibido no site.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Seus Direitos (LGPD)</h2>
                                <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</li>
                                    <li><strong>Correção:</strong> Corrigir dados incompletos ou desatualizados</li>
                                    <li><strong>Exclusão:</strong> Solicitar a eliminação de seus dados pessoais</li>
                                    <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                                    <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                                    <li><strong>Oposição:</strong> Opor-se ao tratamento de dados</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Como Exercer seus Direitos</h2>
                                <p>
                                    Para exercer qualquer um dos direitos acima, você pode:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Limpar os dados locais através das configurações do seu navegador</li>
                                    <li>Desativar cookies nas configurações do navegador</li>
                                    <li>Entrar em contato conosco através da <Link to="/contato" className="text-primary hover:underline">página de contato</Link></li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Segurança</h2>
                                <p>
                                    Implementamos medidas técnicas e organizacionais apropriadas para proteger seus
                                    dados, incluindo:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Processamento local de dados sensíveis</li>
                                    <li>Conexão segura via HTTPS</li>
                                    <li>Sem armazenamento de dados de documentos em servidores externos</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Compartilhamento de Dados</h2>
                                <p>
                                    Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para
                                    fins de marketing. Dados anônimos de análise podem ser compartilhados com:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Google Analytics (análises de uso)</li>
                                    <li>Google Tag Manager (gestão de tags)</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Alterações nesta Política</h2>
                                <p>
                                    Podemos atualizar esta Política periodicamente. Alterações significativas serão
                                    notificadas através do site. Recomendamos revisar esta página regularmente.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contato do Encarregado (DPO)</h2>
                                <p>
                                    Para questões relacionadas à proteção de dados, entre em contato:
                                </p>
                                <ul className="list-none space-y-2 mt-4">
                                    <li><strong>Empresa:</strong> Grupo 3W Online</li>
                                    <li><strong>Website:</strong> <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.3wonline.com.br</a></li>
                                    <li><strong>Contato:</strong> <Link to="/contato" className="text-primary hover:underline">Página de Contato</Link></li>
                                </ul>

                                <div className="mt-12 p-6 bg-secondary/30 rounded-xl">
                                    <p className="text-center text-muted-foreground">
                                        <strong>Grupo 3W Online</strong><br />
                                        Comprometidos com a proteção dos seus dados<br />
                                        <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            www.3wonline.com.br
                                        </a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PoliticaPrivacidadePage;
