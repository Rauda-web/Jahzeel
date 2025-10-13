<template>
  <div class="col product-wrapper">
    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="text-decoration-none">
      <div class="product-container h-100">
        <div class="card-img-container">
          <img :src="product.image" class="card-img-top" :alt="product.name">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title mt-3">{{ product.name }}</h5>
          <p class="card-text fs-4 fw-bold">${{ product.price }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
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
  overflow: hidden;
}

.card-img-top {
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
</style>