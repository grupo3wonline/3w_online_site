<template>
    <div class="w-full max-w-[900px] mx-auto flex justify-center py-10">
        <iframe
        title="Feedback Form"
        src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
        class="w-full h-[530px] border-0 rounded-xl shadow-lg"
        style="max-width:900px;"
        ></iframe>
    </div>

     <!-- Informações Adicionais -->
    <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-6">
      <div class="flex items-start space-x-3">
        <span class="text-2xl">💡</span>
        <div>
          <h3 class="font-semibold text-blue-900 mb-2">Dicas para um atendimento mais rápido:</h3>
          <ul class="text-blue-800 text-sm space-y-1">
            <li>• Descreva o problema com detalhes</li>
            <li>• Informe o navegador que está usando</li>
            <li>• Inclua prints se necessário</li>
            <li>• Seja específico sobre o que esperava que acontecesse</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Success/Error Messages -->
    <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center space-x-2">
        <span class="text-green-600">✅</span>
        <p class="text-green-800 font-medium">Mensagem enviada com sucesso!</p>
      </div>
      <p class="text-green-700 text-sm mt-1">
        Obrigado pelo seu contato. Retornaremos em breve!
      </p>
    </div>
    
    <div v-if="showError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center space-x-2">
        <span class="text-red-600">❌</span>
        <p class="text-red-800 font-medium">Erro ao enviar mensagem</p>
      </div>
      <p class="text-red-700 text-sm mt-1">
        Tente novamente ou entre em contato por email.
      </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  acceptPrivacy: boolean
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
  acceptPrivacy: false
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const isFormValid = computed(() => {
  return form.value.name.trim() && 
         form.value.email.trim() && 
         form.value.subject && 
         form.value.message.trim() && 
         form.value.acceptPrivacy &&
         form.value.message.length <= 500
})

const submitForm = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false
  
  try {
    // Simular envio (aqui você integraria com um serviço real)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Em produção, aqui seria a chamada para a API
    console.log('Formulário enviado:', form.value)
    
    showSuccess.value = true
    resetForm()
  } catch (error) {
    console.error('Erro ao enviar:', error)
    showError.value = true
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
    acceptPrivacy: false
  }
  showSuccess.value = false
  showError.value = false
}
</script>