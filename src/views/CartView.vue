<template>
  <div class="cart-view container fade-in-up">
    <!-- 🌟 NUEVO: Mensaje de compra finalizada 🌟 -->
    <div v-if="checkoutComplete" class="text-center checkout-success-container">
      <i class="bi bi-check-circle-fill success-icon"></i>
      <h2 class="mt-4">¡Gracias por tu compra!</h2>
      <p class="text-muted">Hemos recibido tu pedido y lo estamos preparando. Recibirás una confirmación por correo electrónico en breve.</p>
      <router-link to="/tienda" class="btn btn-primary mt-3">Seguir comprando</router-link>
    </div>

    <!-- Contenido original del carrito, ahora con v-else -->
    <div v-else>
      <h1 class="mb-4 text-dark-contrast">TU EQUIPAMIENTO</h1>

      <div v-if="cartStore.cartItemCount === 0" class="text-center empty-cart-container">
        <i class="bi bi-cart-x-fill empty-cart-icon"></i>
        <h2 class="mt-4">Tu carrito está vacío</h2>
        <p class="text-muted">Parece que todavía no has añadido ningún producto. ¡Explora nuestro catálogo y encuentra tu próximo equipamiento!</p>
        <router-link to="/tienda" class="btn btn-primary mt-3">Ir a la tienda</router-link>
      </div>
      
      <div class="row">
        <div class="col-lg-8">
          <div class="d-flex justify-content-end align-items-center mb-3">
            <span class="me-2 text-dark-contrast">Tipo de talla:</span>
            <div class="btn-group">
              <button 
                class="btn btn-sm" 
                :class="sizeSystem === 'US' ? 'btn-primary' : 'btn-outline-secondary'"
                @click="cartStore.setSizeSystem('US')"
              >
                US
              </button>
              <button 
                class="btn btn-sm" 
                :class="sizeSystem === 'MX' ? 'btn-primary' : 'btn-outline-secondary'"
                @click="cartStore.setSizeSystem('MX')"
              >
                MEX
              </button>
            </div>
          </div>

          <div class="card items-card mb-4">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="item in cartStore.cartItems" :key="item.id + '-' + item.selectedSize" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <img :src="item.image" :alt="item.name" class="me-3 item-image">
                      <div class="item-details">
                        <h6 class="my-0">{{ item.name }}</h6>
                        <div class="d-flex align-items-center mt-2">
                          <small class="text-muted me-2">Talla:</small>
                          <select 
                            class="form-select form-select-sm size-selector" 
                            :value="item.selectedSize"
                            @change="updateSize(item, $event)"
                          >
                            <option v-for="size in getAvailableSizes(item.gender)" :key="size.US" :value="sizeSystem === 'US' ? `US ${size.US}` : `MX ${size.CM}`">
                              {{ sizeSystem === 'US' ? `US ${size.US}` : `MX ${size.CM}` }}
                            </option>
                          </select>
                        </div>
                        <small class="text-muted d-block mt-1">Cantidad: {{ item.quantity }}</small>
                      </div>
                    </div>
                    <div class="text-end">
                      <span class="fw-bold item-price">
                        {{ currencyStore.selectedCurrency }} {{ (currencyStore.convertedPrice(item.price) * item.quantity).toFixed(2) }}
                      </span>
                      <button class="btn btn-sm btn-danger ms-3" @click="cartStore.removeFromCart(item.id, item.selectedSize)">
                         <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card summary-card">
            <div class="card-body">
              <h5 class="card-title mb-3">RESUMEN</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>{{ currencyStore.selectedCurrency }} {{ cartStore.cartTotal.toFixed(2) }}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Envío</span>
                  <strong>Gratis</strong>
                </li>
                <li class="list-group-item total-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>{{ currencyStore.selectedCurrency }} {{ cartStore.cartTotal.toFixed(2) }}</strong>
                </li>
              </ul>
              
              <hr class="my-4">

              <h5 class="card-title mb-3">DATOS DE ENVÍO</h5>
              <form @submit.prevent="handleCheckout">
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Dirección" required>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Ciudad" required>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Código Postal" required>
                </div>
                <div class="d-grid mt-4">
                  <button type="submit" class="btn btn-sporty btn-lg">FINALIZAR COMPRA</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../store'
