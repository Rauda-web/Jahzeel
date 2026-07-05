<template>
  <footer class="footer-container text-light">
    <div class="container py-5">
      <div class="row">

        <!-- Columna de la Marca -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase footer-brand">SPORT·FLOW</h5>
          <p class="footer-tagline">
            Hechas para el movimiento. Diseñadas para ti.
          </p>
          <div class="social-icons mt-4">
            <a href="#" class="social-icon"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
          </div>
        </div>

        <!-- Columna de Tienda -->
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
            <li><router-link to="/contact" class="footer-link">Contacto</router-link></li>
            <li><router-link to="/location" class="footer-link">Ubicación</router-link></li>
            <li><a href="#" class="footer-link">Preguntas Frecuentes</a></li>
            <li><a href="#" class="footer-link">Guía de Tallas</a></li>
          </ul>
        </div>

        <!-- Columna de Contacto -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase footer-heading">Contáctanos</h5>
          <ul class="list-unstyled mb-0 contact-list">
            <li><i class="bi bi-geo-alt-fill me-2"></i>Zócalo, CDMX, México</li>
            <li><i class="bi bi-telephone-fill me-2"></i>+52 (55) 1234-5678</li>
            <li><i class="bi bi-envelope-fill me-2"></i>hola@sportflow.mx</li>
            <li><i class="bi bi-clock-fill me-2"></i>Lun–Sáb: 9am – 8pm</li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Copyright -->
    <div class="copyright-bar text-center py-3">
      &copy; {{ new Date().getFullYear() }} SPORT·FLOW. Todos los derechos reservados.
    </div>
  </footer>
</template>

<script setup>
// No se necesita lógica de script para este footer estático.
</script>

<style scoped>
.footer-container {
  background-color: #111;
  border-top: 3px solid #ff0077;
}

.footer-brand {
  font-weight: 900;
  letter-spacing: 2px;
  font-size: 1.4rem;
  color: #ff0077;
}

.footer-tagline {
  color: #adb5bd;
  font-size: 0.9rem;
  margin-top: 0.75rem;
}

.footer-heading {
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: #fff;
  letter-spacing: 1px;
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  display: inline-block;
  padding: 0.25rem 0;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #ff0077;
}

.social-icons .social-icon {
  color: #adb5bd;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  transition: color 0.2s ease-in-out, transform 0.2s ease;
}

.social-icons .social-icon:hover {
  color: #ff0077;
  transform: translateY(-3px);
}

.contact-list li {
  color: #adb5bd;
  font-size: 0.9rem;
  padding: 0.3rem 0;
  display: flex;
  align-items: center;
}

.contact-list i {
  color: #ff0077;
  font-size: 0.9rem;
}

.copyright-bar {
  background-color: #0a0a0a;
  font-size: 0.8rem;
  color: #6c757d;
  border-top: 1px solid rgba(255,255,255,0.06);
}
</style>