<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 mt-auto">
        <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-1">
                <div class="flex items-center gap-2 mb-4">
                    <div class="bg-brand-600 p-1.5 rounded shadow-lg shadow-brand-500/20">
                        <i class="fa-solid fa-microchip text-white text-lg"></i>
                    </div>
                    <span class="font-bold text-lg text-white">LogicFlow <span class="text-brand-500">Studio</span></span>
                </div>
                <p class="text-sm mb-4">
                    Plataforma inovadora para ensino de lógica de programação. Aprenda visualizando, codificando e praticando.
                </p>
                <div class="flex space-x-4">
                    <a href="#" class="hover:text-white transition"><i class="fa-brands fa-instagram text-xl"></i></a>
                    <a href="#" class="hover:text-white transition"><i class="fa-brands fa-linkedin text-xl"></i></a>
                    <a href="#" class="hover:text-white transition"><i class="fa-brands fa-github text-xl"></i></a>
                </div>
            </div>

            <div>
                <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h4>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/sobre" class="hover:text-brand-400 transition">Sobre Nós</router-link></li>
                    <li><router-link to="/servicos" class="hover:text-brand-400 transition">Serviços</router-link></li>
                    <li><a href="https://www.3wonline.com.br" target="_blank" class="hover:text-brand-400 transition">Grupo 3w Online</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-brand-400 transition">Termos de Uso</a></li>
                    <li><a href="#" class="hover:text-brand-400 transition">Política de Privacidade</a></li>
                    <li><a href="#" class="hover:text-brand-400 transition">LGPD</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contato</h4>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2"><i class="fa-solid fa-envelope w-4"></i> contato@3wonline.com.br</li>
                    <li class="flex items-center gap-2"><i class="fa-solid fa-link w-4"></i> www.3wonline.com.br</li>
                </ul>
            </div>
        </div>
        <div class="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {{ currentYear }} LogicFlow Studio. Desenvolvido por <a href="https://www.3wonline.com.br" target="_blank" class="text-brand-500 hover:underline">Grupo 3w Online</a>.</p>
        </div>
    </footer>
</template>
