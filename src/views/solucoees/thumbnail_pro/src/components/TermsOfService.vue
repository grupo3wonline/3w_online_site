<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-youtube-red rounded-full mb-4"
        >
          <FileText class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Termos de Uso
        </h1>
        <p class="text-lg text-gray-600">
          Última atualização: 10 de outubro de 2025
        </p>
      </div>

      <div class="card p-8 md:p-12 space-y-8">
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            1. Aceitação dos Termos
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Ao acessar e usar o ThumbnailPro, você concorda em cumprir estes
            Termos de Uso. Se não concordar, não utilize nossos serviços.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            2. Descrição do Serviço
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            O ThumbnailPro é uma ferramenta web gratuita que permite extrair
            imagens de thumbnail (miniaturas) de vídeos públicos do YouTube.
            Oferecemos:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Extração de thumbnails em múltiplas resoluções</li>
            <li>Download gratuito e ilimitado</li>
            <li>Interface web responsiva e moderna</li>
            <li>Processamento rápido e seguro</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            3. Uso Aceitável
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">Você concorda em:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Usar o serviço apenas para fins legais</li>
            <li>Não violar direitos autorais ou propriedade intelectual</li>
            <li>Não sobrecarregar nossos servidores com uso abusivo</li>
            <li>Não usar para atividades fraudulentas ou maliciosas</li>
            <li>Respeitar os Termos de Serviço do YouTube</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            4. Propriedade Intelectual
          </h2>
          <p class="text-gray-700 leading-relaxed">
            As thumbnails extraídas são propriedade dos respectivos criadores de
            conteúdo do YouTube. Você é responsável por garantir que tem o
            direito de usar as imagens extraídas. Nosso serviço apenas facilita
            o acesso a conteúdo já público.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            5. Isenção de Responsabilidade
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            O serviço é fornecido "como está". Não garantimos:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Disponibilidade contínua e ininterrupta</li>
            <li>Ausência de erros ou bugs</li>
            <li>Resultados específicos ou precisão absoluta</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            6. Limitação de Responsabilidade
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Não somos responsáveis por quaisquer danos diretos, indiretos,
            incidentais ou consequenciais decorrentes do uso ou impossibilidade
            de uso do serviço.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">7. Modificações</h2>
          <p class="text-gray-700 leading-relaxed">
            Reservamos o direito de modificar estes termos a qualquer momento.
            Alterações significativas serão notificadas no site.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">8. Contato</h2>
          <p class="text-gray-700 leading-relaxed">
            Para dúvidas sobre estes Termos:
            <a
              href="mailto:contato@3wonline.com.br"
              class="text-youtube-red hover:underline"
              >contato@3wonline.com.br</a
            >
          </p>
        </section>
      </div>

      <div class="text-center mt-8">
        <router-link
          to="/"
          class="btn-secondary inline-flex items-center px-8 py-3"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Voltar para Início
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { FileText, ArrowLeft } from "lucide-vue-next";

export default {
  name: "TermsOfService",
  components: { FileText, ArrowLeft },
};
</script>
