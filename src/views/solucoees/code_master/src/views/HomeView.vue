<template>
  <MarketingLayout>
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>
      <!-- Decorative blobs -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-200/30 dark:bg-purple-900/10 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-900/10 blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <!-- Text Content -->
          <div class="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wide mb-6">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              v2.0 Disponível
            </div>
            
            <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Seu estúdio de código
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                onde você estiver.
              </span>
            </h1>
            
            <p class="text-lg text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
              O <strong>CodeMaster</strong> elimina a complexidade de configuração de ambiente. Escreva, teste e valide HTML, CSS, JS e PHP instantaneamente no seu navegador com uma experiência <em>premium</em> e segura.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <router-link to="/app" class="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-700 hover:-translate-y-1 transition-all duration-300">
                <i class="fas fa-code mr-2"></i> Começar Agora - Grátis
              </router-link>
              <a href="https://www.3wonline.com.br" target="_blank" class="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium text-slate-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">
                Soluções Enterprise
              </a>
            </div>

            <div class="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
               <div class="flex -space-x-2">
                 <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center font-bold text-xs ring-2 ring-transparent">JS</div>
                 <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center font-bold text-xs ring-2 ring-transparent">TS</div>
                 <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center font-bold text-xs ring-2 ring-transparent">PHP</div>
               </div>
               <span>Compatível com Web Standard</span>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="lg:col-span-6 relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
               <!-- Using the SVG I created -->
               <img src="@/assets/hero-illustration.svg" alt="CodeMaster Interface Preview" class="w-full h-auto transform transition duration-500 hover:scale-[1.02]" />
               
               <!-- Floating elements (simulated via CSS on top of SVG/Image) -->
               <div class="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce-slow hidden sm:block">
                  <div class="flex items-center gap-3">
                     <span class="flex h-3 w-3 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </span>
                     <span class="text-sm font-bold text-gray-800 dark:text-white">Compilado com Sucesso</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Logos Strip -->
    <div class="py-8 bg-slate-50 dark:bg-gray-800/50 border-y border-slate-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
         <img src="@/assets/vue-logo.svg" class="h-8 md:h-12 w-auto" alt="Vue.js" title="Vue.js" />
         <img src="@/assets/vite-logo.svg" class="h-8 md:h-12 w-auto" alt="Vite" title="Vite" />
         <img src="@/assets/tailwind-logo.svg" class="h-8 md:h-12 w-auto" alt="Tailwind CSS" title="Tailwind CSS" />
         <div class="h-8 md:h-12 flex items-center font-mono font-bold text-2xl text-purple-500"><i class="fab fa-php mr-2"></i> PHP</div>
      </div>
    </div>

    <!-- Features Grid -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
             Projetado para <span class="text-purple-600 dark:text-purple-400">Produtividade</span>
          </h2>
          <p class="text-lg text-slate-600 dark:text-gray-300">
            Descubra por que o CodeMaster é a escolha inteligente para prototipagem rápida e aprendizado.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-layer-group text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Ambiente FullStack</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Integração perfeita de HTML, CSS e JS. Exclusivo simulador PHP-to-JS para testar lógica de backend sem servidor.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-mobile-alt text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Mobile First Real</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Desenvolva e visualize seus projetos em qualquer dispositivo. Interface responsiva que se adapta ao seu fluxo de trabalho.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-shield-alt text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Segurança Total</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Seu código roda localmente no navegador. Respeitamos a LGPD e garantimos a privacidade dos seus dados e projetos.
            </p>
          </div>
          
           <!-- Feature 4 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-bolt text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Performance Extrema</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Baseado no Princípio de Pareto: 80% do resultado com 20% do esforço. Interface limpa, rápida e sem distrações.
            </p>
          </div>

           <!-- Feature 5 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-download text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Exportação Fácil</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Baixe seus projetos completos em um único arquivo HTML pronto para deploy ou compartilhamento.
            </p>
          </div>

           <!-- Feature 6 -->
          <div class="bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 dark:border-gray-700 group">
            <div class="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
               <i class="fas fa-moon text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Dark Mode Expert</h3>
            <p class="text-slate-600 dark:text-gray-400 leading-relaxed">
               Projetado para sessões noturnas de codificação. Cores equilibradas para reduzir a fadiga visual.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Persuasive Validation Section -->
    <section class="bg-slate-900 relative isolate py-24 sm:py-32 overflow-hidden">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
           <div class="pr-8 sm:pr-16">
             <h3 class="text-3xl font-bold tracking-tight text-white mb-6">Por que o CodeMaster?</h3>
             <p class="text-lg leading-8 text-gray-300 mb-8">
                Milhares de desenvolvedores confiam no CodeMaster para:
             </p>
             <ul role="list" class="space-y-4 text-base leading-7 text-gray-300">
                <li class="flex gap-x-3 items-center">
                    <i class="fas fa-check-circle text-purple-400"></i> Validação rápida de ideias de UI/UX.
                </li>
                <li class="flex gap-x-3 items-center">
                    <i class="fas fa-check-circle text-purple-400"></i> Ensino e aprendizado de programação web.
                </li>
                <li class="flex gap-x-3 items-center">
                    <i class="fas fa-check-circle text-purple-400"></i> Testes de snippets PHP de forma segura.
                </li>
             </ul>
             <div class="mt-10 flex gap-4">
                 <router-link to="/sobre" class="text-sm font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                    Conheça nossa missão <span aria-hidden="true">→</span>
                 </router-link>
             </div>
           </div>
           
           <!-- Glassmorphism Card -->
           <div class="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
               <div class="flex items-center gap-4 mb-6">
                   <div class="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500">
                       <img src="https://ui-avatars.com/api/?name=Dev+Expert&background=random" alt="User Avatar" />
                   </div>
                   <div>
                       <h4 class="text-white font-bold">Fernando Souza</h4>
                       <p class="text-gray-400 text-sm">Tech Lead @ Grupo 3w</p>
                   </div>
                   <div class="ml-auto text-yellow-400 text-sm">
                       <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                   </div>
               </div>
               <p class="text-gray-200 italic">
                   "O CodeMaster revolucionou a forma como prototipamos componentes. A velocidade de feedback visual é incomparável. Recomendo para todo dev frontend!"
               </p>
           </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative isolate overflow-hidden bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Pronto para codar?
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Junte-se à comunidade de desenvolvedores que escolheram a eficiência.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link to="/app" class="rounded-full bg-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-purple-500 hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 animate-pulse">
            <i class="fas fa-rocket mr-2"></i> ACESSAR FERRAMENTA
          </router-link>
        </div>
      </div>
    </section>
  </MarketingLayout>
</template>

<script setup>
import MarketingLayout from '@/components/MarketingLayout.vue';
</script>
