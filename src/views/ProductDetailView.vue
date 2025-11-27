<template>
  <div class="product-detail-view container" v-if="product">
    <div class="row">
      <div class="col-lg-6">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="img-fluid product-image">
        </div>
      </div>

      <div class="col-lg-6">
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>
          
          <p class="product-price">
            {{ currencyStore.selectedCurrency }} 
            {{ convertedProductPrice.toFixed(2) }} 
            <small v-if="currencyStore.selectedCurrency !== 'USD'" class="d-block text-muted">(Precio Base: USD {{ product.price }})</small>
          </p>
          
          <div class="mb-4">
            <label class="d-block mb-2">Talla:</label>
            <div class="btn-group mb-2">
              <button 
                class="btn" 
                :class="sizeSystem === 'US' ? 'btn-dark' : 'btn-outline-dark'"
                @click="sizeSystem = 'US'"
              >US</button>
              <button 
                class="btn" 
                :class="sizeSystem === 'MX' ? 'btn-dark' : 'btn-outline-dark'"
                @click="sizeSystem = 'MX'"
              >MX</button>
            </div>
            <select 
                id="size-select" 
                class="form-select w-auto" 
                v-model="selectedSize"
            >
                <option :value="null" disabled>Selecciona una talla</option>
                <option v-for="size in availableSizes" :key="size" :value="size">
                    {{ size }}
                </option>
            </select>
          </div>
          
          <button class="btn btn-link p-0 mb-4" @click="showGuide = !showGuide">
              {{ showGuide ? 'Ocultar Guía de Tallas' : 'Ver Guía de Tallas' }}
          </button>
          
          <div v-if="showGuide" class="mt-4">
              <SizeGuide />
          </div>

          <div class="product-specs mt-5">
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
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../products'
import { useCartStore } from '../store'
import ProductCard from '../components/ProductCard.vue'
import SizeGuide from '../components/SizeGuide.vue' 
import { useCurrencyStore } from '../store/currencyStore'
import sizes from '../assets/sizes.json'

import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore() 
const toast = useToast()

const isReady = ref(false)
const showGuide = ref(false) 
const selectedSize = ref(null) 
const sizeSystem = ref('US') // 'US' o 'MX'
onMounted(() => {
  isReady.value = true
})
const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id))
})
// CLAVE: Calcula el precio usando la función del Store (para mostrar en la vista)
const convertedProductPrice = computed(() => {
    if (!product.value) return 0;
    return currencyStore.convertedPrice(product.value.price);
});
const availableSizes = computed(() => {
  if (!product.value || !product.value.gender) return []
  const genderSizes = sizes.find(s => s.category === product.value.gender)
  if (!genderSizes) return []
  return genderSizes.table.map(size => {
    return sizeSystem.value === 'US' ? `US ${size.US}` : `MX ${size.CM}`
  })
})
watch(sizeSystem, () => {
  selectedSize.value = null
})
const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 3)
})
// 🌟 FUNCIÓN CORREGIDA: Incluye Talla, Moneda y Precio Unitario convertido 🌟
const addToCart = () => {
  if (!selectedSize.value) {
    toast.error("Por favor, selecciona una talla antes de añadir al carrito.")
    return
  }
  if (product.value) {
    cartStore.addToCart({
        ...product.value, 
        selectedSize: selectedSize.value,
        // 🌟 CLAVE: Enviamos la moneda y el precio actual convertido 🌟
        selectedCurrency: currencyStore.selectedCurrency, 
        unitPrice: convertedProductPrice.value // El precio ya convertido en esa moneda
    })
    toast.success(`${product.value.name} (Talla: ${selectedSize.value}) ha sido añadido al carrito.`)
  }
}
// 🌟 FUNCIÓN CORREGIDA: Incluye Talla, Moneda y Precio Unitario convertido 🌟
const buyNow = () => {
  if (!selectedSize.value) {
    toast.error("Por favor, selecciona una talla antes de comprar.")
    return
  }
  if (product.value) {
    cartStore.addToCart({
        ...product.value, 
        selectedSize: selectedSize.value,
        // 🌟 CLAVE: Enviamos la moneda y el precio actual convertido 🌟
        selectedCurrency: currencyStore.selectedCurrency, 
        unitPrice: convertedProductPrice.value // El precio ya convertido en esa moneda
    })
    router.push('/cart')
  }
}
</script>

<style scoped>
/* CORRECCIÓN: Asegura que el contenido no esté solapado por el navbar fixed-top */
.product-detail-view {
  padding-top: 8rem; 
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