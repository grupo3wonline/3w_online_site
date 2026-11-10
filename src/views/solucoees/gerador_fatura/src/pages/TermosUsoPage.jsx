import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TermosUsoPage = () => {
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
                            <FileText className="mr-2 h-4 w-4" />
                            Documento Legal
                        </Badge>

                        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Termos de Uso
                        </h1>

                        <Card className="shadow-medium border-0">
                            <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-muted-foreground mb-6">
                                    <strong>Última atualização:</strong> Janeiro de 2026
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
                                <p>
                                    Ao acessar e utilizar o Gerador de Contratos ("Serviço"), você concorda em cumprir
                                    e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte
                                    destes termos, não deverá usar o Serviço.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Descrição do Serviço</h2>
                                <p>
                                    O Gerador de Contratos é uma ferramenta online gratuita que permite a criação de
                                    documentos como notas fiscais, recibos e contratos. O Serviço é fornecido "como está"
                                    e pode ser modificado ou descontinuado a qualquer momento.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Uso Permitido</h2>
                                <p>Você concorda em usar o Serviço apenas para fins legais e de acordo com estes Termos. Você NÃO deve:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Usar o Serviço para criar documentos fraudulentos ou ilegais</li>
                                    <li>Violar qualquer lei ou regulamento aplicável</li>
                                    <li>Interferir ou interromper o funcionamento do Serviço</li>
                                    <li>Tentar acessar áreas não autorizadas do sistema</li>
                                    <li>Usar o Serviço para fins comerciais não autorizados</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Responsabilidades do Usuário</h2>
                                <p>
                                    Você é o único responsável pela veracidade e precisão das informações inseridas
                                    nos documentos gerados. O Gerador de Contratos não verifica nem valida as
                                    informações fornecidas pelo usuário.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propriedade Intelectual</h2>
                                <p>
                                    Todo o conteúdo, design e código do Serviço são de propriedade do Grupo 3W Online.
                                    Você não pode copiar, modificar ou distribuir qualquer parte do Serviço sem
                                    autorização prévia por escrito.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Isenção de Garantias</h2>
                                <p>
                                    O Serviço é fornecido "como está", sem garantias de qualquer tipo, expressas ou
                                    implícitas. Não garantimos que o Serviço será ininterrupto, seguro ou livre de erros.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
                                <p>
                                    Em nenhuma circunstância o Grupo 3W Online será responsável por quaisquer danos
                                    diretos, indiretos, incidentais, especiais ou consequentes decorrentes do uso
                                    ou da incapacidade de usar o Serviço.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Modificações dos Termos</h2>
                                <p>
                                    Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações
                                    entrarão em vigor imediatamente após a publicação. O uso continuado do Serviço
                                    após as modificações constitui aceitação dos novos Termos.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Lei Aplicável</h2>
                                <p>
                                    Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer
                                    disputa será resolvida nos tribunais competentes do Brasil.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contato</h2>
                                <p>
                                    Para dúvidas sobre estes Termos de Uso, entre em contato através da nossa
                                    <Link to="/contato" className="text-primary hover:underline ml-1">página de contato</Link>
                                    ou visite <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.3wonline.com.br</a>.
                                </p>

                                <div className="mt-12 p-6 bg-secondary/30 rounded-xl">
                                    <p className="text-center text-muted-foreground">
                                        <strong>Grupo 3W Online</strong><br />
                                        Desenvolvendo soluções digitais personalizadas<br />
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

export default TermosUsoPage;
