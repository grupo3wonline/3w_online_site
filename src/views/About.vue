<template>
  <div>
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Home</router-link>
          <ChevronRightIcon class="w-4 h-4 breadcrumb-separator" />
          <span>Sobre</span>
        </div>
        <h1 class="page-hero-title">Sobre a 3W Online</h1>
        <p class="page-hero-subtitle">
          Sua parceira em soluções digitais e marketing há mais de 5 anos
        </p>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="section-padding">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">Nossa História</h2>
            <p class="text-lg text-gray-600 mb-6">
              A 3W Online nasceu da paixão por transformar negócios através da tecnologia e do marketing digital. 
              Fundada em 2019, nossa empresa tem como missão ajudar empresas de todos os portes a alcançarem 
              seus objetivos através de soluções digitais inovadoras e estratégias de marketing eficazes.
            </p>
            <p class="text-lg text-gray-600 mb-8">
              Com uma equipe multidisciplinar de especialistas em marketing digital, desenvolvimento web, 
              design e consultoria empresarial, oferecemos um portfólio completo de serviços que abrange 
              desde a criação de sites até a gestão completa de campanhas publicitárias.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Nossa Missão</h3>
                <p class="text-gray-600">
                  Transformar ideias em resultados concretos, oferecendo soluções digitais que impulsionam 
                  o crescimento e o sucesso dos nossos clientes.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Nossa Visão</h3>
                <p class="text-gray-600">
                  Ser reconhecida como a principal referência em soluções digitais integradas, 
                  contribuindo para o crescimento sustentável dos negócios.
                </p>
              </div>
            </div>
          </div>
          <div class="about-image">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Equipe 3W Online"
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Values Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="section-title">Nossos Valores</h2>
          <p class="section-subtitle">Os princípios que guiam nosso trabalho</p>
        </div>
        
        <div class="values-grid">
          <div class="value-card">
            <LightBulbIcon class="value-icon" />
            <h3 class="value-title">Inovação</h3>
            <p class="value-description">
              Buscamos constantemente novas tecnologias e metodologias para oferecer as melhores soluções.
            </p>
          </div>
          
          <div class="value-card">
            <HeartIcon class="value-icon" />
            <h3 class="value-title">Compromisso</h3>
            <p class="value-description">
              Dedicação total aos projetos dos nossos clientes, tratando cada desafio como nosso.
            </p>
          </div>
          
          <div class="value-card">
            <StarIcon class="value-icon" />
            <h3 class="value-title">Excelência</h3>
            <p class="value-description">
              Qualidade em cada detalhe, desde o primeiro contato até a entrega final do projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Team Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="section-title">Nossa Equipe</h2>
          <p class="section-subtitle">Profissionais especializados e apaixonados pelo que fazem</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserIcon class="w-16 h-16 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Marketing Digital</h3>
            <p class="text-gray-600">Especialistas em estratégias digitais e gestão de campanhas</p>
          </div>
          
          <div class="text-center">
            <div class="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CodeBracketIcon class="w-16 h-16 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Desenvolvimento</h3>
            <p class="text-gray-600">Desenvolvedores experientes em tecnologias modernas</p>
          </div>
          
          <div class="text-center">
            <div class="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <PaintBrushIcon class="w-16 h-16 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Design</h3>
            <p class="text-gray-600">Designers criativos focados em experiência do usuário</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-6">
            Vamos trabalhar juntos?
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contato" class="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              Falar Conosco
            </router-link>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de conhecer melhor a 3W Online."
              target="_blank"
              class="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronRightIcon,
  LightBulbIcon,
  HeartIcon,
  StarIcon,
  UserIcon,
  CodeBracketIcon,
  PaintBrushIcon
} from '@heroicons/vue/24/outline'
</script>