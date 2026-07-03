<template>
  <div class="cart-view">

    <!-- Header de la página -->
    <div class="cart-header">
      <div class="container">
        <h1 class="cart-title">Tu Equipamiento</h1>
        <p class="cart-subtitle">{{ cartStore.cartItemCount }} {{ cartStore.cartItemCount === 1 ? 'artículo' : 'artículos' }} en tu carrito</p>
      </div>
    </div>

    <!-- Carrito vacío -->
    <div v-if="cartStore.cartItemCount === 0" class="empty-cart container">
      <div class="empty-card">
        <div class="empty-icon-wrap">
          <i class="bi bi-bag-x"></i>
        </div>
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has elegido tu equipamiento. ¡Es hora de moverse!</p>
        <router-link to="/tienda" class="btn btn-brand">
          <i class="bi bi-grid me-2"></i>Explorar Tienda
        </router-link>
      </div>
    </div>

    <!-- Carrito con items -->
    <div v-else class="container cart-content">
      <div class="row g-4">

        <!-- Lista de items -->
        <div class="col-lg-8">
          <div class="section-label">Artículos</div>
          <TransitionGroup name="item-anim" tag="div" class="items-list">
            <div
              v-for="item in cartStore.cartItems"
              :key="item.id + '-' + item.selectedSize"
              class="cart-item-card"
            >
              <!-- Imagen con efecto 3D -->
              <div class="item-img-wrap">
                <img :src="item.image" :alt="item.name" class="item-img" />
              </div>

              <!-- Info del producto -->
              <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-meta">
                  <span class="badge-size"><i class="bi bi-rulers me-1"></i>{{ item.selectedSize }}</span>
                  <span class="badge-currency">{{ item.selectedCurrency }}</span>
                </div>

                <!-- Controles de cantidad -->
                <div class="qty-controls">
                  <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.selectedSize, -1)">
                    <i class="bi bi-dash"></i>
                  </button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.selectedSize, +1)">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Precio y eliminar -->
              <div class="item-right">
                <div class="item-price">
                  {{ item.selectedCurrency }} {{ ((item.unitPrice ?? item.price) * item.quantity).toFixed(2) }}
                </div>
                <div class="item-unit-price">
                  {{ item.selectedCurrency }} {{ (item.unitPrice ?? item.price).toFixed(2) }} c/u
                </div>
                <button class="btn-remove" @click="cartStore.removeFromCart(item.id, item.selectedSize)" title="Eliminar">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          </TransitionGroup>

          <!-- Botón vaciar carrito -->
          <div class="clear-wrap">
            <button class="btn-clear" @click="cartStore.clearCart()">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Vaciar carrito
            </button>
          </div>
        </div>

        <!-- Resumen + Formulario -->
        <div class="col-lg-4">
          <div class="summary-panel">
            <div class="summary-header">
              <i class="bi bi-receipt me-2"></i>Resumen del pedido
            </div>

            <!-- Desglose -->
            <div class="summary-rows">
              <div class="summary-row" v-for="item in cartStore.cartItems" :key="item.id + '-sum-' + item.selectedSize">
                <span class="summary-item-name">{{ item.name }} <em>×{{ item.quantity }}</em></span>
                <span>{{ item.selectedCurrency }} {{ ((item.unitPrice ?? item.price) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row subtotal-row">
              <span>Subtotal</span>
              <span>{{ displayCurrency }} {{ cartStore.cartTotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Envío</span>
              <span class="text-success fw-bold">Gratis <i class="bi bi-check-circle-fill ms-1"></i></span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total-row">
              <span>TOTAL</span>
              <span>{{ displayCurrency }} {{ cartStore.cartTotal.toFixed(2) }}</span>
            </div>

            <!-- Formulario de envío -->
            <form @submit.prevent="handleCheckout" class="checkout-form">
              <div class="form-group-title"><i class="bi bi-truck me-2"></i>Datos de Envío</div>

              <div class="field-wrap">
                <i class="bi bi-geo-alt field-icon"></i>
                <input type="text" class="sf-input" placeholder="Dirección completa" v-model="form.address" required />
              </div>
              <div class="field-wrap">
                <i class="bi bi-building field-icon"></i>
                <input type="text" class="sf-input" placeholder="Ciudad" v-model="form.city" required />
              </div>
              <div class="field-wrap">
                <i class="bi bi-mailbox field-icon"></i>
                <input type="text" class="sf-input" placeholder="Código Postal" v-model="form.zip" required />
              </div>

              <button type="submit" class="btn-checkout">
                <span>Finalizar Compra</span>
                <i class="bi bi-arrow-right-circle ms-2"></i>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../store'

const cartStore = useCartStore()

const form = ref({ address: '', city: '', zip: '' })

// Inferir moneda display del primer item o USD como fallback
const displayCurrency = computed(() =>
  cartStore.cartItems.length > 0 ? cartStore.cartItems[0].selectedCurrency : 'USD'
)

const handleCheckout = () => {
  alert('¡Gracias por tu compra! Tu pedido está en camino. 🚀')
  cartStore.clearCart()
  form.value = { address: '', city: '', zip: '' }
}
</script>

<style scoped>
/* ── Layout base ── */
.cart-view {
  min-height: 100vh;
  background-color: var(--background-color);
  padding-bottom: 5rem;
}

/* ── Header ── */
.cart-header {
  padding: 8rem 0 2.5rem;
  background: linear-gradient(180deg, #1a0a00 0%, var(--background-color) 100%);
  border-bottom: 1px solid var(--border-subtle);
}

.cart-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  letter-spacing: 2px;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.cart-subtitle {
  color: #888;
  font-size: 0.95rem;
  margin-top: 0.4rem;
}

/* ── Content ── */
.cart-content {
  padding-top: 2.5rem;
}

/* ── Empty ── */
.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-card {
  text-align: center;
  padding: 4rem 3rem;
  background: var(--dark-card);
  border: 1px solid var(--border-subtle);
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow-card);
}

.empty-icon-wrap {
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: var(--primary-color);
  box-shadow: 0 0 30px var(--primary-glow);
}

.empty-card h2 {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.empty-card p {
  color: #888;
  margin-bottom: 2rem;
}

.btn-brand {
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.85rem 2rem;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px var(--primary-glow);
}

.btn-brand:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px var(--primary-glow);
  color: #fff;
}

/* ── Section label ── */
.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 1.2rem;
}

/* ── Item Card ── */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--dark-card);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.cart-item-card:hover {
  transform: translateY(-4px) rotateX(1deg);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px var(--primary-color);
  border-color: var(--primary-color);
}

/* ── Item imagen 3D ── */
.item-img-wrap {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  border-radius: 14px;
  background: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.4s ease;
  transform-style: preserve-3d;
}

.cart-item-card:hover .item-img-wrap {
  transform: translateZ(12px) scale(1.05);
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
}

/* ── Item info ── */
.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: 700;
  font-size: 1rem;
  color: #f0f0f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.4rem;
}

.item-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}

.badge-size, .badge-currency {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 50px;
}

.badge-size {
  background: var(--gray-color);
  color: #ccc;
  border: 1px solid var(--border-subtle);
}

.badge-currency {
  background: rgba(255, 111, 0, 0.15);
  color: var(--primary-color);
  border: 1px solid rgba(255, 111, 0, 0.3);
}

/* ── Quantity controls ── */
.qty-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  background: var(--gray-color);
  color: #ccc;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.qty-btn:hover {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
  transform: scale(1.1);
}

