<template>
  <div class="landing-page" ref="landingContainer">
    <video class="video-background" autoplay loop muted playsinline>
      <source src="https://videos.pexels.com/video-files/854361/854361-hd.mp4" type="video/mp4">
      Tu navegador no soporta videos HTML5.
    </video>
    <div class="overlay"></div>
    <div class="content text-center" :style="contentStyle">
      <h1 class="display-3 fw-bold text-uppercase">
        <span class="word word-1">EL</span>
        <span class="word word-2">RITMO</span>
        <span class="word word-3">TE</span>
        <span class="word word-4">DEFINE</span>
      </h1>
      <p class="lead my-4 fade-in">Hechas para el movimiento. Diseñadas para ti.</p>
      <router-link to="/tienda" class="btn btn-sporty btn-lg pulse">ENTRAR A LA TIENDA</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (event) => {
  mouseX.value = event.clientX - window.innerWidth / 2
  mouseY.value = event.clientY - window.innerHeight / 2
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

const contentStyle = computed(() => ({
  transform: `translateX(${mouseX.value / 50}px) translateY(${mouseY.value / 50}px)`
}))
</script>

<style scoped>
.landing-page { height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; }
.video-background { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%); z-index: -2; }
.overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); z-index: -1; }

.content {
  color: var(--light-color);
  transition: transform 0.1s linear;
}

.content h1 {
  text-shadow: 3px 3px 8px rgba(0,0,0,0.7);
  letter-spacing: 2px;
}

.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px);
}
.word-1 { animation: slideInUp 0.6s 0.2s forwards ease-out; }
.word-2 { animation: slideInUp 0.6s 0.4s forwards ease-out; }
.word-3 { animation: slideInUp 0.6s 0.6s forwards ease-out; }
.word-4 { animation: slideInUp 0.6s 0.8s forwards ease-out; color: var(--primary-color); }

.fade-in {
  opacity: 0;
  animation: fadeIn 1s 1.2s forwards ease;
}

@keyframes slideInUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  to { opacity: 1; }
}

.btn-sporty {
  background-color: var(--primary-color);
  color: var(--dark-color);
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 1rem 2.5rem;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  opacity: 0;
  animation: fadeIn 1s 1.5s forwards ease;
}

.btn-sporty.pulse {
  animation: fadeIn 1s 1.5s forwards ease, pulse 2s infinite 2s;
}

.btn-sporty:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

@keyframes pulse {
  0% { box-shadow: 0 4px 15px rgba(255, 111, 0, 0.4); }
  50% { box-shadow: 0 4px 25px rgba(255, 111, 0, 0.8); }
  100% { box-shadow: 0 4px 15px rgba(255, 111, 0, 0.4); }
}
</style>