import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import LocationView from '../views/LocationView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
    meta: { hideNavbar: true } // Ocultar navbar en la landing
  },
  {
    path: '/tienda',
    name: 'home', // CLAVE: Usado para la navegación del botón "ENTRAR A LA TIENDA"
    component: HomeView
  },
  {
    path: '/location',
    name: 'location',
    component: LocationView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/category/:categoryName',
    name: 'category',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router