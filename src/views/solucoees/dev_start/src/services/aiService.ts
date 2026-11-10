import type { AIProvider } from '@/types'

const DEFAULT_CONTEXT =
  'Você é um tutor de programação útil para iniciantes. Responda sempre em Português do Brasil, de forma clara e didática.'

/**
 * Consulta um provedor de IA (Gemini, Groq ou OpenRouter) com a chave fornecida
 * pelo usuário. As chaves nunca saem do navegador exceto para a API oficial.
 */
export async function getMultiProviderResponse(
  provider: AIProvider,
  apiKey: string,
  prompt: string,
  context: string = DEFAULT_CONTEXT,
): Promise<string> {
  if (!apiKey) {
    return 'Por favor, configure sua API Key nas configurações (ícone de engrenagem).'
  }

  try {
    if (provider === 'gemini') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${context}\n\nPergunta: ${prompt}` }] }],
          }),
        },
      )
      if (!response.ok) throw new Error(`Gemini: ${response.status} ${response.statusText}`)
      const data = await response.json()
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Não foi possível gerar uma resposta.'
      )
    }

    if (provider === 'groq') {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: context },
            { role: 'user', content: prompt },
          ],
        }),
      })
      if (!response.ok) throw new Error(`Groq: ${response.statusText}`)
      const data = await response.json()
      return data?.choices?.[0]?.message?.content ?? 'Sem resposta da Groq.'
    }

    if (provider === 'openrouter') {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'DevStart Academy',
        },
        body: JSON.stringify({
          model: 'google/gemma-2-9b-it:free',
          messages: [
            { role: 'system', content: context },
            { role: 'user', content: prompt },
          ],
        }),
      })
      if (!response.ok) throw new Error(`OpenRouter: ${response.statusText}`)
      const data = await response.json()
      return data?.choices?.[0]?.message?.content ?? 'Sem resposta do OpenRouter.'
    }

    return 'Provedor não suportado.'
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('AI API Error:', message)
    return `Erro ao conectar com ${provider}. Verifique sua chave de API. Detalhes: ${message}`
  }
}

/** Simula a execução de código (Portugol/VisualG/PHP) usando o provedor configurado. */
export async function simulateCodeExecution(
  provider: AIProvider,
  apiKey: string,
  code: string,
  language: 'portugol' | 'visualg' | 'php',
): Promise<string> {
  if (!apiKey) {
    return 'A simulação via IA requer uma chave de API. Configure-a no Tutor IA (ícone flutuante) para executar o código.'
  }

  let context = ''
  if (language === 'portugol' || language === 'visualg') {
    context =
      'Você é um interpretador da linguagem Portugol/VisualG. Execute o código logicamente e retorne APENAS a saída que apareceria no console. Se houver erros de sintaxe, explique-os brevemente em Português.'
  } else {
    context =
      'Você é um servidor PHP. Execute o código PHP e retorne APENAS a saída HTML/Texto, sem preâmbulos.'
  }

  return getMultiProviderResponse(provider, apiKey, `Código para executar:\n${code}`, context)
}
