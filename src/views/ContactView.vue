<template>
  <div class="contact-view fade-in-up contact-view-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card form-card">
          <div class="card-body">
            <h1 class="card-title text-center mb-4">PONTE EN CONTACTO</h1>
            <p class="text-center text-muted mb-4">¿Listo para llevar tu rendimiento al siguiente nivel? Escríbenos.</p>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" v-model="form.name" required>
              </div>
              <div class="mb-4">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="email" v-model="form.email" required>
              </div>
              <div class="mb-4">
                <label for="phone" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="phone" v-model="form.phone">
              </div>
              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-sporty btn-lg">ENVIAR MENSAJE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: ''
})

const handleSubmit = () => {
  alert(`Gracias por tu mensaje, ${form.value.name}! Nos pondremos en marcha para contactarte.`)
  form.value = { name: '', email: '', phone: '' }
}
</script>

<style scoped>
.contact-view-container {
  padding-top: 120px;
}

.form-card {
  background-color: var(--dark-color);
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 2rem;
}

.form-label {
  font-weight: 600;
  color: #ccc;
}

.form-control {
  background-color: var(--gray-color);
  border: 1px solid #555;
  color: var(--light-color);
  padding: 0.75rem;
}

.form-control:focus {
  background-color: var(--gray-color);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(255, 111, 0, 0.25);
  color: var(--light-color);
}

.btn-sporty {
  background-color: var(--primary-color);
  color: var(--dark-color);
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
  letter-spacing: 1px;
}

.btn-sporty:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
  transform: scale(1.02);
}
</style>