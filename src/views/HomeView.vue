<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 text-content">
            <h1 class="hero-title">ESTILO & RENDIMIENTO</h1>
            <p class="hero-subtitle">Descubre la colección que fusiona la última tecnología con el diseño más innovador.</p>
            <button class="btn btn-explore btn-lg mt-4" @click="scrollToProducts">VER COLECCIÓN</button>
          </div>
          <div class="col-lg-6 image-content">
            <div class="shoe-display">
              <transition name="slide-fade" mode="out-in">
                <img :src="currentImage" :key="currentImage" alt="Zapatilla destacada" class="main-shoe">
              </transition>
              <div class="decorative-shape"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div class="categories-section container text-center">
      <h2 class="section-title">CATEGORÍAS</h2>
      <div class="row mt-5">
        <div class="col-md-4">
          <router-link :to="{ name: 'category', params: { categoryName: 'Lifestyle' } }" class="text-decoration-none">
            <div class="category-card">
              <div class="category-image-wrapper">
                <img src="https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1030553-0001V1.jpg" alt="Lifestyle">
              </div>
              <h3>Lifestyle</h3>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link :to="{ name: 'category', params: { categoryName: 'Running' } }" class="text-decoration-none">
            <div class="category-card">
              <div class="category-image-wrapper">
                <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop" alt="Running">
              </div>
              <h3>Running</h3>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link :to="{ name: 'category', params: { categoryName: 'Basketball' } }" class="text-decoration-none">
            <div class="category-card">
              <div class="category-image-wrapper">
                <img src="https://ae01.alicdn.com/kf/S0208b1527b094d638eae3d1ef1207b23z.jpg" alt="Basketball">
              </div>
              <h3>Basketball</h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <div class="container text-center mt-5 pt-5">
      <h2 class="section-title">NUESTRA COLECCIÓN</h2>
    </div>
    <div id="products-grid" class="container mt-4">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 g-lg-5">
        <ProductCard 
          v-for="(product, index) in products" 
          :key="product.id" 
          :product="product"
          class="fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { products } from '../products'
import ProductCard from '../components/ProductCard.vue'

const scrollToProducts = () => {
  document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })
}

const heroImages = computed(() => products.map(p => p.image));
const currentImageIndex = ref(0);
let intervalId = null;

const currentImage = computed(() => heroImages.value[currentImageIndex.value]);

onMounted(() => {
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.value.length;
  }, 3000); // Cambia la imagen cada 3 segundos
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<style scoped>
.home-view {
  background-color: #f8f9fa;
  color: #333;
}

/* Hero Section */
.hero-section {
  padding: 6rem 0;
  background-color: #fff;
  overflow: hidden;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.1;
  color: #222;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-top: 1.5rem;
}

.btn-explore {
  background: linear-gradient(45deg, #ff0077, #ff6600);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(255, 0, 119, 0.4);
}

.btn-explore:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 0, 119, 0.6);
}

.image-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shoe-display {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 400px; /* Altura fija para el contenedor de la imagen */
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-15deg);
}

.main-shoe {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Asegura que la imagen se vea completa */
  border-radius: 20px;
  position: relative;
  z-index: 2;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.decorative-shape {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #e9ecef, #dee2e6);
  border-radius: 30px;
  z-index: 1;
  transform: translate(-50%, -50%) rotate(10deg);
}


/* Transition styles */
.slide-fade-enter-active {
  transition: all .6s ease-out;
}

.slide-fade-leave-active {
  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px) scale(0.9);
  opacity: 0;
}

/* Categories Section */
.categories-section {
  padding: 6rem 0;
}

.category-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
}

.category-image-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.category-image-wrapper img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.category-card:hover img {
  transform: scale(1.1);
}

.category-card h3 {
  font-weight: 700;
  color: #444;
}

/* General Section Title */
.section-title {
  font-weight: 900;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 5px;
  background: linear-gradient(45deg, #ff0077, #ffcc00);
  border-radius: 5px;
}

/* Products Grid */
#products-grid {
  padding-bottom: 4rem;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>