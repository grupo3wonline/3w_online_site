<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Central de Ferramentas Inteligentes</h1>
        <p class="text-gray-600">Configure suas chaves e acesse o poder da IA.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <nav class="flex flex-col">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="currentTab = tab.id"
                class="px-6 py-4 text-left font-medium transition-colors border-l-4 focus:outline-none flex items-center gap-3"
                :class="currentTab === tab.id ? 'bg-primary-50 text-primary-700 border-primary-600' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'"
              >
                <font-awesome-icon :icon="tab.icon" class="w-5" />
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 min-h-[500px]">
            
            <!-- Settings Tab -->
            <div v-if="currentTab === 'settings'" class="animate-fade-in">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'cog']" class="text-primary-500" />
                Configuração de API Keys
              </h2>
              <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p class="text-sm text-blue-700">
                  <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-1" />
                  Suas chaves são salvas apenas no seu navegador (LocalStorage) e nunca são enviadas para nossos servidores.
                </p>
              </div>

              <div class="space-y-6">
                <!-- Google Gemini -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Google Gemini API Key</label>
                  <div class="relative">
                    <input 
                      type="password" 
                      v-model="geminiKeyInput"
                      @change="updateGemini"
                      autocomplete="off"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Cole sua chave aqui..."
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" v-if="geminiKeyInput">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Para usar modelos como gemini-2.0-flash</p>
                </div>

                <!-- Groq -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Groq API Key</label>
                  <div class="relative">
                    <input 
                      type="password" 
                      v-model="groqKeyInput"
                      @change="updateGroq"
                      autocomplete="off"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Cole sua chave aqui..."
                    />
                     <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" v-if="groqKeyInput">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
                    </div>
                  </div>
                   <p class="text-xs text-gray-500 mt-1">Para usar modelos Llama via Groq (super rápido)</p>
                </div>

                <!-- OpenRouter -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">OpenRouter API Key</label>
                   <div class="relative">
                    <input 
                      type="password" 
                      v-model="openRouterKeyInput"
                      @change="updateOpenRouter"
                      autocomplete="off"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Cole sua chave aqui..."
                    />
                     <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" v-if="openRouterKeyInput">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
                    </div>
                  </div>
                   <p class="text-xs text-gray-500 mt-1">Acesso a diversos modelos gratuitos e pagos</p>
                </div>
              </div>
            </div>

            <!-- Converter Tool Tab (SRT) -->
            <div v-else-if="currentTab === 'srt'" class="animate-fade-in">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                 <font-awesome-icon :icon="['fas', 'film']" class="text-primary-500" />
                 Conversor Roteiro para SRT
              </h2>
              <div class="space-y-4">
                <div>
                   <label class="block text-sm font-medium text-gray-700 mb-2">Cole seu Roteiro</label>
                   <textarea 
                      class="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                      placeholder="Cole o texto do seu vídeo aqui. Quebras de linha serão consideradas novas legendas."
                   ></textarea>
                </div>
                <div class="flex justify-end">
                   <button class="btn btn-primary" @click="simulateConversion">
                      <font-awesome-icon :icon="['fas', 'magic']" class="mr-2" />
                      Converter Agora
                   </button>
                </div>
              </div>
            </div>
             <!-- Chat Tab -->
             <div v-else-if="currentTab === 'chat'" class="animate-fade-in">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                   <font-awesome-icon :icon="['fas', 'robot']" class="text-primary-500" />
                   Chat AI
                </h2>
                <div class="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center text-gray-500 mb-4">
                   <p>Selecione um modelo e inicie a conversa (Funcionalidade Demo)</p>
                </div>
                <div class="flex gap-2">
                   <input type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Digite sua mensagem..." autocomplete="off">
                   <button class="btn btn-primary">Enviar</button>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAiStore } from '@/stores/aiStore'
import Swal from 'sweetalert2'

const aiStore = useAiStore()
const currentTab = ref('settings')

const tabs = [
    { id: 'settings', name: 'Configurações & Chaves', icon: ['fas', 'cog'] },
    { id: 'srt', name: 'Conversor SRT', icon: ['fas', 'film'] },
    { id: 'chat', name: 'Chat AI (Beta)', icon: ['fas', 'robot'] },
]

const geminiKeyInput = ref('')
const groqKeyInput = ref('')
const openRouterKeyInput = ref('')

onMounted(() => {
    geminiKeyInput.value = aiStore.geminiKey
    groqKeyInput.value = aiStore.groqKey
    openRouterKeyInput.value = aiStore.openRouterKey
})

const updateGemini = () => {
    aiStore.setGeminiKey(geminiKeyInput.value)
    toastSuccess('Chave Gemini Salva!')
}

const updateGroq = () => {
    aiStore.setGroqKey(groqKeyInput.value)
    toastSuccess('Chave Groq Salva!')
}

const updateOpenRouter = () => {
    aiStore.setOpenRouterKey(openRouterKeyInput.value)
    toastSuccess('Chave OpenRouter Salva!')
}

const toastSuccess = (title) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })
}

const simulateConversion = () => {
    Swal.fire({
        title: 'Convertendo...',
        text: 'Aguarde enquanto processamos seu roteiro.',
        timer: 2000,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Seu arquivo SRT foi gerado com sucesso.',
            confirmButtonText: 'Baixar Arquivo',
            confirmButtonColor: '#7c3aed'
        })
    })
}

</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
