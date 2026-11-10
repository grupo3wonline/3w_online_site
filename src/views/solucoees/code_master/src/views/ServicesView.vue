<template>
  <MarketingLayout>
      <!-- Hero -->
     <div class="relative bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Nossa Expertise</h2>
            <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Soluções que Escalam</p>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Desenvolvemos software sob medida para empresas que não aceitam o "bom o suficiente". Do MVP ao Enterprise.
            </p>
          </div>
        </div>
      </div>

     <!-- Services Grid -->
     <div class="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Service 1 -->
                <div class="relative group bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-code-branch text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">SaaS Development</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Criamos plataformas Software as a Service (SaaS) multi-tenant, escaláveis e seguras.
                    </p>
                    <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Laravel / Node.js</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Arquitetura Microservices</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Integrações API</li>
                    </ul>
                </div>

                 <!-- Service 2 -->
                <div class="relative group bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="h-14 w-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-mobile-alt text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">App Mobile</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Aplicativos nativos e híbridos com UX/UI de classe mundial. iOS e Android.
                    </p>
                    <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> React Native / Flutter</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> PWA Support</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Offline-first</li>
                    </ul>
                </div>

                 <!-- Service 3 -->
                <div class="relative group bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-search-dollar text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">SEO & Growth</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Estratégias de geomarketing, SEO técnico e performance web (Core Vitals).
                    </p>
                    <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Auditoria Técnica</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> Google Analytics 4</li>
                        <li class="flex gap-2"><i class="fas fa-check text-green-500"></i> CRO (Otimização)</li>
                    </ul>
                </div>
            </div>
        </div>
     </div>

     <!-- Process Section -->
     <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
                 <h2 class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Metodologia</h2>
                <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Como trabalhamos</p>
            </div>
             <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                     <div class="flex flex-col items-center text-center">
                         <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-2xl font-bold">1</div>
                         <dt class="text-xl font-bold text-gray-900 dark:text-white">Discovery</dt>
                         <dd class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Entendemos profundamente o seu negócio e definimos o MVP.</dd>
                     </div>
                     <div class="flex flex-col items-center text-center">
                         <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-2xl font-bold">2</div>
                         <dt class="text-xl font-bold text-gray-900 dark:text-white">Design & UX</dt>
                         <dd class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Prototipagem de alta fidelidade e validação de fluxos.</dd>
                     </div>
                     <div class="flex flex-col items-center text-center">
                        <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-2xl font-bold">3</div>
                         <dt class="text-xl font-bold text-gray-900 dark:text-white">Code & Test</dt>
                         <dd class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Desenvolvimento ágil com testes automatizados e CI/CD.</dd>
                     </div>
                     <div class="flex flex-col items-center text-center">
                        <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-2xl font-bold">4</div>
                         <dt class="text-xl font-bold text-gray-900 dark:text-white">Launch & Grow</dt>
                         <dd class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Lançamento monitorado e estratégias de crescimento.</dd>
                     </div>
                </dl>
             </div>
        </div>
     </div>
  </MarketingLayout>
</template>
<script setup>
import MarketingLayout from '@/components/MarketingLayout.vue';
</script>
