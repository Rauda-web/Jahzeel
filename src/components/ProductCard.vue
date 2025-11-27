<template>
  <div class="col product-wrapper">
    <div class="product-container h-100">
      <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="text-decoration-none">
        <div class="card-img-container">
          <img :src="product.image" class="card-img-top" :alt="product.name">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title mt-3">{{ product.name }}</h5>
          <p class="card-text fs-4 fw-bold">
            {{ currencyStore.selectedCurrency }} {{ currencyStore.convertedPrice(product.price).toFixed(2) }}
          </p>
        </div>
      </router-link>
      <div class="card-footer bg-transparent border-top-0 pb-3 px-3">
        <div v-if="!showSizeSelector" class="d-grid">
          <button @click.stop="showSizeSelector = true" class="btn btn-primary">
            Añadir al carrito
          </button>
        </div>
        <div v-else>
          <select class="form-select mb-2" v-model="selectedSize">
            <option :value="null" disabled>Selecciona una talla</option>
            <option v-for="size in availableSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
          <div class="d-grid">
            <button @click.stop="addToCart" class="btn btn-dark" :disabled="!selectedSize">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrencyStore } from '@/store/currencyStore'
import { useCartStore } from '../store'
import sizes from '../assets/sizes.json'
import { useToast } from 'vue-toastification'

const currencyStore = useCurrencyStore()
const cartStore = useCartStore()
const toast = useToast()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const showSizeSelector = ref(false)
const selectedSize = ref(null)

const availableSizes = computed(() => {
  if (!props.product || !props.product.gender) return []
  const genderSizes = sizes.find(s => s.category === props.product.gender)
  if (!genderSizes) return []
  // For simplicity, we'll use US sizes on the product card
  return genderSizes.table.map(size => `US ${size.US}`)
})

const addToCart = () => {
  if (!selectedSize.value) {
    toast.error("Por favor, selecciona una talla.")
    return
  }
  
  const convertedPrice = currencyStore.convertedPrice(props.product.price)

  cartStore.addToCart({
    ...props.product,
    selectedSize: selectedSize.value,
    selectedCurrency: currencyStore.selectedCurrency,
    unitPrice: convertedPrice
  })
  toast.success(`${props.product.name} (Talla: ${selectedSize.value}) añadido al carrito.`)
  showSizeSelector.value = false
  selectedSize.value = null
}
</script>

<style scoped>
.product-wrapper {
  background-color: transparent;
  border: none;
  padding: 1rem;
}

.product-container {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-container:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-img-container {
  height: 250px; /* Altura fija para la imagen */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que la imagen cubra el espacio sin deformarse */
  transition: transform 0.4s ease;
}

.product-container:hover .card-img-top {
  transform: scale(1.1);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  color: #333;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #ff0077;
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}
</style>