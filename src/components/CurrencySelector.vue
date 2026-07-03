<template>
  <div class="currency-selector">
    <select 
        v-if="isLoaded"
        :value="currencyStore.selectedCurrency"
        @change="handleCurrencyChange"
        class="form-select form-select-sm"
        :disabled="currencyStore.loading || currencyStore.error" 
        title="Seleccionar Moneda"
    >
      <option v-for="currency in currencyStore.availableCurrencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
      
    </select>
    
    <div v-else class="form-select form-select-sm d-flex align-items-center justify-content-center">
        USD <span class="ms-1">&#9660;</span>
    </div>
    
    <small v-if="currencyStore.loading" class="text-info ms-2">Cargando...</small>
    <small v-else-if="currencyStore.error" class="text-danger ms-2" :title="currencyStore.error">Error</small>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrencyStore } from '@/store/currencyStore'

const currencyStore = useCurrencyStore()
const isLoaded = ref(false) // 🌟 NUEVA VARIABLE: Controla si el selector está listo para renderizarse

onMounted(async () => {
    // 🌟 LLAMADA CLAVE: Aseguramos la inicialización de los datos 🌟
    // Como fetchRates ahora es síncrono (o simulado), se ejecuta muy rápido.
    // Usamos await (aunque fetchRates no sea realmente async) para garantizar que los datos se inyecten.
    // Sin embargo, en el modo de desarrollo con Pinia y Fallback, simplemente llamamos la acción:
    
    currencyStore.fetchRates(); 
    
    // Dejamos un pequeño retraso (incluso de 0ms) para asegurar que Vue lea el state con los datos inyectados.
    // Usamos setTimeout para que se ejecute en el siguiente tick del event loop.
    setTimeout(() => {
        isLoaded.value = true;
    }, 50); 
});

const handleCurrencyChange = (event) => {
  currencyStore.setCurrency(event.target.value)
}
</script>

<style scoped>
/* Estilos sencillos para el selector de Bootstrap */
.currency-selector {
    display: inline-flex;
    align-items: center;
    margin-left: 15px; 
}
.form-select-sm {
    width: auto;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    min-width: 60px; 
}
.text-info { color: #0dcaf0; }
.text-danger { color: #dc3545; }
</style>