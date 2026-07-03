import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartItemCount: (state) => {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    },
    // Usa unitPrice (precio ya convertido) en lugar de price base
    cartTotal: (state) => {
      return state.cartItems.reduce((acc, item) => acc + (item.unitPrice ?? item.price) * item.quantity, 0)
    },
  },
  actions: {
    addToCart(product) {
      // Clave única: id + talla seleccionada
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      )
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId, selectedSize) {
      const index = this.cartItems.findIndex(
        (item) => item.id === productId && item.selectedSize === selectedSize
      )
      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }
    },
    updateQuantity(productId, selectedSize, delta) {
      const item = this.cartItems.find(
        (item) => item.id === productId && item.selectedSize === selectedSize
      )
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta)
      }
    },
    clearCart() {
      this.cartItems = []
    }
  },
})

