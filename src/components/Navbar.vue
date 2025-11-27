<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/tienda">SPORT·FLOW</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/tienda">Tienda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/location">Ubicación</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contacto</router-link>
          </li>
        </ul>
        
        <ul class="navbar-nav align-items-center">
          
          <li class="nav-item me-3">
              <CurrencyDropdown /> 
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link cart-link" to="/cart">
              <i class="bi bi-cart3"></i>
              <span v-if="cartStore.cartItemCount > 0" class="badge rounded-pill ms-1">{{ cartStore.cartItemCount }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../store'
import CurrencyDropdown from './CurrencyDropdown.vue' 

const cartStore = useCartStore()
</script>

<style scoped>
.navbar-custom {
  background-color: #fff !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  transition: all 0.3s ease;
  z-index: 1040; 
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
  color: #222;
}

.currency-item {
    padding-top: 0.5rem; 
    padding-bottom: 0.5rem; 
}

.nav-link {
  font-weight: 600;
  font-size: 1.1rem;
  color: #555 !important;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(45deg, #ff0077, #ff6600);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.nav-link:hover::after,
.router-link-exact-active::after {
  width: 100%;
}

.router-link-exact-active {
  color: #000 !important;
}

.cart-link {
  font-size: 1.5rem;
  position: relative;
  transition: transform 0.3s ease;
  padding: 0.5rem 0.5rem !important; 
}

.cart-link:hover {
  transform: scale(1.1);
}

.cart-link .badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background: linear-gradient(45deg, #ff0077, #ff6600);
  color: #fff;
  font-weight: 700;
  font-size: 0.7rem;
  padding: 0.3em 0.5em;
  border: 2px solid #fff;
}
</style>