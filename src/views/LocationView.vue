<template>
  <div class="location-view fade-in-up">
    <div class="location-header">
      <h1 class="location-title">NUESTRO CAMPO DE JUEGO</h1>
      <p class="location-subtitle">Encuéntranos en el punto de partida. ¡Te esperamos!</p>
    </div>

    <div class="container">
      <div class="map-wrapper shadow-lg">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.493339933953!2d-99.1353986850933!3d19.43260778688179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f94c8c1c3e3d%3A0x3d3800f591b26a0!2sZ%C3%B3calo%2C%20P.za%20de%20la%20Constituci%C3%B3n%20S%2FN%2C%20Centro%20Hist%C3%B3rico%20de%20la%20Cdad.%20de%20M%C3%A9xico%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006010%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2ses!4v1678886353345!5m2!1ses-419!2ses" 
          width="100%" 
          height="500" 
          style="border:0;"
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <div class="location-info">
        <div class="info-card">
          <i class="bi bi-geo-alt-fill info-icon"></i>
          <div>
            <h5>Dirección</h5>
            <p>Zócalo, Plaza de la Constitución S/N, Centro Histórico, CDMX</p>
          </div>
        </div>
        <div class="info-card">
          <i class="bi bi-clock-fill info-icon"></i>
          <div>
            <h5>Horario</h5>
            <p>Lunes a Sábado: 9:00 am – 8:00 pm<br>Domingo: 10:00 am – 6:00 pm</p>
          </div>
        </div>
        <div class="info-card">
          <i class="bi bi-telephone-fill info-icon"></i>
          <div>
            <h5>Contacto</h5>
            <p>+52 (55) 1234-5678</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple view
</script>

<style scoped>
/* CORRECCIÓN: padding-top para compensar la navbar fixed-top (~80px de navbar + 2rem extra) */
.location-view {
  padding-top: 7rem;
  padding-bottom: 4rem;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Encabezado centrado con fondo oscuro y gradiente */
.location-header {
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 3rem 1rem 3.5rem;
  margin-bottom: -1.5rem;
  position: relative;
}

.location-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.location-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 0;
}

/* Contenedor del mapa */
.map-wrapper {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #dee2e6;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

/* Filtro oscuro al iframe */
iframe {
  filter: invert(90%) hue-rotate(180deg);
  display: block;
}

/* Tarjetas de información */
.location-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
  border-left: 4px solid transparent;
  border-image: linear-gradient(135deg, #ff0077, #ff6600) 1;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.info-icon {
  font-size: 1.6rem;
  background: linear-gradient(135deg, #ff0077, #ff6600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.info-card h5 {
  font-weight: 700;
  color: #222;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.info-card p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0;
  line-height: 1.5;
}
</style>