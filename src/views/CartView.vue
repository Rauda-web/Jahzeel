<template>
  <div class="cart-view fade-in-up">
    <h1 class="mb-4">TU EQUIPAMIENTO</h1>

    <div v-if="cartStore.cartItemCount === 0" class="alert alert-info text-center">
      Aún no tienes nada en tu carrito. ¡Es hora de equiparte!
    </div>

    <div v-else>
      <div class="row">
        <!-- Cart Items -->
        <div class="col-lg-8">
          <div class="card items-card mb-4">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="item in cartStore.cartItems" :key="item.id" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <img :src="item.image" :alt="item.name" class="me-3 item-image">
                      <div>
                        <h6 class="my-0">{{ item.name }}</h6>
                        <small class="text-muted">Cantidad: {{ item.quantity }}</small>
                      </div>
                    </div>
                    <div class="text-end">
                      <span class="fw-bold item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                      <button class="btn btn-sm btn-danger ms-3" @click="cartStore.removeFromCart(item.id)"><i class="bi bi-trash"></i></button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Summary and Shipping -->
        <div class="col-lg-4">
          <div class="card summary-card">
            <div class="card-body">
              <h5 class="card-title mb-3">RESUMEN</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>${{ cartStore.cartTotal }}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Envío</span>
                  <strong>Gratis</strong>
                </li>
                <li class="list-group-item total-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>${{ cartStore.cartTotal }}</strong>
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
import { useCartStore } from '../store'

const cartStore = useCartStore()

const handleCheckout = () => {
  alert('¡Gracias por tu compra! Tu pedido está en camino.')
  cartStore.clearCart()
}
</script>

<style scoped>
.items-card, .summary-card, .list-group-item, .alert-info {
  background-color: var(--dark-color);
  border-color: var(--gray-color);
  color: var(--light-color);
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
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