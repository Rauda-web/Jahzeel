<template>
  <div class="product-detail-view" v-if="product">
    <div class="product-hero">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="image-panel">
              <div class="image-badge">{{ product.category }}</div>
              <div class="image-wrapper">
                <img :src="product.image" :alt="product.name" class="product-img">
              </div>
              <div class="image-glow"></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="info-panel">
              <h1 class="product-name">{{ product.name }}</h1>
              <div class="rating-row">
                <span class="star" v-for="n in 5" :key="n">★</span>
                <span class="rating-text">4.8 · 120 reseñas</span>
              </div>
              <div class="price-block">
                <span class="price-main">{{ currencyStore.selectedCurrency }} {{ convertedProductPrice.toFixed(2) }}</span>
                <span v-if="currencyStore.selectedCurrency !== 'USD'" class="price-base">Precio base: USD {{ product.price }}</span>
              </div>
              <div class="divider"></div>
              <div class="size-section">
                <div class="size-header">
                  <span class="size-label">Talla</span>
                  <button class="guide-link" @click="showGuide = !showGuide">{{ showGuide ? 'Ocultar guía' : 'Ver guía de tallas' }}</button>
                </div>
                <div class="size-grid">
                  <button v-for="size in availableSizes" :key="size" class="size-btn" :class="{ active: selectedSize === size }" @click="selectedSize = size">{{ size }}</button>
                </div>
                <div v-if="showGuide" class="guide-container"><SizeGuide /></div>
              </div>
              <div class="specs-block">
                <h5 class="specs-title"><i class="bi bi-clipboard-check"></i> Especificaciones</h5>
                <p class="specs-text">{{ product.specifications }}</p>
              </div>
              <div class="action-buttons">
                <button class="btn-cart" @click="addToCart"><i class="bi bi-cart-plus"></i> Añadir al Carrito</button>
                <button class="btn-buy" @click="buyNow"><i class="bi bi-lightning-charge-fill"></i> Comprar Ya</button>
              </div>
              <div class="product-tags">
                <span class="tag"><i class="bi bi-truck"></i> Envío gratis</span>
                <span class="tag"><i class="bi bi-arrow-counterclockwise"></i> 30 días devolución</span>
                <span class="tag"><i class="bi bi-shield-check"></i> Garantía oficial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isReady && relatedProducts.length" class="related-section">
      <div class="container">
        <h3 class="related-title">También te puede gustar</h3>
        <div class="row mt-4">
          <div class="col-md-4" v-for="related in relatedProducts" :key="related.id">
            <ProductCard :product="related" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <i class="bi bi-emoji-frown"></i>
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../products'
import { useCartStore } from '../store'
import ProductCard from '../components/ProductCard.vue'
import SizeGuide from '../components/SizeGuide.vue'
import { useCurrencyStore } from '../store/currencyStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()

const isReady = ref(false)
const showGuide = ref(false)
const selectedSize = ref(null)

onMounted(() => { isReady.value = true })

const product = computed(() => products.find(p => p.id === parseInt(route.params.id)))
const currentUnitPrice = computed(() => !product.value ? 0 : currencyStore.convertedPrice(product.value.price))
const convertedProductPrice = computed(() => currentUnitPrice.value)
const availableSizes = computed(() => ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11'])
const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 3)
})

const addToCart = () => {
  if (!selectedSize.value) { alert('Por favor, selecciona una talla antes de añadir al carrito.'); return }
  if (product.value) {
    cartStore.addToCart({ ...product.value, selectedSize: selectedSize.value, selectedCurrency: currencyStore.selectedCurrency, unitPrice: currentUnitPrice.value })
    alert(product.value.name + ' (Talla: ' + selectedSize.value + ') ha sido añadido al carrito.')
  }
}
const buyNow = () => {
  if (!selectedSize.value) { alert('Por favor, selecciona una talla antes de comprar.'); return }
  if (product.value) {
    cartStore.addToCart({ ...product.value, selectedSize: selectedSize.value, selectedCurrency: currencyStore.selectedCurrency, unitPrice: currentUnitPrice.value })
    router.push('/cart')
  }
}
</script>

