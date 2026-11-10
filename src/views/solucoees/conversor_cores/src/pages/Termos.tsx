import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';
import CTA from '@/components/shared/CTA';

const TermosDeUsoPage = () => {
    return (
        <Layout>
            <div className="min-h-screen py-12 px-4">
                {/* Header Section */}
                <section className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
                        <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                        Termos de Uso
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Regras e diretrizes para o uso de nossos serviços
                    </p>
                </section>

                {/* Content Section */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" />
                                1. Aceitação dos Termos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            <p>
                                Ao acessar e usar este site, você aceita e concorda em estar vinculado aos termos e disposições deste acordo.
                                Além disso, ao usar os serviços particulares deste site, você deve estar ciente de que todas as diretrizes e regras aplicáveis a tais serviços podem ser publicadas.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                2. Uso da Licença
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Conversor de Cores, apenas para visualização transitória pessoal e não comercial.
                            </p>
                            <p>Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Modificar ou copiar os materiais;</li>
                                <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                                <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Conversor de Cores;</li>
                                <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                3. Isenção de Responsabilidade
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            <p>
                                Os materiais no site da Conversor de Cores são fornecidos "como estão". Conversor de Cores não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <CTA
                    title="Ficou com alguma dúvida?"
                    description="Nossa equipe está pronta para esclarecer qualquer questão sobre nossos termos de uso."
                    buttonText="Entrar em Contato"
                    buttonLink="/contato"
                    secondaryButtonText=""
                />
            </div>
        </Layout>
    );
};

export default TermosDeUsoPage;
