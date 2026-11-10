<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
    if (!localStorage.getItem('lgpd_consent')) {
        setTimeout(() => {
            isVisible.value = true
        }, 1000)
    }
})

const accept = () => {
    localStorage.setItem('lgpd_consent', 'true')
    isVisible.value = false
}
</script>

<template>
    <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-900/95 backdrop-blur border-t border-slate-700 shadow-2xl transition-all duration-500 animate-[slideUp_0.5s_ease-out]">
        <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-start gap-4">
                <div class="bg-brand-900/50 p-3 rounded-full hidden sm:block">
                    <i class="fa-solid fa-cookie-bite text-brand-400 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-white font-bold text-base mb-1">Valorizamos sua Privacidade</h3>
                    <p class="text-slate-400 text-sm leading-relaxed max-w-2xl">
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar tráfego e personalizar conteúdo. 
                        Ao continuar navegando, você concorda com nossa <a href="#" class="text-brand-400 hover:underline">Política de Privacidade</a> e <a href="#" class="text-brand-400 hover:underline">Termos de Uso</a>.
                    </p>
                </div>
            </div>
            <div class="flex gap-4 w-full md:w-auto">
                <button @click="accept" class="flex-1 md:flex-none bg-brand-600 hover:bg-brand-500 text-white font-medium px-8 py-3 rounded-lg transition shadow-lg shadow-brand-900/20 whitespace-nowrap">
                    Aceitar Cookies
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>
