<script setup>
import CallToAction from '@/components/CallToAction.vue'
const getAsset = (path) => `/code_logic_flow_studio/${path}`

const services = [
    {
        icon: 'fa-laptop-code',
        title: 'Desenvolvimento Web',
        desc: 'Sites e Sistemas Web robustos, rápidos e seguros, focados em conversão e experiência do usuário.',
        techs: ['Vue.js', 'React', 'Laravel', 'Node.js']
    },
    {
        icon: 'fa-mobile-screen',
        title: 'Aplicativos Mobile',
        desc: 'Apps nativos e híbridos para iOS e Android que conectam sua marca ao cliente onde quer que ele esteja.',
        techs: ['Flutter', 'React Native', 'Swift', 'Kotlin']
    },
    {
        icon: 'fa-chart-line',
        title: 'Consultoria Tech',
        desc: 'Análise de arquitetura, otimização de performance e modernização de legado para empresas em crescimento.',
        techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
        icon: 'fa-cloud',
        title: 'Soluções em Nuvem',
        desc: 'Infraestrutura escalável, DevOps e migração para nuvem (AWS, Azure, Google Cloud).',
        techs: ['Serverless', 'Microservices', 'Database', 'Security']
    }
]
</script>

<template>
    <div class="pt-20">
        <!-- Hero Services -->
        <section class="relative bg-brand-900 text-white py-24 overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-30">
                 <img :src="getAsset('images/services-hero.png')" alt="Tech Background" class="w-full h-full object-cover">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900 z-10"></div>
            
            <div class="container mx-auto px-6 text-center relative z-20">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Nossas Soluções</h1>
                <p class="text-xl text-brand-100 max-w-2xl mx-auto">
                    Tecnologia de ponta para escalar o seu negócio. Do conceito ao código, entregamos excelência.
                </p>
            </div>
        </section>

        <section class="py-20 bg-slate-50 dark:bg-dark-bg">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-30">
                    <div v-for="service in services" :key="service.title" class="bg-white dark:bg-dark-panel p-8 rounded-xl shadow-xl border-b-4 border-brand-500 hover:transform hover:-translate-y-2 transition duration-300 flex flex-col h-full">
                        <div class="w-16 h-16 bg-brand-100 dark:bg-brand-900/40 rounded-full flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 text-2xl shadow-inner">
                            <i :class="['fa-solid', service.icon]"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{{ service.title }}</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            {{ service.desc }}
                        </p>
                        
                        <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tech in service.techs" :key="tech" class="text-xs font-mono bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Methodology -->
                <div class="mt-20 text-center">
                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-12">Nossa Metodologia</h2>
                    <div class="flex flex-col md:flex-row justify-center items-center gap-8 relative">
                         <!-- Line -->
                         <div class="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-700 -z-0 transform -translate-y-1/2"></div>
                         
                         <div class="w-full md:w-1/4 bg-white dark:bg-dark-panel p-6 rounded-xl shadow relative z-10">
                             <div class="text-brand-500 text-2xl mb-2 font-bold">01</div>
                             <h4 class="font-bold dark:text-white">Imersão</h4>
                             <p class="text-xs text-gray-500">Entendemos seu negócio a fundo.</p>
                         </div>
                         <div class="w-full md:w-1/4 bg-white dark:bg-dark-panel p-6 rounded-xl shadow relative z-10">
                             <div class="text-brand-500 text-2xl mb-2 font-bold">02</div>
                             <h4 class="font-bold dark:text-white">Planejamento</h4>
                             <p class="text-xs text-gray-500">Arquitetura e UX Design.</p>
                         </div>
                         <div class="w-full md:w-1/4 bg-white dark:bg-dark-panel p-6 rounded-xl shadow relative z-10">
                             <div class="text-brand-500 text-2xl mb-2 font-bold">03</div>
                             <h4 class="font-bold dark:text-white">Desenvolvimento</h4>
                             <p class="text-xs text-gray-500">Código limpo e Sprint Agile.</p>
                         </div>
                         <div class="w-full md:w-1/4 bg-white dark:bg-dark-panel p-6 rounded-xl shadow relative z-10">
                             <div class="text-brand-500 text-2xl mb-2 font-bold">04</div>
                             <h4 class="font-bold dark:text-white">Entrega</h4>
                             <p class="text-xs text-gray-500">QA, Deploy e Monitoramento.</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        <CallToAction />
    </div>
</template>
