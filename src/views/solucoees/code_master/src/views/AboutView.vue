<template>
  <MarketingLayout>
     <!-- Header / Hero -->
     <div class="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-20 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')]"></div>
        <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Sobre Nós</h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
               O CodeMaster é mais do que um editor; é a manifestação da nossa paixão por tecnologia acessível e eficiente. Desenvolvido pelo Grupo 3w Online, nascemos para empoderar criadores.
            </p>
          </div>
          <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              <a href="https://www.3wonline.com.br" target="_blank">Conheça a Empresa <span aria-hidden="true">&rarr;</span></a>
              <a href="https://www.linkedin.com" target="_blank">LinkedIn <span aria-hidden="true">&rarr;</span></a>
            </div>
            <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Projetos Entregues</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">500+</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Anos de Mercado</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">12+</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Especialistas</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">25+</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Satisfação</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">99.8%</dd>
              </div>
            </dl>
          </div>
        </div>
     </div>

     <!-- Content Section -->
     <div class="relative bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div class="lg:pr-8 lg:pt-4">
                    <div class="lg:max-w-lg">
                        <h2 class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Nossa História</h2>
                        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Do Código à Solução</p>
                        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            O CodeMaster nasceu de uma necessidade interna. Precisávamos de um ambiente rápido para validar ideias sem o "overhead" de configurar servidores locais. A ferramenta foi tão útil que decidimos abri-la para o mundo.
                        </p>
                        <div class="mt-8 space-y-4">
                             <div class="flex gap-x-3">
                                <i class="fas fa-rocket mt-1 text-indigo-600 dark:text-indigo-400"></i>
                                <span><strong class="font-semibold text-gray-900 dark:text-white">Inovação Constante:</strong> Utilizamos Vue 3 e Vite para garantir que você esteja sempre na vanguarda.</span>
                             </div>
                             <div class="flex gap-x-3">
                                <i class="fas fa-users mt-1 text-indigo-600 dark:text-indigo-400"></i>
                                <span><strong class="font-semibold text-gray-900 dark:text-white">Foco no Humano:</strong> Tecnologia feita por pessoas, para pessoas. Valorizamos a experiência do usuário acima de tudo.</span>
                             </div>
                             <div class="flex gap-x-3">
                                <i class="fas fa-lock mt-1 text-indigo-600 dark:text-indigo-400"></i>
                                <span><strong class="font-semibold text-gray-900 dark:text-white">Segurança Enterprise:</strong> Aplicamos os mesmos padrões de segurança bancária em nossos sistemas corporativos.</span>
                             </div>
                        </div>
                    </div>
                </div>
                <!-- Visual Element -->
                 <div class="transform scale-100 lg:scale-110 relative">
                     <div class="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-lg opacity-30"></div>
                     <div class="relative rounded-2xl bg-gray-900 p-6 shadow-2xl ring-1 ring-white/10">
                        <div class="flex items-center gap-4 border-b border-gray-700 pb-4 mb-4">
                            <div class="flex gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div class="text-xs text-gray-400 font-mono">grupo3w_core.php</div>
                        </div>
                        <div class="space-y-2 font-mono text-sm">
                            <div class="text-purple-400">class <span class="text-yellow-400">Grupo3wOnline</span> {</div>
                            <div class="pl-4 text-blue-300">public function <span class="text-yellow-200">__construct</span>() {</div>
                            <div class="pl-8 text-gray-300">$this->missao = <span class="text-green-400">'Transformar negócios'</span>;</div>
                            <div class="pl-8 text-gray-300">$this->visao = <span class="text-green-400">'Liderança tecnológica'</span>;</div>
                            <div class="pl-8 text-gray-300">$this->valores = [<span class="text-green-400">'Ética'</span>, <span class="text-green-400">'Inovação'</span>, <span class="text-green-400">'Excelência'</span>];</div>
                            <div class="pl-4 text-blue-300">}</div>
                            <div class="pl-4 text-blue-300">public function <span class="text-yellow-200">entrega_valor</span>() {</div>
                            <div class="pl-8 text-purple-400">while(<span class="text-orange-400">true</span>) {</div>
                            <div class="pl-12 text-gray-300">$this->superar_expectativas();</div>
                            <div class="pl-8 text-purple-400">}</div>
                            <div class="pl-4 text-blue-300">}</div>
                            <div class="text-purple-400">}</div>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
     </div>

     <!-- Team/Culture Stub -->
     <div class="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">Quem faz acontecer</h2>
            <p class="text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
                Um time multidisciplinar de engenheiros, designers e estrategistas obcecados por qualidade.
            </p>
            <div class="flex flex-wrap justify-center gap-8">
                <!-- Avatar 1 -->
                <div class="flex flex-col items-center">
                    <img class="inline-block h-20 w-20 rounded-full ring-2 ring-white dark:ring-gray-900 shadow-lg" src="https://ui-avatars.com/api/?name=W+F+B&background=7c3aed&color=fff" alt="" />
                    <h3 class="mt-4 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">WILLFROMBRASIL</h3>
                    <p class="text-sm leading-6 text-purple-600 dark:text-purple-400">Lead Developer</p>
                </div>
                <!-- Avatar 2 -->
                 <div class="flex flex-col items-center">
                    <img class="inline-block h-20 w-20 rounded-full ring-2 ring-white dark:ring-gray-900 shadow-lg" src="https://ui-avatars.com/api/?name=H+T&background=3b82f6&color=fff" alt="" />
                    <h3 class="mt-4 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">HOTWYL</h3>
                    <p class="text-sm leading-6 text-blue-600 dark:text-blue-400">Engenharia de Software</p>
                </div>
            </div>
             <div class="mt-12">
                 <a href="https://www.3wonline.com.br" class="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
                    Junte-se ao time <span aria-hidden="true">→</span>
                 </a>
             </div>
        </div>
     </div>
  </MarketingLayout>
</template>

<script setup>
import MarketingLayout from '@/components/MarketingLayout.vue';
</script>
