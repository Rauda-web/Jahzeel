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
.product-detail-view { background-color: #f8f9fa; min-height: 100vh; }

.product-hero { padding-top: 7rem; padding-bottom: 5rem; background: linear-gradient(160deg, #fff 55%, #1a1a2e 55%); }

.image-panel { position: relative; display: flex; align-items: center; justify-content: center; }
.image-badge { position: absolute; top: 1rem; left: 1rem; background: linear-gradient(45deg, #ff0077, #ff6600); color: #fff; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 0.35rem 0.85rem; border-radius: 50px; z-index: 3; }
.image-wrapper { background: #fff; border-radius: 24px; padding: 2.5rem; box-shadow: 0 30px 80px rgba(0,0,0,0.15); position: relative; z-index: 2; transition: transform 0.4s ease; }
.image-wrapper:hover { transform: translateY(-8px) scale(1.02); }
.product-img { width: 100%; max-height: 420px; object-fit: contain; border-radius: 16px; }
.image-glow { position: absolute; width: 60%; height: 60%; background: radial-gradient(circle, rgba(255,0,119,0.15), transparent 70%); border-radius: 50%; z-index: 1; bottom: -10%; left: 20%; filter: blur(30px); }

.info-panel { padding: 1rem 1rem 1rem 2rem; }
.product-name { font-size: 2.6rem; font-weight: 900; color: #fff; line-height: 1.1; letter-spacing: -0.5px; margin-bottom: 0.75rem; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }

.rating-row { display: flex; align-items: center; gap: 0.2rem; margin-bottom: 1.25rem; }
.star { color: #ffc107; font-size: 1.1rem; }
.rating-text { color: rgba(255,255,255,0.65); font-size: 0.9rem; margin-left: 0.5rem; }

.price-block { margin-bottom: 1.5rem; }
.price-main { display: block; font-size: 2.4rem; font-weight: 800; background: linear-gradient(45deg, #ff0077, #ff6600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.1; }
.price-base { display: block; font-size: 0.9rem; color: rgba(255,255,255,0.5); margin-top: 0.3rem; }

.divider { height: 1px; background: rgba(255,255,255,0.15); margin: 1.5rem 0; }

.size-section { margin-bottom: 1.5rem; }
.size-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.size-label { font-weight: 700; color: #fff; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; }
.guide-link { background: none; border: none; cursor: pointer; font-size: 0.85rem; font-weight: 600; background: linear-gradient(45deg, #ff0077, #ff6600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; padding: 0; }
.guide-link:hover { opacity: 0.75; }
.size-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.size-btn { min-width: 72px; padding: 0.5rem 0.75rem; border: 2px solid rgba(255,255,255,0.2); border-radius: 10px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; }
.size-btn:hover { border-color: #ff0077; color: #fff; background: rgba(255,0,119,0.15); }
.size-btn.active { background: linear-gradient(45deg, #ff0077, #ff6600); border-color: transparent; color: #fff; box-shadow: 0 4px 15px rgba(255,0,119,0.4); }
.guide-container { margin-top: 1rem; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1rem; }

.specs-block { background: rgba(255,255,255,0.07); border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem; border: 1px solid rgba(255,255,255,0.1); }
.specs-title { font-weight: 700; color: #fff; margin-bottom: 0.6rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.specs-text { color: rgba(255,255,255,0.65); font-size: 0.92rem; margin: 0; line-height: 1.6; }

.action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.btn-cart, .btn-buy { border: none; border-radius: 14px; padding: 1rem; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; }
.btn-cart { background: rgba(255,255,255,0.12); border: 2px solid rgba(255,255,255,0.25); color: #fff; }
.btn-cart:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
.btn-buy { background: linear-gradient(45deg, #ff0077, #ff6600); color: #fff; box-shadow: 0 6px 20px rgba(255,0,119,0.45); }
.btn-buy:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,0,119,0.65); }

.product-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.tag { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; }

.related-section { background: #f8f9fa; padding: 5rem 0 4rem; border-top: 1px solid #eee; }
.related-title { font-weight: 900; font-size: 1.8rem; color: #222; text-align: center; position: relative; display: inline-block; left: 50%; transform: translateX(-50%); }
.related-title::after { content: ''; display: block; margin: 0.5rem auto 0; width: 60px; height: 4px; border-radius: 4px; background: linear-gradient(45deg, #ff0077, #ff6600); }

.not-found { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; color: #aaa; font-size: 1.2rem; }
.not-found i { font-size: 4rem; margin-bottom: 1rem; }
</style>
