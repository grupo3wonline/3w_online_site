<template>
  <div class="bg-gray-50 py-12">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
        <p class="text-lg text-gray-600">
          Estamos prontos para ouvir você. Utilize o formulário abaixo ou nossos outros canais.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Info Sidebar -->
        <div class="lg:col-span-1 space-y-6">
           <!-- Card 1 -->
           <div class="bg-white p-6 rounded-xl shadow-md">
              <div class="flex items-center gap-4 mb-4">
                 <div class="bg-primary-100 p-3 rounded-full text-primary-600">
                    <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
                 </div>
                 <div>
                    <h3 class="font-bold text-gray-900">Email</h3>
                    <p class="text-gray-600">contato@3wonline.com.br</p>
                 </div>
              </div>
           </div>

           <!-- Card 2 -->
           <div class="bg-white p-6 rounded-xl shadow-md">
              <div class="flex items-center gap-4 mb-4">
                 <div class="bg-primary-100 p-3 rounded-full text-primary-600">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" size="lg" />
                 </div>
                 <div>
                    <h3 class="font-bold text-gray-900">Localização</h3>
                    <p class="text-gray-600">São Paulo, SP - Brasil</p>
                 </div>
              </div>
           </div>
           
           <!-- CTA Card -->
           <div class="bg-gradient-to-br from-primary-700 to-indigo-800 p-8 rounded-xl shadow-lg text-white">
              <h3 class="font-bold text-xl mb-4">Precisa de um sistema personalizado?</h3>
              <p class="text-primary-100 mb-6">O Grupo 3w Online é especialista em alta performance.</p>
              <a href="https://www.3wonline.com.br" target="_blank" class="block text-center bg-white text-primary-800 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Visite nosso site
              </a>
           </div>
        </div>

        <!-- Iframe Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-4 h-full">
            <iframe 
                title="Feedback Form" 
                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso" 
                class="w-full h-[530px] border-0 rounded-xl" 
                style="max-width:1000px;"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
