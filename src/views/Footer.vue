<template>
  <footer class="footer-container text-light">
    <div class="container py-5">
      <div class="row">
        
        <!-- Columna de la Marca -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase footer-brand">SPORTSTYLE</h5>
          <p class="footer-tagline">
            Hechas para el movimiento. Diseñadas para ti.
          </p>
          <div class="social-icons mt-4">
            <a href="#" class="social-icon"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
          </div>
        </div>

        <!-- Columna de Enlaces -->
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase footer-heading">Tienda</h5>
          <ul class="list-unstyled mb-0">
            <li><router-link to="/tienda" class="footer-link">Colección</router-link></li>
            <li><router-link :to="{ name: 'category', params: { categoryName: 'Lifestyle' } }" class="footer-link">Lifestyle</router-link></li>
            <li><router-link :to="{ name: 'category', params: { categoryName: 'Running' } }" class="footer-link">Running</router-link></li>
            <li><router-link :to="{ name: 'category', params: { categoryName: 'Basketball' } }" class="footer-link">Basketball</router-link></li>
          </ul>
        </div>

        <!-- Columna de Soporte -->
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase footer-heading">Soporte</h5>
          <ul class="list-unstyled mb-0">
            <li><a href="#" class="footer-link">Contacto</a></li>
            <li><a href="#" class="footer-link">Preguntas Frecuentes</a></li>
            <li><a href="#" class="footer-link">Guía de Tallas</a></li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Copyright -->
    <div class="copyright-bar text-center py-3">
      &copy; {{ new Date().getFullYear() }} SPORTSTYLE. Todos los derechos reservados.
    </div>
  </footer>
</template>

<script setup>
// No se necesita lógica de script para este footer estático.
</script>

<style scoped>
.footer-container {
  background-color: var(--dark-color);
  border-top: 3px solid var(--primary-color);
}

.footer-brand {
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--primary-color);
}

.footer-tagline {
  color: #adb5bd;
  font-size: 0.9rem;
}

.footer-heading {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #fff;
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  display: inline-block;
  padding: 0.25rem 0;
}

.footer-link:hover {
  color: #fff;
}

.social-icons .social-icon {
  color: #adb5bd;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  transition: color 0.2s ease-in-out, transform 0.2s ease;
}

.social-icons .social-icon:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.copyright-bar {
  background-color: #1a1a1a; /* Un poco más oscuro que el fondo principal del footer */
  font-size: 0.8rem;
  color: #6c757d;
}
</style>