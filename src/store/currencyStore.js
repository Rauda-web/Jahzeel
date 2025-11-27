import { defineStore } from 'pinia'
// Ya no necesitamos importar axios aquí si no se usa para el desarrollo local

const BASE_CURRENCY = 'USD' 

// 🌟 TASAS DE PRUEBA (FALLBACK) - Fuente de verdad para el desarrollo 
const FALLBACK_RATES = {
    'USD': 1,
    'MXN': 18.50, 
    'EUR': 0.92,
    'CAD': 1.35,
    'GBP': 0.80,
};

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    // CLAVE: Inicializamos rates con el fallback para que MXN siempre exista
    rates: FALLBACK_RATES, 
    selectedCurrency: BASE_CURRENCY, 
    loading: false, // Inicia en false
    error: '', //  CAMBIO: Inicializamos con cadena vacía para que desaparezca el mensaje "Error" 🌟
  }),
  
  getters: {
    convertedPrice: (state) => (priceInBase) => {
      const rate = state.rates[state.selectedCurrency];
      if (rate) {
        const price = priceInBase * rate;
        return Math.round(price * 100) / 100;
      }
      // Fallback to base price if rate is not available for some reason
      return priceInBase;
    },
    
    availableCurrencies: (state) => {
        const allCurrencies = new Set([BASE_CURRENCY, ...Object.keys(state.rates)]);
        return Array.from(allCurrencies).sort();
    }
  },

  actions: {
    // La acción ya no hace una petición lenta, solo se ejecuta para la consistencia
    async fetchRates() {
      // Si ya hay datos, simplemente salimos
      if (Object.keys(this.rates).length > 1) return; 
      
      console.log('Modo desarrollo: Activando tasas de prueba.')
      this.rates = FALLBACK_RATES;
    },
    
    setCurrency(currency) {
      this.selectedCurrency = currency
    }
  }
})