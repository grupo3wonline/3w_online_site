<template>
  <div class="w-full flex justify-center">
    <div class="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-2 shadow-inner">
      <iframe
        title="Formulário de Contato - Grupo 3w Online"
        src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
        class="w-full h-[600px] md:h-[530px] border-0 rounded-lg"
        loading="lazy"
        style="max-width:100%;"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactIframe'
};
</script>

<style scoped>
iframe {
  background: white;
}
</style>