import { useCurrencyStore } from '@/store/currencyStore'
import sizesData from '../assets/sizes.json'

const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
const checkoutComplete = ref(false) // 🌟 NUEVO: Controla la vista de éxito

const getAvailableSizes = (gender) => {
  const sizeCategory = sizesData.find(cat => cat.category === gender);
  return sizeCategory ? sizeCategory.table : [];
}

const updateSize = (item, event) => {
  const newSize = event.target.value;
  cartStore.updateItemSize(item.id, item.selectedSize, newSize);
}

// 🌟 CORREGIDO: Usar el sizeSystem del store directamente 🌟
const sizeSystem = computed(() => cartStore.sizeSystem);

// 🌟 MEJORADO: Cambia el estado para mostrar el mensaje de éxito en lugar de un alert 🌟
const handleCheckout = () => {
  cartStore.clearCart()
  checkoutComplete.value = true
}
</script>

<style scoped>
/* 🌟 CORRECCIÓN CRÍTICA PARA PANTALLA NEGRA Y CONTRASTE 🌟 */
.cart-view {
    /* 1. Padding superior para que el contenido aparezca debajo del fixed-top navbar */
    padding-top: 8rem; 
    padding-bottom: 4rem;
    /* 2. Fondo claro forzado para que las tarjetas oscuras resalten (Solución de fondo negro) */
    background-color: #f8f9fa !important; 
    min-height: 100vh;
}
/* 3. Asegura que el texto principal tenga contraste con el fondo claro */
.text-dark-contrast {
    color: var(--dark-color) !important;
}

/* 🌟 NUEVO: Estilos para el mensaje de éxito 🌟 */
.checkout-success-container {
  background-color: #ffffff;
  padding: 4rem;
  border-radius: 15px;
  color: #333; /* Texto oscuro para contraste con fondo blanco */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  /* Animación para que el contenedor aparezca con un zoom suave */
  animation: zoom-in 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.checkout-success-container h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.success-icon {
  font-size: 6rem; /* Un poco más grande */
  color: #198754; /* Verde de éxito de Bootstrap */
  /* Animación para que el ícono "salte" a la vista */
  animation: pop-in 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

/* 🌟 NUEVO: Keyframes para las animaciones 🌟 */
@keyframes zoom-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pop-in {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}

.empty-cart-container {
  background-color: #fff;
  padding: 4rem;
  border-radius: 15px;
}

.empty-cart-icon {
  font-size: 5rem;
  color: #e0e0e0;
}

.items-card, .summary-card, .list-group-item, .alert-info {
  background-color: var(--dark-color);
  border-color: var(--gray-color);
  color: var(--light-color);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain; /* CAMBIO: 'cover' a 'contain' para mostrar la imagen completa */
  object-position: center; /* ASEGURA: Centrado perfecto */
  border-radius: 8px; /* Ligeramente más redondeado */
}

.item-details h6 {
  font-size: 1.2rem; /* Un poco más grande para el nombre */
  font-weight: bold;
  margin-bottom: 0.5rem; /* Espacio extra debajo del nombre */
}

.item-details small {
  font-size: 0.95rem; /* Más legible */
}

.size-selector {
  background-color: var(--gray-color);
  color: var(--light-color);
  border: 1px solid #555;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
}

.item-price {
  color: var(--primary-color);
}

.total-item {
  font-size: 1.2rem;
}

.total-item strong {
  color: var(--primary-color);
}

.form-control {
  background-color: var(--gray-color);
  border: 1px solid #555;
  color: var(--light-color);
  padding: 0.75rem;
}

.form-control::placeholder {
  color: #aaa;
}

.form-control:focus {
  background-color: var(--gray-color);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(255, 111, 0, 0.25);
  color: var(--light-color);
}

.btn-sporty {
  background-color: var(--primary-color);
  color: var(--dark-color);
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
  letter-spacing: 1px;
}

.btn-sporty:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
  transform: scale(1.02);
}
</style>