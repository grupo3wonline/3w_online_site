<script setup>
import CallToAction from '@/components/CallToAction.vue'

// Base path helper for images if needed, though public dir works with /
const getAsset = (path) => `/code_logic_flow_studio/${path}`
</script>

<template>
    <div class="pt-20">
        <!-- Hero Section -->
        <section class="relative bg-white dark:bg-dark-bg overflow-hidden border-b border-gray-100 dark:border-gray-800">
            <div class="container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2 lg:pr-12 z-10">
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/20 rounded-full text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-widest mb-6 border border-brand-100 dark:border-brand-500/20 animate-fade-in-up">
                        <i class="fa-solid fa-rocket"></i> Versão 1.0 Já Disponível
                    </div>
                    <h1 class="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                        Aprenda Lógica de Programação <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-500">Visualmente</span>
                    </h1>
                    <p class="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        O <strong>LogicFlow Studio</strong> transforma seu código Portugol em fluxogramas dinâmicos instantaneamente. Desenvolva o raciocínio lógico necessário para se tornar um desenvolvedor de elite.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <router-link to="/ferramentas" 
                            class="inline-flex justify-center items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <i class="fa-solid fa-code"></i>
                            Abrir Studio Online
                        </router-link>
                        <a href="#tutorial" 
                            class="inline-flex justify-center items-center gap-3 bg-white dark:bg-dark-panel text-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold py-4 px-8 rounded-xl transition-all">
                            <i class="fa-regular fa-circle-play"></i>
                            Como Funciona
                        </a>
                    </div>
                    <div class="mt-8 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                        <div class="flex -space-x-2">
                            <img class="w-8 h-8 rounded-full border-2 border-white dark:border-dark-bg" src="https://i.pravatar.cc/100?img=1" alt="User">
                            <img class="w-8 h-8 rounded-full border-2 border-white dark:border-dark-bg" src="https://i.pravatar.cc/100?img=2" alt="User">
                            <img class="w-8 h-8 rounded-full border-2 border-white dark:border-dark-bg" src="https://i.pravatar.cc/100?img=3" alt="User">
                            <div class="w-8 h-8 rounded-full border-2 border-white dark:border-dark-bg bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-300">+2k</div>
                        </div>
                        <p>Junte-se à comunidade de aprendizes.</p>
                    </div>
                </div>
                
                <div class="lg:w-1/2 mt-12 lg:mt-0 relative group perspective">
                    <div class="absolute inset-0 bg-gradient-to-tr from-brand-500/30 to-purple-500/30 rounded-[2rem] blur-3xl transform rotate-6 transition-all duration-500 group-hover:rotate-12 group-hover:blur-2xl"></div>
                    <img :src="getAsset('images/hero-main.png')" alt="LogicFlow Studio Interface 3D" class="relative z-10 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50 transform transition duration-500 hover:scale-[1.02] hover:rotate-1">
                    
                    <!-- Floating Badge -->
                    <div class="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-dark-panel p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-bounce-slow">
                        <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                            <i class="fa-solid fa-check-circle text-xl"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400 uppercase font-bold">Status do Sistema</p>
                            <p class="text-sm font-bold text-slate-900 dark:text-white">100% Funcional</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tutorial Section -->
        <section id="tutorial" class="py-20 bg-slate-50 dark:bg-dark-panel/50">
            <div class="container mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <span class="text-brand-600 dark:text-brand-400 font-bold tracking-wider text-sm uppercase">Passo a Passo</span>
                    <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Domine a Ferramenta em Minutos</h2>
                    <p class="text-slate-600 dark:text-slate-400">
                        Nossa interface foi desenhada para ser intuitiva. Você foca na lógica, nós cuidamos da visualização.
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 relative">
                    <!-- Connector Line -->
                    <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-brand-200 dark:via-brand-800 to-transparent z-0"></div>

                    <!-- Step 1 -->
                    <div class="relative z-10 bg-white dark:bg-dark-panel p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:transform hover:-translate-y-2 transition duration-300">
                        <div class="w-16 h-16 mx-auto bg-brand-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-brand-500/20 mb-6">1</div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Escreva o Código</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">
                            Utilize a sintaxe simples do Portugol (escreva, leia, se, enquanto) no editor integrado.
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div class="relative z-10 bg-white dark:bg-dark-panel p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:transform hover:-translate-y-2 transition duration-300">
                        <div class="w-16 h-16 mx-auto bg-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/20 mb-6">2</div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Visualize o Fluxo</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">
                            Alterne para a aba "Fluxograma" e veja sua lógica transformada em diagrama automaticamente.
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div class="relative z-10 bg-white dark:bg-dark-panel p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:transform hover:-translate-y-2 transition duration-300">
                        <div class="w-16 h-16 mx-auto bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-green-500/20 mb-6">3</div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Execute e Teste</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">
                            Rode o código, insira dados nos popups interativos e veja o resultado no console em tempo real.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Deep Dive Features -->
        <section class="py-20 bg-white dark:bg-dark-bg">
            <div class="container mx-auto px-6">
                <div class="flex flex-col lg:flex-row items-center gap-16">
                    <div class="lg:w-1/2 space-y-8">
                        <div>
                            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Funcionalidades Poderosas</h2>
                            <p class="text-slate-600 dark:text-slate-400">
                                Mais do que um simples editor, um ambiente completo de aprendizado.
                            </p>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <i class="fa-solid fa-bolt text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold text-slate-900 dark:text-white">Editor Inteligente</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Numeração de linhas, realce de sintaxe básico e snippets de código prontos para agilizar sua digitação.
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <i class="fa-solid fa-project-diagram text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold text-slate-900 dark:text-white">Mermaid.js Integration</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Tecnologia de ponta para renderização de gráficos. Seu código vira imagem vetorial exportável em milissegundos.
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <i class="fa-solid fa-mobile-screen text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold text-slate-900 dark:text-white">Mobile First</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Estude no ônibus, na fila ou no sofá. Interface 100% adaptada para toque e telas pequenas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-1/2">
                        <div class="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 font-mono text-sm relative overflow-hidden group">
                            <div class="absolute top-0 right-0 p-4 opacity-50"><i class="fa-brands fa-js text-6xl text-slate-800"></i></div>
                            <!-- Mock Code Animation -->
                            <div class="space-y-2">
                                <div class="flex gap-2 text-purple-400">
                                    <span>01</span> <span class="text-pink-400">algoritmo</span> <span class="text-yellow-300">"FuturoDev"</span>
                                </div>
                                <div class="flex gap-2 text-purple-400">
                                    <span>02</span> <span class="text-pink-400">var</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-8">
                                    <span>03</span> <span>skill = 0</span>
                                </div>
                                <div class="flex gap-2 text-purple-400">
                                    <span>04</span> <span class="text-pink-400">inicio</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-8">
                                    <span>05</span> <span class="text-blue-400">enquanto</span> (skill < 100) <span class="text-blue-400">faca</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-16">
                                    <span>06</span> <span>estudar(LogicFlow)</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-16">
                                    <span>07</span> <span>skill = skill + 1</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-8">
                                    <span>08</span> <span class="text-blue-400">fimenquanto</span>
                                </div>
                                <div class="flex gap-2 text-slate-300 pl-8">
                                    <span>09</span> <span class="text-blue-400">escreva</span>(<span class="text-yellow-300">"Sou Senior!"</span>)
                                </div>
                                <div class="flex gap-2 text-purple-400">
                                    <span>10</span> <span class="text-pink-400">fimalgoritmo</span>
                                </div>
                            </div>
                            
                            <!-- Typing Cursor Animation -->
                            <div class="mt-4 h-4 w-2 bg-brand-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Use Cases / Tips -->
        <section class="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div class="container mx-auto px-6">
                 <h2 class="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Dicas de Uso Profissional</h2>
                 <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div class="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-md border-t-4 border-brand-500">
                         <h4 class="font-bold mb-2 dark:text-white"><i class="fa-solid fa-graduation-cap text-brand-500 mr-2"></i>Estudantes</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Use para validar exercícios da faculdade ou curso técnico antes de entregar.</p>
                     </div>
                     <div class="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                         <h4 class="font-bold mb-2 dark:text-white"><i class="fa-solid fa-chalkboard-user text-blue-500 mr-2"></i>Professores</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Projete a tela em sala de aula para demonstrar estruturas de repetição visualmente.</p>
                     </div>
                     <div class="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-md border-t-4 border-green-500">
                         <h4 class="font-bold mb-2 dark:text-white"><i class="fa-solid fa-briefcase text-green-500 mr-2"></i>Entrevistas</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Pratique algoritmos de "whiteboard" para testes técnicos de emprego.</p>
                     </div>
                     <div class="bg-white dark:bg-dark-panel p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                         <h4 class="font-bold mb-2 dark:text-white"><i class="fa-solid fa-lightbulb text-purple-500 mr-2"></i>Hobbyistas</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Crie pequenos jogos de texto e aventuras interativas para se divertir.</p>
                     </div>
                 </div>
            </div>
        </section>

        <CallToAction />
    </div>
</template>

<style scoped>
.perspective {
    perspective: 1000px;
}
</style>

