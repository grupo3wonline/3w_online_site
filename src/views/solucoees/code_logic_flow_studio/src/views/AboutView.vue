<script setup>
import CallToAction from '@/components/CallToAction.vue'
const getAsset = (path) => `/code_logic_flow_studio/${path}`
</script>

<template>
    <div class="pt-20">
        <section class="bg-slate-900 text-white py-20 relative overflow-hidden">
             <!-- Background Elements -->
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div class="absolute w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
                <div class="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-0 right-0"></div>
            </div>
            
            <div class="container mx-auto px-6 relative z-10 text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-6">Sobre o <span class="text-brand-500">Grupo 3w Online</span></h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    Inovação, Tecnologia e Resultados. Somos especialistas em transformar desafios complexos em soluções digitais simples e eficientes.
                </p>
            </div>
        </section>

        <section class="py-20 bg-white dark:bg-dark-bg">
            <div class="container mx-auto px-6">
                <!-- Our Story -->
                <div class="flex flex-col md:flex-row gap-12 items-center mb-24">
                    <div class="md:w-1/2 relative group">
                        <div class="absolute inset-0 bg-brand-600 rounded-2xl transform rotate-3 transition duration-300 group-hover:rotate-1 opacity-20"></div>
                        <img :src="getAsset('images/about-team.png')" alt="Equipe 3w Online Colaborando" class="relative rounded-2xl shadow-xl transform transition duration-300 group-hover:-translate-y-1">
                    </div>
                    <div class="md:w-1/2 space-y-6">
                        <span class="text-brand-600 dark:text-brand-400 font-bold uppercase text-sm tracking-wider">Quem Somos</span>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Excelência em Engenharia de Software</h2>
                        <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            O <strong>Grupo 3w Online</strong> é uma referência no desenvolvimento de software de alta performance. 
                            Combinamos expertise técnica com visão de negócios para entregar produtos que não apenas funcionam, mas que geram valor real para nossos clientes e parceiros.
                        </p>
                        <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            O <strong>LogicFlow Studio</strong> nasceu da nossa necessidade interna de treinar novos talentos. 
                            Percebemos que a melhor forma de aprender lógica não é apenas lendo, mas praticando e visualizando o fluxo de dados em tempo real.
                        </p>
                    </div>
                </div>

                <!-- Mission Vision Values -->
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-slate-50 dark:bg-dark-panel p-8 rounded-xl border-l-4 border-brand-500 shadow-sm hover:shadow-md transition">
                        <div class="mb-4 text-brand-500 text-3xl"><i class="fa-solid fa-bullseye"></i></div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Missão</h3>
                        <p class="text-slate-600 dark:text-slate-400">
                            Democratizar o ensino da programação e desenvolver soluções tecnológicas que impulsionem negócios em todo o Brasil.
                        </p>
                    </div>
                    <div class="bg-slate-50 dark:bg-dark-panel p-8 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition">
                        <div class="mb-4 text-purple-500 text-3xl"><i class="fa-solid fa-eye"></i></div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Visão</h3>
                        <p class="text-slate-600 dark:text-slate-400">
                            Ser reconhecido como o principal hub de tecnologia e inovação, criando pontes entre aprendizado técnico e mercado de trabalho.
                        </p>
                    </div>
                    <div class="bg-slate-50 dark:bg-dark-panel p-8 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition">
                        <div class="mb-4 text-green-500 text-3xl"><i class="fa-solid fa-handshake"></i></div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Valores</h3>
                        <p class="text-slate-600 dark:text-slate-400">
                            Transparência, Código Limpo, Inovação Contínua e Foco total na Experiência do Usuário (UX).
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        <CallToAction />
    </div>
</template>