.qty-value {
  font-size: 1rem;
  font-weight: 700;
  min-width: 28px;
  text-align: center;
  color: #fff;
}

/* ── Item right ── */
.item-right {
  flex-shrink: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}

.item-price {
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--primary-color);
}

.item-unit-price {
  font-size: 0.72rem;
  color: #666;
}

.btn-remove {
  background: transparent;
  border: 1px solid rgba(255,80,80,0.3);
  color: #ff5050;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.25s ease;
  margin-top: 0.3rem;
}

.btn-remove:hover {
  background: rgba(255,80,80,0.15);
  border-color: #ff5050;
  transform: scale(1.1) rotate(5deg);
}

/* ── Clear ── */
.clear-wrap {
  margin-top: 1.2rem;
  display: flex;
  justify-content: flex-end;
}

.btn-clear {
  background: transparent;
  border: none;
  color: #666;
  font-size: 0.82rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-clear:hover {
  color: #ff5050;
}

/* ── Summary panel ── */
.summary-panel {
  background: var(--dark-card);
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  overflow: hidden;
  position: sticky;
  top: 7rem;
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(10px);
}

.summary-header {
  padding: 1.4rem 1.6rem;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--border-subtle);
  color: #ddd;
  background: linear-gradient(135deg, rgba(255,111,0,0.08), transparent);
}

.summary-rows {
  padding: 0.8rem 1.6rem;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--gray-light) transparent;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  font-size: 0.88rem;
  color: #aaa;
  gap: 1rem;
}

.summary-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
}

.summary-item-name em {
  color: var(--primary-color);
  font-style: normal;
  margin-left: 0.25rem;
}

.subtotal-row {
  color: #ccc;
  font-weight: 600;
}

.total-row {
  font-weight: 900;
  font-size: 1.2rem;
  color: #fff;
  padding: 1rem 1.6rem;
  background: rgba(255,111,0,0.08);
  margin: 0 -1.6rem;
}

.summary-divider {
  height: 1px;
  background: var(--border-subtle);
  margin: 0.2rem 0;
}

/* ── Checkout form ── */
.checkout-form {
  padding: 1.4rem 1.6rem 1.8rem;
}

.form-group-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 1.2rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-subtle);
}

.field-wrap {
  position: relative;
  margin-bottom: 0.9rem;
}

.field-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 0.9rem;
  z-index: 1;
}

.sf-input {
  width: 100%;
  background: var(--gray-color);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  color: #fff;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  font-size: 0.9rem;
  font-family: var(--font-family);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  outline: none;
}

.sf-input::placeholder {
  color: #555;
}

.sf-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.btn-checkout {
  width: 100%;
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.4rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px var(--primary-glow);
  font-family: var(--font-family);
}

.btn-checkout:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 32px var(--primary-glow);
}

.btn-checkout:active {
  transform: translateY(0);
}

/* ── Transiciones de lista (TransitionGroup) ── */
.item-anim-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.item-anim-leave-active {
  transition: all 0.35s cubic-bezier(0.55, 0, 1, 0.45);
  position: absolute;
  width: 100%;
}

.item-anim-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.96);
}

.item-anim-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.item-anim-move {
  transition: transform 0.4s ease;
}

/* ── Responsive ── */
@media (max-width: 576px) {
  .cart-title { font-size: 2.5rem; }
  .cart-item-card { flex-wrap: wrap; }
  .item-right { align-items: flex-start; width: 100%; flex-direction: row; justify-content: space-between; }
  .summary-panel { position: static; }
}
</style>
