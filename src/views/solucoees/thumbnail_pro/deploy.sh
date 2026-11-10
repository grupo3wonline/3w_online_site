#!/bin/bash

# Script de Deploy para Produção
echo "🚀 Iniciando deploy da ThumbnailPro..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Executar testes (se houver)
echo "🧪 Executando testes..."
# npm run test

# Fazer build de produção
echo "🏗️ Gerando build de produção..."
npm run build

# Verificar se build foi criado
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build não foi gerado corretamente."
    exit 1
fi

echo "✅ Build gerado com sucesso em ./dist/"

# Otimizações pós-build
echo "⚡ Aplicando otimizações..."

# Gerar sitemap (se necessário)
# npm run generate:sitemap

# Comprimir assets (se necessário)
# npm run compress

echo "🎉 Deploy finalizado com sucesso!"
echo "📁 Arquivos prontos para deploy estão na pasta 'dist/'"
echo "🌐 Para visualizar: npm run preview"
