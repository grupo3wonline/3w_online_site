import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, UserCheck, Lock } from 'lucide-react';
import CTA from '@/components/shared/CTA';

const PoliticaPage = () => {
    return (
        <Layout>
            <div className="min-h-screen py-12 px-4">
                {/* Header Section */}
                <section className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                        Política de Privacidade
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Transparência total sobre como tratamos seus dados
                    </p>
                </section>

                {/* Content Section */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="glass-card hover-lift">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="w-5 h-5 text-primary" />
                                    Coleta de Dados
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    Coletamos apenas as informações necessárias para melhorar sua experiência.
                                    Isso pode incluir dados técnicos de navegação (como endereço IP e tipo de navegador)
                                    e informações que você fornece voluntariamente ao entrar em contato conosco.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="glass-card hover-lift">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-primary" />
                                    Uso das Informações
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    Utilizamos seus dados para:
                                    <br />• Personalizar sua experiência no site
                                    <br />• Melhorar nossos serviços e funcionalidades
                                    <br />• Responder a suas solicitações de suporte
                                    <br />• Analisar métricas de desempenho (de forma anônima)
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-primary" />
                                Seus Direitos (LGPD)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Confirmar a existência de tratamento de dados",
                                    "Acessar seus dados pessoais",
                                    "Corrigir dados incompletos ou desatualizados",
                                    "Solicitar a anonimização ou bloqueio",
                                    "Solicitar a portabilidade dos dados",
                                    "Revogar seu consentimento a qualquer momento"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 bg-secondary/30 p-3 rounded-lg border border-border/50">
                                        <CheckCircleIcon />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                Segurança dos Dados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            <p>
                                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais
                                contra acesso não autorizado, perda ou alteração. Utilizamos criptografia e protocolos seguros
                                em todas as comunicações.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <CTA
                    title="Preocupado com seus dados?"
                    description="Entre em contato com nosso Encarregado de Proteção de Dados (DPO) para tirar suas dúvidas."
                    buttonText="Falar com DPO"
                    buttonLink="/contato"
                    secondaryButtonText=""
                />
            </div>
        </Layout>
    );
};

const CheckCircleIcon = () => (
    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default PoliticaPage;
