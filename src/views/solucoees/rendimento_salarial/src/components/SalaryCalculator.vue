<template>
  <div class="calculator-app">
    <AppHeader />

    <!-- Calculator Section -->
    <CalculatorSection 
      v-if="activeTab === 'calculator'"
      @salary-calculated="handleSalaryCalculated"
    />

    <!-- Features Section -->
    <FeaturesSection v-if="activeTab === 'features'" />

    <!-- About Section -->
    <AboutSection v-if="activeTab === 'about'" />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import CalculatorSection from './CalculatorSection.vue'
import FeaturesSection from './FeaturesSection.vue'
import AboutSection from './AboutSection.vue'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'

export default {
  name: 'SalaryCalculator',
  components: {
    CalculatorSection,
    FeaturesSection,
    AboutSection,
    AppFooter,
    AppHeader
  },
  data() {
    return {
      activeTab: 'calculator'
    }
  },
  methods: {
    handleSalaryCalculated(data) {
      // Handle salary calculation results
      console.log('Salary calculated:', data)
    }
  }
}
</script>

<style scoped>
.calculator-app {
  min-height: 100vh;
}
</style>
