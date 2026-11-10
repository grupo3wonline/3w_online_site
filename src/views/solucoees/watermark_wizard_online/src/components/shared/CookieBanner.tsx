import React from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CookieBanner: React.FC = () => {
    const { showBanner, acceptCookies, rejectCookies } = useCookieConsent();

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="container mx-auto">
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto backdrop-blur-xl">
                    <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-cookie-bite text-white text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                    Sua Privacidade é Importante
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo
                                    e analisar nosso tráfego. Ao clicar em "Aceitar", você concorda com o uso de cookies
                                    conforme nossa{' '}
                                    <Link
                                        to="/politica-de-privacidade"
                                        className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                                    >
                                        Política de Privacidade
                                    </Link>
                                    {' '}e{' '}
                                    <Link
                                        to="/termos-de-uso"
                                        className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                                    >
                                        Termos de Uso
                                    </Link>.
                                </p>
                            </div>
                        </div>

                        {/* LGPD Info */}
                        <div className="bg-muted/50 rounded-xl p-4 border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-shield-halved text-cyan-500"></i>
                                <span className="text-sm font-medium text-foreground">Conformidade LGPD</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018),
                                garantimos seus direitos de acesso, retificação e exclusão de dados. Suas imagens
                                são processadas localmente e não são armazenadas em nossos servidores.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                                onClick={acceptCookies}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-cyan-500/25"
                            >
                                <i className="fas fa-check mr-2"></i>
                                Aceitar Todos
                            </Button>
                            <Button
                                onClick={rejectCookies}
                                variant="outline"
                                className="flex-1 border-border hover:bg-muted"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Apenas Essenciais
                            </Button>
                            <Link to="/politica-de-privacidade" className="flex-1">
                                <Button
                                    variant="ghost"
                                    className="w-full text-muted-foreground hover:text-foreground"
                                >
                                    <i className="fas fa-cog mr-2"></i>
                                    Configurar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
