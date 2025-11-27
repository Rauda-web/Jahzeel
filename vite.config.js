import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Importamos path para poder resolver rutas correctamente
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 🌟 AÑADIMOS LA CONFIGURACIÓN DE RESOLVE Y ALIAS 🌟
  resolve: {
    alias: {
      // Configuramos el alias '@' para que apunte a la carpeta 'src'
      '@': path.resolve(__dirname, './src')
    }
  }
})