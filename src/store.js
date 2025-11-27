import { defineStore } from 'pinia'
import { useCurrencyStore } from './store/currencyStore'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    sizeSystem: 'US', // 'US' or 'MEX'
  }),
  getters: {
    cartItemCount: (state) => {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    },
    cartTotal: (state) => {
      const currencyStore = useCurrencyStore()
      const totalInBase = state.cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
      return currencyStore.convertedPrice(totalInBase)
    },
  },
  actions: {
    setSizeSystem(system) {
      this.sizeSystem = system
    },
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    addToCart(product) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      )
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },
    removeFromCart(productId, size) {
      const index = this.cartItems.findIndex(
        (item) => item.id === productId && item.selectedSize === size
      )
      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }
      this.saveCart()
    },
    clearCart() {
      this.cartItems = []
      this.saveCart()
    },
    updateItemSize(productId, oldSize, newSize) {
      const itemToUpdate = this.cartItems.find(
        (item) => item.id === productId && item.selectedSize === oldSize
      );
      if (!itemToUpdate) return;

      const existingItemWithNewSize = this.cartItems.find(
        (item) => item.id === productId && item.selectedSize === newSize
      );

      if (existingItemWithNewSize) {
        existingItemWithNewSize.quantity += itemToUpdate.quantity;
        const indexToRemove = this.cartItems.findIndex(
          (item) => item.id === productId && item.selectedSize === oldSize
        );
        if (indexToRemove !== -1) {
          this.cartItems.splice(indexToRemove, 1);
        }
      } else {
        itemToUpdate.selectedSize = newSize;
      }
      this.saveCart();
    }
  },
})
