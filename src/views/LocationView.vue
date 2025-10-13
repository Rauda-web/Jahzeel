<template>
  <div class="location-view text-center fade-in-up">
    <h1 class="mb-4">NUESTRO CAMPO DE JUEGO</h1>
    <p class="lead mb-4">Encuéntranos en el punto de partida. ¡Te esperamos!</p>
    
    <div class="map-container shadow-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.493339933953!2d-99.1353986850933!3d19.43260778688179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f94c8c1c3e3d%3A0x3d3800f591b26a0!2sZ%C3%B3calo%2C%20P.za%20de%20la%20Constituci%C3%B3n%20S%2FN%2C%20Centro%20Hist%C3%B3rico%20de%20la%20Cdad.%20de%20M%C3%A9xico%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006010%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2ses!4v1678886353345!5m2!1ses-419!2ses" 
        width="100%" 
        height="450" 
        style="border:0;"
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple view
</script>

<style scoped>
.lead {
  color: #ccc;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--gray-color);
}

/* Making the map dark-themed */
iframe {
  filter: invert(90%) hue-rotate(180deg);
}
</style>