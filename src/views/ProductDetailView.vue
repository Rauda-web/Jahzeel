<template>
  <div class="product-detail-view container" v-if="product">
    <div class="row">
      <!-- Product Image -->
      <div class="col-lg-6">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="img-fluid product-image">
        </div>
      </div>

      <!-- Product Info -->
      <div class="col-lg-6">
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-price">${{ product.price }}</p>
          <div class="product-specs">
            <h4>Especificaciones</h4>
            <p>{{ product.specifications }}</p>
          </div>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-primary btn-lg" @click="addToCart">Añadir al Carrito</button>
            <button class="btn btn-success btn-lg" @click="buyNow">Comprar Ya</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="isReady" class="related-products mt-5">
      <h3 class="text-center">Productos Relacionados</h3>
      <div class="row mt-4">
        <div class="col-md-4" v-for="related in relatedProducts" :key="related.id">
          <ProductCard :product="related" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-5">
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../products'
import { useCartStore } from '../store'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const isReady = ref(false)

onMounted(() => {
  isReady.value = true
})

const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id))
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 3)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    alert(`${product.value.name} ha sido añadido al carrito.`)
  }
}

const buyNow = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    router.push('/cart')
  }
}
</script>

<style scoped>
.product-detail-view {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.product-image-container {
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-height: 500px;
  object-fit: contain;
}

.product-info {
  padding: 2rem;
}

.product-name {
  font-weight: 800;
  font-size: 2.5rem;
  color: #333;
}

.product-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-top: 1rem;
}

.product-specs {
  margin-top: 2rem;
}

.product-specs h4 {
  font-weight: 700;
  margin-bottom: 1rem;
}

.related-products {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid #eee;
}

.related-products h3 {
  font-weight: 800;
}
</style>