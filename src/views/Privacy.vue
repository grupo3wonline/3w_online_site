<template>
  <div class="privacy-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden py-14 md:py-20">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Política de Privacidade Global' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:shield-lock-outline" class="w-4 h-4 text-emerald-400" />
            <span>CONFORMIDADE GLOBAL DE PRIVACIDADE • LGPD • GDPR • CCPA • POPIA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Política de Privacidade & Proteção de Dados
          </h1>
          <p class="text-sm sm:text-base text-blue-200 max-w-3xl leading-relaxed">
            Transparência absoluta, soberania sobre seus dados e conformidade estrita com as leis de privacidade do Brasil, União Europeia, Estados Unidos e África do Sul.
          </p>

          <div class="flex flex-wrap gap-3 mt-6">
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-emerald-400" /> LGPD (Brasil)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-blue-400" /> GDPR (Europa & UK)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-purple-400" /> CCPA / CPRA (EUA)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-amber-400" /> POPIA (África do Sul)
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-10 text-xs sm:text-sm text-gray-700 leading-relaxed">
          
          <!-- Card de Ação Rápida de Preferências -->
          <div class="p-5 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="font-bold text-sm text-white flex items-center gap-2">
                <Icon icon="mdi:tune" class="w-4 h-4 text-primary-400" />
                Gerenciar Meu Consentimento de Cookies
              </h3>
              <p class="text-xs text-slate-300 mt-1">
                Altere ou revogue suas permissões para cookies analíticos e de marketing a qualquer momento.
              </p>
            </div>
            <button
              @click="openPreferences"
              class="btn-primary !bg-primary-600 hover:!bg-primary-700 text-xs font-bold !py-2.5 !px-5 whitespace-nowrap shrink-0"
            >
              Configurar Preferências
            </button>
          </div>

          <!-- 1. Introdução e Controlador -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:domain" class="w-5 h-5 text-primary-600" />
              1. Identificação do Controlador & Compromisso Global
            </h2>
            <p class="mb-3">
              A <strong>3W Online Soluções Digitais</strong> (Grupo 3W Online), sediada em Curitiba/PR, Brasil, atua como <strong>Controladora de Dados Pessoais</strong> e adota como princípio fundamental a privacidade por padrão (<em>Privacy by Default</em>) e a privacidade desde a concepção (<em>Privacy by Design</em>).
            </p>
            <p>
              Esta política estabelece os termos de coleta, tratamento, segurança e compartilhamento de informações para usuários, clientes e visitantes de qualquer localidade geográfica, alinhando-se aos mais rigorosos padrões globais de privacidade.
            </p>
          </div>

          <!-- 2. Matriz de Leis e Normas Aplicáveis -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:gavel" class="w-5 h-5 text-primary-600" />
              2. Marcos Regulatórios e Leis Atendidas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
                <div class="font-bold text-gray-900 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-emerald-600" /> LGPD (Brasil — Lei 13.709/2018)
                </div>
                <p class="text-xs text-gray-600">Garantia integral dos direitos previstos no art. 18: confirmação, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento.</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
                <div class="font-bold text-gray-900 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-blue-600" /> GDPR (União Europeia & UK)
                </div>
                <p class="text-xs text-gray-600">Conformidade com o Regulamento Geral de Proteção de Dados (Reg. UE 2016/679): bases legais lícitas, direito ao esquecimento e cláusulas contratuais padrão para transferências.</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
                <div class="font-bold text-gray-900 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-purple-600" /> CCPA / CPRA (Califórnia / EUA)
                </div>
                <p class="text-xs text-gray-600">Direito de saber quais dados são coletados, direito de exclusão, correção e declaração expressa: <strong>a 3W Online NUNCA vende ou compartilha dados pessoais para terceiros com fins monetários</strong> (<em>Do Not Sell My Info</em>).</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
                <div class="font-bold text-gray-900 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-amber-600" /> POPIA (África do Sul — Act 4 of 2013)
                </div>
                <p class="text-xs text-gray-600">Processamento lícito e proporcional de informações de pessoas físicas e jurídicas, respeitando o princípio de minimização e segurança da informação.</p>
              </div>
            </div>
          </div>

          <!-- 3. Garantia de Privacidade das Ferramentas Client-Side -->
          <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h2 class="text-base sm:text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
              <Icon icon="mdi:shield-check" class="w-5 h-5 text-emerald-600" />
              3. Privacidade Total nas Mais de 120 Ferramentas Gratuitas (Client-Side)
            </h2>
            <p class="text-xs sm:text-sm text-emerald-900 leading-relaxed mb-3">
              Todas as ferramentas interativas oferecidas no portal (geradores de código, calculadoras de ROI, simuladores financeiros, geradores de QR Code, formatadores de dados, etc.) são processadas <strong>100% no navegador (Client-Side)</strong> do usuário.
            </p>
            <ul class="list-disc list-inside space-y-1 text-xs text-emerald-800">
              <li><strong>Zero Transmissão para Servidores:</strong> Nenhum texto, documento, CPF, número ou arquivo inserido nas ferramentas é enviado para a infraestrutura da 3W Online.</li>
              <li><strong>Zero Armazenamento em Banco de Dados:</strong> O processamento ocorre exclusivamente na memória RAM local do seu navegador e é destruído ao fechar a aba.</li>
            </ul>
          </div>

          <!-- 4. Dados Pessoais Coletados e Finalidade -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:database-outline" class="w-5 h-5 text-primary-600" />
              4. Dados Pessoais Coletados & Finalidades Específicas
            </h2>
            <p class="mb-3">Coletamos apenas as informações estritamente necessárias para prestação de serviços e comunicação comercial:</p>
            <ul class="list-disc list-inside space-y-2 pl-2 text-gray-600">
              <li><strong>Formulários de Contato e Simuladores de Preço:</strong> Nome completo, e-mail corporativo, telefone/WhatsApp, nome da empresa e escopo de projeto para elaboração de propostas comerciais (Base legal: Execução de Contrato / Procedimentos Preliminares).</li>
              <li><strong>Dados de Navegação Técnica:</strong> Endereço IP anonimizado, páginas visitadas, tempo de permanência e dispositivo através do Google Analytics 4 com anonimização de IP ativada (Base legal: Legítimo Interesse / Consentimento).</li>
              <li><strong>Parâmetros de Atribuição (SEM / UTM):</strong> Rastreamento de origem de campanhas para entender qual anúncio gerou o contato, sem identificação biométrica ou sensível.</li>
            </ul>
          </div>

          <!-- 5. Direitos dos Titulares e Procedimentos de Solicitação -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:account-key" class="w-5 h-5 text-primary-600" />
              5. Como Exercer Seus Direitos de Privacidade
            </h2>
            <p class="mb-3">
              Independentemente do seu país de residência, você pode exercer gratuitamente os seguintes direitos a qualquer momento:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Acesso e Confirmação:</strong> Saber quais dados pessoais mantemos sobre você.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Retificação / Correção:</strong> Atualizar informações cadastrais incompletas ou incorretas.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Eliminação / Esquecimento:</strong> Solicitar o apagamento total dos seus dados de contato dos nossos bancos de dados.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Revogação e Opt-Out:</strong> Retirar consentimento previamente concedido para comunicações ou cookies.
              </div>
            </div>
            <p class="mt-4 text-xs text-gray-600">
              Para formalizar qualquer solicitação, envie uma mensagem para nosso Encarregado de Dados (DPO) através do e-mail: <a href="mailto:privacidade@3wonline.com.br" class="text-primary-600 font-bold underline">privacidade@3wonline.com.br</a>. Respondemos em até 5 dias úteis.
            </p>
          </div>

          <!-- 6. Segurança e Transferência Internacional -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:lock-check" class="w-5 h-5 text-primary-600" />
              6. Segurança da Informação & Transferência Internacional
            </h2>
            <p class="mb-2">
              Adotamos criptografia de ponta a ponta (SSL/TLS 256 bits), servidores seguros com firewall ativo e políticas restritas de controle de acesso aos bancos de dados de propostas.
            </p>
            <p>
              Quando serviços de infraestrutura em nuvem envolvem servidores localizados fora do Brasil (como provedores de CDN e e-mail com data centers nos EUA ou Europa), asseguramos que as operadoras cumpram com Cláusulas Contratuais Padrão (SCCs) e níveis adequados de segurança exigidos pela LGPD e GDPR.
            </p>
          </div>

          <!-- 7. Contato do DPO / Encarregado de Dados -->
          <div class="p-6 rounded-2xl bg-slate-900 text-white">
            <h2 class="text-base sm:text-lg font-bold mb-2 flex items-center gap-2">
              <Icon icon="mdi:shield-account" class="w-5 h-5 text-emerald-400" />
              7. Encarregado pelo Tratamento de Dados Pessoais (DPO)
            </h2>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              O Encarregado de Proteção de Dados da 3W Online é o responsável por intermediar a comunicação entre os titulares de dados, a empresa e as autoridades de proteção de dados (como a ANPD no Brasil e autoridades supervisoras da UE).
            </p>
            <div class="space-y-1.5 text-xs text-slate-200">
              <p><strong>Canal Oficial de Privacidade:</strong> <a href="mailto:privacidade@3wonline.com.br" class="text-emerald-400 underline font-semibold">privacidade@3wonline.com.br</a></p>
              <p><strong>E-mail Institucional:</strong> <a href="mailto:contato@3wonline.com.br" class="text-blue-300 underline font-semibold">contato@3wonline.com.br</a></p>
              <p><strong>Localização:</strong> Curitiba, Paraná — Brasil (Atendimento Nacional e Internacional)</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'
import { useSeo } from '@/composables/useSeo'

const { openPreferences } = usePrivacyConsent()

const { applySeo } = useSeo()
applySeo({
  title: 'Política de Privacidade Global | LGPD, GDPR, CCPA, POPIA | 3W Online',
  description: 'Conheça nossa Política de Privacidade Global em total conformidade com a LGPD (Brasil), GDPR (Europa), CCPA (EUA) e POPIA (África do Sul). Transparência e segurança total.',
  path: '/privacidade',
  keywords: 'política de privacidade 3w online, lgpd 3w online, gdpr curitiba, ccpa compliance, privacidade de dados',
})
</script>