import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartItemCount: (state) => {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    },
    cartTotal: (state) => {
      return state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    },
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId)
      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }
    },
    clearCart() {
      this.cartItems = []
    }
  },
})
