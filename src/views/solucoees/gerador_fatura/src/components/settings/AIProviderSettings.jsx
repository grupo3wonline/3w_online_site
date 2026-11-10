import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Key,
    Save,
    Eye,
    EyeOff,
    Check,
    AlertCircle,
    Sparkles,
    Trash2,
    HelpCircle
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from 'sweetalert2';

const AIProviderSettings = ({ onClose }) => {
    const [providers, setProviders] = useState({
        gemini: { apiKey: '', enabled: false },
        groq: { apiKey: '', enabled: false },
        openrouter: { apiKey: '', enabled: false },
    });
    const [activeProvider, setActiveProvider] = useState('gemini');
    const [showKeys, setShowKeys] = useState({
        gemini: false,
        groq: false,
        openrouter: false,
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('aiProviderSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setProviders(parsed.providers || providers);
            setActiveProvider(parsed.activeProvider || 'gemini');
        }
    }, []);

    const handleSave = () => {
        const settings = {
            providers,
            activeProvider,
        };
        localStorage.setItem('aiProviderSettings', JSON.stringify(settings));

        Swal.fire({
            icon: 'success',
            title: 'Configurações Salvas!',
            text: 'Suas chaves de API foram salvas com sucesso.',
            confirmButtonColor: '#7c3aed',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    const handleClearKey = (provider) => {
        Swal.fire({
            title: 'Remover Chave?',
            text: `Deseja remover a chave de API do ${provider.toUpperCase()}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                setProviders({
                    ...providers,
                    [provider]: { apiKey: '', enabled: false },
                });
            }
        });
    };

    const providerInfo = {
        gemini: {
            name: 'Google Gemini',
            model: 'gemini-2.0-flash',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            color: 'from-blue-500 to-blue-600',
            description: 'IA do Google com alta capacidade de raciocínio',
        },
        groq: {
            name: 'Groq',
            model: 'llama-3.3-70b-versatile',
            endpoint: 'https://api.groq.com/openai/v1/chat/completions',
            color: 'from-orange-500 to-orange-600',
            description: 'Inferência ultra-rápida com modelos Llama',
        },
        openrouter: {
            name: 'OpenRouter',
            model: 'google/gemma-3n-e2b-it:free',
            endpoint: 'https://openrouter.ai/api/v1/chat/completions',
            color: 'from-green-500 to-green-600',
            description: 'Gateway para múltiplos modelos de IA',
        },
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-strong border-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-primary" />
                            Configurações de Provedores de IA
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Configure suas chaves de API para utilizar recursos de inteligência artificial
                        </CardDescription>
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                            <p>Suas chaves são armazenadas localmente no navegador e nunca são enviadas para nossos servidores.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Provider Selection */}
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(providerInfo).map(([key, info]) => (
                        <button
                            key={key}
                            onClick={() => setActiveProvider(key)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${activeProvider === key
                                    ? 'border-primary bg-primary/5 shadow-medium'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center mb-2`}>
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <p className="font-medium text-sm">{info.name}</p>
                            {providers[key].apiKey && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                    <Check className="h-3 w-3 mr-1" />
                                    Configurado
                                </Badge>
                            )}
                        </button>
                    ))}
                </div>

                {/* Active Provider Config */}
                <div className="p-4 bg-secondary/30 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold">{providerInfo[activeProvider].name}</h4>
                            <p className="text-sm text-muted-foreground">{providerInfo[activeProvider].description}</p>
                        </div>
                        <Badge variant="outline">
                            Modelo: {providerInfo[activeProvider].model}
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Chave de API</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type={showKeys[activeProvider] ? 'text' : 'password'}
                                    value={providers[activeProvider].apiKey}
                                    onChange={(e) => setProviders({
                                        ...providers,
                                        [activeProvider]: { ...providers[activeProvider], apiKey: e.target.value },
                                    })}
                                    placeholder={`Cole sua chave de API do ${providerInfo[activeProvider].name}`}
                                    className="w-full px-4 py-3 border rounded-lg bg-background pr-24"
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKeys({ ...showKeys, [activeProvider]: !showKeys[activeProvider] })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showKeys[activeProvider] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {providers[activeProvider].apiKey && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleClearKey(activeProvider)}
                                    className="shrink-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-muted-foreground">Endpoint:</span>
                        </div>
                        <code className="text-xs bg-secondary px-2 py-1 rounded">
                            {providerInfo[activeProvider].endpoint.slice(0, 40)}...
                        </code>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    {onClose && (
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                    )}
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Configurações
                    </Button>
                </div>

                {/* Security Notice */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>🔒 Suas chaves são armazenadas apenas localmente em seu navegador.</p>
                    <p>Nenhuma informação é enviada para servidores externos.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIProviderSettings;
