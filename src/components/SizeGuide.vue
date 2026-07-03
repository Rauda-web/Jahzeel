<template>
  <div class="size-guide card shadow-sm p-4">
    <h3 class="text-center mb-4">👟 Guía de Tallas de Calzado</h3>
    <p class="text-muted text-center">Utiliza esta tabla para encontrar tu talla correcta. Las tallas pueden variar ligeramente por marca.</p>

    <div v-for="sizeData in sizes" :key="sizeData.category" class="size-category mb-4">
      <h4 class="mt-3">{{ sizeData.category }}</h4>

      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th>Talla EU</th>
              <th>Talla US</th>
              <th>Talla UK</th>
              <th>CM (Largo del pie)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sizeData.table" :key="index">
              <td>{{ item.EU }}</td>
              <td>{{ item.US }}</td>
              <td>{{ item.UK }}</td>
              <td>{{ item.CM }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Importamos el archivo JSON. Vite usa el alias @ para la carpeta src
import sizeData from '@/assets/sizes.json';

const sizes = ref(sizeData);
</script>

<style scoped>
.size-guide {
  max-width: 800px;
  margin: 0 auto;
}

h3, h4 {
    color: #333;
}
</style>