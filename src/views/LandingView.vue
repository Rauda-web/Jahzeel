<template>
  <div class="landing-page" ref="landingContainer">
    <!-- Fondo oscuro con tenis animados -->
    <div class="sneakers-bg">
      <span v-for="i in 18" :key="i" class="sneaker-float" :class="`sneaker-${i}`">👟</span>
    </div>
    <div class="overlay"></div>
    <div class="content text-center" :style="contentStyle">
      <h1 class="display-3 fw-bold text-uppercase hero-title">
        <span class="word word-1">EL</span>
        <span class="word word-2">RITMO</span>
        <span class="word word-3">TE</span>
        <span class="word word-4">DEFINE</span>
      </h1>
      <p class="lead my-4 fade-in">Hechas para el movimiento. Diseñadas para ti.</p>
      <button @click="goToStore" class="btn btn-sporty btn-lg pulse">ENTRAR A LA TIENDA</button>
    </div>
  </div>
</template>

<script setup>
// 🌟 Importamos nextTick 🌟
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue' 
import { useRouter } from 'vue-router' 

const mouseX = ref(0)
const mouseY = ref(0)
const router = useRouter() // Inicializamos el router

const handleMouseMove = (event) => {
  mouseX.value = event.clientX - window.innerWidth / 2
  mouseY.value = event.clientY - window.innerHeight / 2
}

// 🌟 SOLUCIÓN DEFINITIVA: Usar nextTick y navegación por nombre 🌟
const goToStore = () => {
    // nextTick asegura que cualquier cambio en el DOM pendiente se procese antes de navegar.
    nextTick(() => {
        // Navegamos usando el nombre de la ruta ('home') para una resolución más estable.
        router.push({ name: 'home' }); 
    });
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
/* ── Contenedor principal ── */
.landing-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background: #0a0a0a;
}

/* ── Overlay oscuro ── */
.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%);
  z-index: 1;
}

/* ── Fondo de tenis flotantes ── */
.sneakers-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  z-index: 0;
}

.sneaker-float {
  position: absolute;
  font-size: clamp(2rem, 5vw, 5rem);
  opacity: 0.08;
  filter: grayscale(80%) brightness(0.6);
  animation: floatSneaker linear infinite;
  user-select: none;
  pointer-events: none;
}

/* Posiciones y configuraciones únicas para cada tenis */
.sneaker-1  { left:  5%; top: 10%; font-size: 3.5rem; animation-duration: 18s; animation-delay: 0s;    transform: rotate(-25deg); }
.sneaker-2  { left: 20%; top: 70%; font-size: 2.8rem; animation-duration: 22s; animation-delay: -4s;   transform: rotate(15deg); }
.sneaker-3  { left: 40%; top: 15%; font-size: 4rem;   animation-duration: 16s; animation-delay: -8s;   transform: rotate(-10deg); }
.sneaker-4  { left: 65%; top: 80%; font-size: 3rem;   animation-duration: 24s; animation-delay: -2s;   transform: rotate(30deg); }
.sneaker-5  { left: 80%; top: 20%; font-size: 4.5rem; animation-duration: 20s; animation-delay: -12s;  transform: rotate(-40deg); }
.sneaker-6  { left: 92%; top: 55%; font-size: 2.5rem; animation-duration: 14s; animation-delay: -6s;   transform: rotate(20deg); }
.sneaker-7  { left: 10%; top: 45%; font-size: 5rem;   animation-duration: 26s; animation-delay: -3s;   transform: rotate(-15deg); }
.sneaker-8  { left: 55%; top: 40%; font-size: 2.2rem; animation-duration: 19s; animation-delay: -9s;   transform: rotate(45deg); }
.sneaker-9  { left: 30%; top: 88%; font-size: 3.8rem; animation-duration: 21s; animation-delay: -1s;   transform: rotate(-35deg); }
.sneaker-10 { left: 75%; top:  5%; font-size: 3.2rem; animation-duration: 17s; animation-delay: -7s;   transform: rotate(10deg); }
.sneaker-11 { left: 48%; top: 60%; font-size: 4.2rem; animation-duration: 23s; animation-delay: -5s;   transform: rotate(-20deg); }
.sneaker-12 { left: 85%; top: 75%; font-size: 2.9rem; animation-duration: 15s; animation-delay: -11s;  transform: rotate(50deg); }
.sneaker-13 { left:  2%; top: 82%; font-size: 3.6rem; animation-duration: 20s; animation-delay: -14s;  transform: rotate(-30deg); }
.sneaker-14 { left: 60%; top: 92%; font-size: 2.6rem; animation-duration: 25s; animation-delay: -2s;   transform: rotate(25deg); }
.sneaker-15 { left: 15%; top: 28%; font-size: 4.8rem; animation-duration: 18s; animation-delay: -10s;  transform: rotate(-5deg); }
.sneaker-16 { left: 72%; top: 38%; font-size: 2.4rem; animation-duration: 13s; animation-delay: -8s;   transform: rotate(60deg); }
.sneaker-17 { left: 38%; top:  3%; font-size: 3.1rem; animation-duration: 22s; animation-delay: -6s;   transform: rotate(-45deg); }
.sneaker-18 { left: 90%; top: 10%; font-size: 3.9rem; animation-duration: 16s; animation-delay: -13s;  transform: rotate(35deg); }

@keyframes floatSneaker {
  0%   { transform: translateY(0px)   rotate(var(--r, -20deg)) scale(1);    opacity: 0.06; }
  25%  { transform: translateY(-30px) rotate(var(--r, -20deg)) scale(1.05); opacity: 0.11; }
  50%  { transform: translateY(-15px) rotate(var(--r, -20deg)) scale(1);    opacity: 0.07; }
  75%  { transform: translateY(-40px) rotate(var(--r, -20deg)) scale(1.08); opacity: 0.12; }
  100% { transform: translateY(0px)   rotate(var(--r, -20deg)) scale(1);    opacity: 0.06; }
}

/* ── Contenido ── */
.content {
  color: var(--light-color);
  transition: transform 0.1s linear;
  position: relative;
  z-index: 2;
}

/* ── Título con mayor espaciado entre palabras ── */
.hero-title {
  text-shadow: 3px 3px 8px rgba(0,0,0,0.9);
  letter-spacing: 6px;
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px);
}
.word-1 { animation: slideInUp 0.6s 0.2s forwards ease-out; }
.word-2 { animation: slideInUp 0.6s 0.4s forwards ease-out; }
.word-3 { animation: slideInUp 0.6s 0.6s forwards ease-out; }
.word-4 { animation: slideInUp 0.8s 0.8s forwards ease-out; color: var(--primary-color); }

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