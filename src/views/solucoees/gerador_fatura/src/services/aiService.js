// AI Service - Integração com provedores de IA
// Gemini, Groq e OpenRouter

const AI_ENDPOINTS = {
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    groq: 'https://api.groq.com/openai/v1/chat/completions',
    openrouter: 'https://openrouter.ai/api/v1/chat/completions',
};

const AI_MODELS = {
    gemini: 'gemini-2.0-flash',
    groq: 'llama-3.3-70b-versatile',
    openrouter: 'google/gemma-3n-e2b-it:free',
};

/**
 * Obtém as configurações de IA do localStorage
 */
export const getAISettings = () => {
    try {
        const settings = localStorage.getItem('aiProviderSettings');
        if (settings) {
            return JSON.parse(settings);
        }
    } catch (error) {
        console.error('Erro ao carregar configurações de IA:', error);
    }
    return null;
};

/**
 * Verifica se um provedor está configurado
 */
export const isProviderConfigured = (provider) => {
    const settings = getAISettings();
    return settings?.providers?.[provider]?.apiKey?.length > 0;
};

/**
 * Obtém o provedor ativo
 */
export const getActiveProvider = () => {
    const settings = getAISettings();
    return settings?.activeProvider || 'gemini';
};

/**
 * Chama a API do Google Gemini
 */
export const callGemini = async (prompt, apiKey) => {
    const response = await fetch(`${AI_ENDPOINTS.gemini}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt,
                }],
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erro ao chamar Gemini API');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
};

/**
 * Chama a API do Groq
 */
export const callGroq = async (prompt, apiKey) => {
    const response = await fetch(AI_ENDPOINTS.groq, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: AI_MODELS.groq,
            messages: [{
                role: 'user',
                content: prompt,
            }],
            temperature: 0.7,
            max_tokens: 2048,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erro ao chamar Groq API');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
};

/**
 * Chama a API do OpenRouter
 */
export const callOpenRouter = async (prompt, apiKey) => {
    const response = await fetch(AI_ENDPOINTS.openrouter, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Calculadora Aluguel Fácil',
        },
        body: JSON.stringify({
            model: AI_MODELS.openrouter,
            messages: [{
                role: 'user',
                content: prompt,
            }],
            temperature: 0.7,
            max_tokens: 2048,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erro ao chamar OpenRouter API');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
};

/**
 * Chama o provedor de IA ativo
 */
export const callAI = async (prompt) => {
    const settings = getAISettings();

    if (!settings) {
        throw new Error('Nenhuma configuração de IA encontrada. Configure um provedor primeiro.');
    }

    const provider = settings.activeProvider;
    const apiKey = settings.providers?.[provider]?.apiKey;

    if (!apiKey) {
        throw new Error(`Chave de API não configurada para ${provider}. Configure nas configurações.`);
    }

    switch (provider) {
        case 'gemini':
            return callGemini(prompt, apiKey);
        case 'groq':
            return callGroq(prompt, apiKey);
        case 'openrouter':
            return callOpenRouter(prompt, apiKey);
        default:
            throw new Error(`Provedor desconhecido: ${provider}`);
    }
};

/**
 * Gera sugestões de notas fiscais usando IA
 */
export const generateInvoiceSuggestion = async (context) => {
    const prompt = `Você é um assistente especializado em geração de notas fiscais e recibos. 
Com base no seguinte contexto, gere uma sugestão de nota ou observação profissional para incluir no documento:

Contexto: ${JSON.stringify(context)}

Responda apenas com a sugestão de texto, sem explicações adicionais. O texto deve ser profissional e em português brasileiro.`;

    return callAI(prompt);
};

export default {
    callAI,
    callGemini,
    callGroq,
    callOpenRouter,
    getAISettings,
    getActiveProvider,
    isProviderConfigured,
    generateInvoiceSuggestion,
};
