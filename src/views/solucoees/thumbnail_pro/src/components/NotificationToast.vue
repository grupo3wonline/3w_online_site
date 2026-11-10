<template>
  <Teleport to="body">
    <Transition name="notification" appear>
      <div
        v-if="visible"
        class="fixed top-4 right-4 z-50 max-w-sm w-full"
      >
        <div
          :class="[
            'rounded-lg shadow-lg border p-4 flex items-start space-x-3',
            notificationClass
          ]"
        >
          <!-- Ícone -->
          <div class="flex-shrink-0">
            <CheckCircle v-if="type === 'success'" class="w-6 h-6 text-green-600" />
            <AlertCircle v-else-if="type === 'error'" class="w-6 h-6 text-red-600" />
            <Info v-else-if="type === 'info'" class="w-6 h-6 text-blue-600" />
            <AlertTriangle v-else-if="type === 'warning'" class="w-6 h-6 text-yellow-600" />
          </div>
          
          <!-- Conteúdo -->
          <div class="flex-1 min-w-0">
            <h4 v-if="title" class="text-sm font-medium mb-1" :class="titleClass">
              {{ title }}
            </h4>
            <p class="text-sm" :class="messageClass">
              {{ message }}
            </p>
          </div>
          
          <!-- Botão de fechar -->
          <button
            @click="close"
            class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

export default {
  name: 'NotificationToast',
  components: {
    CheckCircle,
    AlertCircle,
    Info,
    AlertTriangle,
    X
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(false)
    
    const notificationClass = computed(() => {
      const classes = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-yellow-50 border-yellow-200',
        info: 'bg-blue-50 border-blue-200'
      }
      return classes[props.type]
    })
    
    const titleClass = computed(() => {
      const classes = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800'
      }
      return classes[props.type]
    })
    
    const messageClass = computed(() => {
      const classes = {
        success: 'text-green-700',
        error: 'text-red-700',
        warning: 'text-yellow-700',
        info: 'text-blue-700'
      }
      return classes[props.type]
    })
    
    const close = () => {
      visible.value = false
      setTimeout(() => {
        emit('close')
      }, 300)
    }
    
    onMounted(() => {
      visible.value = true
      
      if (!props.persistent && props.duration > 0) {
        setTimeout(() => {
          close()
        }, props.duration)
      }
    })
    
    return {
      visible,
      notificationClass,
      titleClass,
      messageClass,
      close
    }
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
