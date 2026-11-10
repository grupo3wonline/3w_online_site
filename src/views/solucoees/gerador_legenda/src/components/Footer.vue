<template>
  <footer class="bg-gray-900 text-white pt-12 pb-8">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold mb-4 text-primary-400">Gerador de Legenda</h3>
          <p class="text-gray-400 mb-4 max-w-md">
            Soluções digitais inovadoras para transformar o seu negócio. 
            Desenvolvemos sistemas robustos e performáticos sob medida.
          </p>
          <div class="flex space-x-4">
             <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
             </a>
             <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
             </a>
             <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
             </a>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4 text-gray-200">Links Rápidos</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-primary-400 transition-colors">Home</router-link></li>
            <li><router-link to="/sobre" class="text-gray-400 hover:text-primary-400 transition-colors">Sobre Nós</router-link></li>
            <li><router-link to="/servicos" class="text-gray-400 hover:text-primary-400 transition-colors">Serviços</router-link></li>
            <li><router-link to="/ferramentas" class="text-gray-400 hover:text-primary-400 transition-colors">Ferramentas</router-link></li>
            <li><router-link to="/contato" class="text-gray-400 hover:text-primary-400 transition-colors">Contato</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-gray-200">Legal</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">Termos de Uso</a></li>
            <li><a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} Gerador de Legenda. Todos os direitos reservados.</p>
        <div class="mt-4 md:mt-0 flex items-center space-x-2">
           <span>Desenvolvido por</span>
           <a href="https://www.3wonline.com.br" target="_blank" class="text-primary-400 hover:text-white font-medium">Grupo 3w Online</a>
           <span>&</span>
            <span class="text-gray-400">hotwyl - willfrombrasil</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