<style scoped>
/* Vista general: fondo claro */
.product-detail-view { background-color: #f0f2f5; min-height: 100vh; }

/* Hero: fondo blanco limpio, sin diagonal */
.product-hero { padding-top: 7rem; padding-bottom: 5rem; background: #f0f2f5; }

/* Panel imagen */
.image-panel { position: relative; display: flex; align-items: center; justify-content: center; }
.image-badge { position: absolute; top: 1rem; left: 1rem; background: #ff0077; color: #fff; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 0.35rem 0.85rem; border-radius: 50px; z-index: 3; }
.image-wrapper { background: #fff; border-radius: 24px; padding: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; z-index: 2; transition: transform 0.4s ease; }
.image-wrapper:hover { transform: translateY(-8px) scale(1.02); }
.product-img { width: 100%; max-height: 420px; object-fit: contain; border-radius: 16px; }
.image-glow { position: absolute; width: 60%; height: 60%; background: radial-gradient(circle, rgba(255,0,119,0.12), transparent 70%); border-radius: 50%; z-index: 1; bottom: -10%; left: 20%; filter: blur(30px); }

/* Panel info: card oscura independiente, siempre legible */
.info-panel {
  background: #1a1a2e;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.product-name { font-size: 2.4rem; font-weight: 900; color: #fff; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 0.75rem; }

.rating-row { display: flex; align-items: center; gap: 0.2rem; margin-bottom: 1.25rem; }
.star { color: #ffc107; font-size: 1.1rem; }
.rating-text { color: rgba(255,255,255,0.55); font-size: 0.9rem; margin-left: 0.5rem; }

.price-block { margin-bottom: 1.5rem; }
.price-main { display: block; font-size: 2.4rem; font-weight: 800; color: #ff0077; line-height: 1.1; }
.price-base { display: block; font-size: 0.9rem; color: rgba(255,255,255,0.45); margin-top: 0.3rem; }

.divider { height: 1px; background: rgba(255,255,255,0.12); margin: 1.5rem 0; }

/* Tallas */
.size-section { margin-bottom: 1.5rem; }
.size-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.size-label { font-weight: 700; color: #fff; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; }
.guide-link { background: none; border: none; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: #ff0077; padding: 0; transition: opacity 0.2s; }
.guide-link:hover { opacity: 0.75; }
.size-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; width: 100%; }
.size-btn {
  padding: 0.45rem 0.9rem;
  border: 2px solid rgba(255,255,255,0.25);
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.size-btn:hover { border-color: #ff0077; color: #ff0077; }
.size-btn.active { background: #ff0077; border-color: #ff0077; color: #fff; box-shadow: 0 4px 12px rgba(255,0,119,0.4); }
.guide-container { margin-top: 1rem; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1rem; }

/* Especificaciones */
.specs-block { background: rgba(255,255,255,0.06); border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem; border: 1px solid rgba(255,255,255,0.1); }
.specs-title { font-weight: 700; color: #fff; margin-bottom: 0.6rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.specs-text { color: rgba(255,255,255,0.6); font-size: 0.92rem; margin: 0; line-height: 1.6; }

/* Botones: ambos usan #ff0077, uno relleno y uno outline del mismo color */
.action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.btn-cart, .btn-buy {
  border-radius: 14px;
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
}
.btn-cart {
  background: transparent;
  border: 2px solid #ff0077;
  color: #ff0077;
}
.btn-cart:hover { background: rgba(255,0,119,0.1); transform: translateY(-2px); }
.btn-buy {
  background: #ff0077;
  border: 2px solid #ff0077;
  color: #fff;
  box-shadow: 0 6px 20px rgba(255,0,119,0.4);
}
.btn-buy:hover { background: #e0006a; border-color: #e0006a; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,0,119,0.55); }

/* Tags */
.product-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.tag { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.65); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; }

/* Relacionados */
.related-section { background: #f0f2f5; padding: 5rem 0 4rem; border-top: 1px solid #ddd; }
.related-title { font-weight: 900; font-size: 1.8rem; color: #222; text-align: center; position: relative; display: inline-block; left: 50%; transform: translateX(-50%); }
.related-title::after { content: ''; display: block; margin: 0.5rem auto 0; width: 60px; height: 4px; border-radius: 4px; background: #ff0077; }

/* Not found */
.not-found { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; color: #aaa; font-size: 1.2rem; }
.not-found i { font-size: 4rem; margin-bottom: 1rem; }
</style>
