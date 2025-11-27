<template>
  <div id="app-wrapper">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <main :style="mainStyle">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- 🦶 AQUÍ AÑADIMOS EL FOOTER 🦶 -->
    <Footer v-if="!$route.meta.hideNavbar" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './views/Footer.vue'

const route = useRoute()

const mainStyle = computed(() => {
  if (!route.meta.hideNavbar) {
    return { paddingTop: '100px' }
  }
  return {}
})
</script>

<style>
/* 2. Estilos para asegurar que el footer se quede abajo */
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1; /* Empuja el footer hacia el final de la página */
}

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