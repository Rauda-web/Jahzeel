<template>
  <div class="currency-dropdown-container">
    <div 
      class="currency-selector-button" 
      @click="toggleDropdown"
      :class="{ open: isOpen }"
      title="Cambiar Moneda"
    >
      <span class="currency-code">{{ currencyStore.selectedCurrency }}</span>
      <span class="arrow" :class="{ rotated: isOpen }">&#9660;</span>
    </div>
    
    <div v-if="isOpen" class="currency-options">
      <div 
        v-for="currency in currencyStore.availableCurrencies" 
        :key="currency" 
        @click="selectCurrency(currency)"
        class="currency-option-item"
        :class="{ selected: currency === currencyStore.selectedCurrency }"
      >
        {{ currency }}
      </div>
    </div>
    
    <small v-if="currencyStore.loading" class="text-info ms-2">Cargando...</small>
    <small v-else-if="currencyStore.error && currencyStore.error.length > 0" class="text-danger ms-2" :title="currencyStore.error">Error</small>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCurrencyStore } from '@/store/currencyStore';

const currencyStore = useCurrencyStore();
const isOpen = ref(false);

onMounted(() => {
    currencyStore.fetchRates(); 
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCurrency = (currency) => {
  currencyStore.setCurrency(currency);
  isOpen.value = false; // Cerrar después de seleccionar
};
</script>

<style scoped>
.currency-options {
    position: absolute;
    top: 100%; /* Justo debajo del botón */
    right: 0;
    /* 🌟 CORRECCIÓN CLAVE: Aumentar el z-index de forma agresiva 🌟 */
    z-index: 9999; 
    background: white;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    min-width: 100%;
    margin-top: 2px;
    /* También asegúrate de que no haya overflow: hidden en elementos padres */
}
.currency-dropdown-container {
    position: relative;
    display: inline-block;
}

.currency-selector-button {
    background-color: #2e2bd8; /* Fondo similar al form-select */
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    user-select: none;
    display: flex;
    align-items: center;
    min-width: 60px;
    justify-content: space-between;
    transition: background-color 0.2s;
}

.currency-selector-button:hover {
    background-color: #e2e6ea;
}

.arrow {
    margin-left: 5px;
    font-size: 0.6rem;
    transition: transform 0.3s;
}

.arrow.rotated {
    transform: rotate(180deg);
}

/* Estilos del Dropdown Flotante */
.currency-options {
    position: absolute;
    top: 100%; /* Justo debajo del botón */
    right: 0;
    z-index: 1050; /* Alto z-index para que esté sobre el contenido */
    background: rgb(20, 151, 226);
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    min-width: 100%;
    margin-top: 2px;
}

.currency-option-item {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.2s;
    text-align: right;
}

.currency-option-item:hover {
    background-color: #f8f9fa;
}

.currency-option-item.selected {
    background-color: #0d6efd; /* Color primario de Bootstrap */
    color: white;
}
.text-info { color: #0dcaf0; }
.text-danger { color: #dc3545; }
</style>