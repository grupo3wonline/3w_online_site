<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const isScrolled = ref(false)

const checkScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
})

const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Ferramentas', path: '/ferramentas' },
    { name: 'Fale Conosco', path: '/contato' },
]
</script>

<template>
    <nav :class="[
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 dark:bg-dark-panel/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    ]">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="flex items-center gap-2 group">
                <div class="bg-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-microchip text-white text-xl"></i>
                </div>
                <div>
                    <h1 class="font-bold text-xl tracking-tight text-slate-800 dark:text-white">LogicFlow <span class="text-brand-600">Studio</span></h1>
                </div>
            </router-link>

            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-8 items-center">
                <router-link v-for="item in menuItems" :key="item.name" :to="item.path" 
                    class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-brand-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                    active-class="text-brand-600 dark:text-brand-400 after:w-full"
                >
                    {{ item.name }}
                </router-link>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="isOpen = !isOpen" class="md:hidden text-slate-700 dark:text-gray-200 hover:text-brand-600 focus:outline-none">
                <i class="fa-solid fa-bars text-2xl"></i>
            </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div v-show="isOpen" class="md:hidden bg-white dark:bg-dark-panel border-t border-gray-200 dark:border-gray-700 shadow-xl absolute w-full">
            <div class="flex flex-col p-4 space-y-4">
                <router-link v-for="item in menuItems" :key="item.name" :to="item.path" @click="isOpen = false"
                    class="text-slate-600 dark:text-slate-300 hover:text-brand-600 font-medium block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                    active-class="text-brand-600 bg-brand-50 dark:bg-slate-800"
                >
                    {{ item.name }}
                </router-link>
            </div>
        </div>
    </nav>
</template>
