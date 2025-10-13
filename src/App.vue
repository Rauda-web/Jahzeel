<template>
  <Navbar v-if="!$route.meta.hideNavbar" />
  <main :style="mainStyle" :class="{ 'container py-4': !$route.meta.hideNavbar }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const mainStyle = computed(() => {
  if (!route.meta.hideNavbar) {
    return { paddingTop: '100px' }
  }
  return {}
})
</script>

<style>
/* Estilos de la transición de página */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>