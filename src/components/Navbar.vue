<template>
  <nav class="navbar">
    <div class="container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          3W Online
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex navbar-nav">
          <router-link to="/" class="navbar-link">Home</router-link>
          <router-link to="/sobre" class="navbar-link">Sobre</router-link>
          <router-link to="/institucional" class="navbar-link">Institucional</router-link>
          
          <!-- Services Dropdown -->
          <div class="relative" @mouseenter="showServicesMenu = true" @mouseleave="showServicesMenu = false">
            <button class="navbar-link flex items-center">
              Serviços
              <ChevronDownIcon class="w-4 h-4 ml-1" />
            </button>
            
            <div v-show="showServicesMenu" class="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
              <router-link
                v-for="service in services"
                :key="service.path"
                :to="service.path"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              >
                {{ service.name }}
              </router-link>
            </div>
          </div>
          
          <router-link to="/portfolio" class="navbar-link">Portfólio</router-link>
          <router-link to="/blog" class="navbar-link">Blog</router-link>
          <router-link to="/contato" class="navbar-link">Contato</router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <div class="mobile-menu-header">
        <div class="navbar-brand">3W Online</div>
        <button @click="toggleMobileMenu" class="p-2">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      
      <div class="mobile-menu-nav">
        <router-link to="/" class="mobile-menu-link" @click="closeMobileMenu">Home</router-link>
        <router-link to="/sobre" class="mobile-menu-link" @click="closeMobileMenu">Sobre</router-link>
        <router-link to="/institucional" class="mobile-menu-link" @click="closeMobileMenu">Institucional</router-link>
        
        <!-- Mobile Services Menu -->
        <div>
          <button
            @click="showMobileServices = !showMobileServices"
            class="mobile-menu-link w-full text-left flex items-center justify-between"
          >
            Serviços
            <ChevronDownIcon class="w-4 h-4" :class="{ 'rotate-180': showMobileServices }" />
          </button>
          
          <div v-show="showMobileServices" class="bg-gray-50">
            <router-link
              v-for="service in services"
              :key="service.path"
              :to="service.path"
              class="block py-2 px-8 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              @click="closeMobileMenu"
            >
              {{ service.name }}
            </router-link>
          </div>
        </div>
        
        <router-link to="/portfolio" class="mobile-menu-link" @click="closeMobileMenu">Portfólio</router-link>
        <router-link to="/blog" class="mobile-menu-link" @click="closeMobileMenu">Blog</router-link>
        <router-link to="/contato" class="mobile-menu-link" @click="closeMobileMenu">Contato</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const showServicesMenu = ref(false)
const showMobileServices = ref(false)

const services = [
  { name: 'Marketing Digital Para seu Negócio', path: '/servicos/marketing-digital' },
  { name: 'Gestão de Redes Sociais', path: '/servicos/gestao-redes-sociais' },
  { name: 'Gestão de Anúncios', path: '/servicos/gestao-anuncios' },
  { name: 'Criação de Sites', path: '/servicos/criacao-sites' },
  { name: 'Criação de Sistemas', path: '/servicos/criacao-sistemas' },
  { name: 'Desenvolvimento de Apps', path: '/servicos/desenvolvimento-apps' },
  { name: 'Consultoria em Marketing', path: '/servicos/consultoria-marketing' },
  { name: 'Planejamento de Campanhas', path: '/servicos/planejamento-campanhas' },
  { name: 'Design Gráfico', path: '/servicos/design-grafico' },
  { name: 'Publicidade e Propaganda', path: '/servicos/publicidade' },
  { name: 'Organização Comercial', path: '/servicos/organizacao-comercial' },
  { name: 'Relações Públicas', path: '/servicos/relacoes-publicas' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  showMobileServices.value = false
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>