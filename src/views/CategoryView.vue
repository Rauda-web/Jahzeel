<template>
  <div class="category-view container mt-5">
    <h1 class="category-title text-center mb-5">Categoría: {{ categoryName }}</h1>
    <div v-if="filteredProducts.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 g-lg-5">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else class="text-center">
      <p>No se encontraron productos en esta categoría.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../products'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const categoryName = computed(() => route.params.categoryName)

const filteredProducts = computed(() => {
  return products.filter(p => p.category === categoryName.value)
})
</script>

<style scoped>
.category-view {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.category-title {
  font-weight: 900;
  text-transform: uppercase;
  color: #333;
}
</style>