<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ModalitiesSection from '@/components/sections/ModalitiesSection.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <CapabilitiesSection />
    <ModalitiesSection />
  </main>
  <AppFooter />
</template>
