<template>
  <MarketingLayout>
      <div class="relative bg-white dark:bg-gray-900">
         <!-- Contact Header & Split Layout -->
        <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-12 px-6 py-24 sm:py-32 lg:px-8">
            <div class="mb-16 lg:mb-0">
               <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Vamos conversar?</h2>
               <p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Tem uma ideia de projeto ou precisa de ajuda com o CodeMaster? Nossa equipe está pronta para te ouvir.
               </p>
               
               <dl class="mt-10 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">

                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">Telefone</span>
                    <i class="fas fa-globe h-7 w-6 text-gray-400" aria-hidden="true"></i>
                  </dt>
                  <dd><a class="hover:text-gray-900 dark:hover:text-white" href="https://www.3wonline.com.br">www.3wonline.com.br</a></dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">Email</span>
                    <i class="fas fa-envelope h-7 w-6 text-gray-400" aria-hidden="true"></i>
                  </dt>
                  <dd><a class="hover:text-gray-900 dark:hover:text-white" href="mailto:contato@3wonline.com.br">contato@3wonline.com.br</a></dd>
                </div>
              </dl>

               <div class="mt-10 flex gap-6">
                <a href="#" class="text-gray-400 hover:text-gray-500">
                   <span class="sr-only">Facebook</span>
                   <i class="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://www.instagram.com/dev.willbraga/" class="text-gray-400 hover:text-gray-500">
                   <span class="sr-only">Instagram</span>
                   <i class="fab fa-instagram fa-lg"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-500">
                   <span class="sr-only">GitHub</span>
                   <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </div>

            <!-- Freshdesk Widget Area -->
            <div class="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-2 w-full shadow-xl">
               <iframe 
                class="w-full rounded-xl border-0 h-[600px] bg-white" 
                title="Fale Conosco" 
                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso">
              </iframe>
            </div>
        </div>
      </div>
  </MarketingLayout>
</template>

<script setup>
import MarketingLayout from '@/components/MarketingLayout.vue';
</script>
