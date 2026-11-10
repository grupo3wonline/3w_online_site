import React from 'react';
import Layout from '@/components/layout/Layout';
import ColorConverter from '@/components/ColorConverter';
import CTA from '@/components/shared/CTA';

const FerramentaPage = () => {
    return (
        <Layout>
            <div className="min-h-screen py-12 px-4">
                {/* Header Section */}
                <section className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                        Ferramenta de Conversão
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Converta, visualize e manipule cores em tempo real. Suporte para todos os principais formatos de design.
                    </p>
                </section>

                {/* Tool Section */}
                <section className="mb-20 px-2 md:px-0">
                    <ColorConverter />
                </section>

                {/* Tips Section */}
                <section className="max-w-5xl mx-auto mb-20 px-4">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">Dicas de Uso</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-primary">Atalhos e Formatos</h3>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>Você pode colar códigos HEX com ou sem o símbolo #.</li>
                                    <li>Use valores decimais para RGB (0-255).</li>
                                    <li>Clique no ícone de cópia para transferir rapidamente para seu editor de código.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-primary">Acessibilidade</h3>
                                <p className="text-muted-foreground">
                                    Verifique sempre o contraste da cor escolhida contra diferentes fundos.
                                    Cores muito claras podem dificultar a leitura em fundos brancos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <CTA
                    title="Precisa de uma paleta completa?"
                    description="Nossa equipe de design pode criar a identidade visual perfeita para sua marca."
                    buttonText="Fale com um Designer"
                    buttonLink="https://www.3wonline.com.br"
                    secondaryButtonText="Ver Outros Serviços"
                    secondaryButtonLink="/servicos"
                />
            </div>
        </Layout>
    );
};

export default FerramentaPage;
