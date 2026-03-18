<template>
  <!-- Contenedor principal de la aplicación -->
  <div class="container">
    <!-- Título principal -->
    <h1>Eventos</h1>
    <!-- Select para filtrar eventos por categoría -->
    <!-- v-model enlaza la variable 'category' con el valor seleccionado -->
    <!-- @change ejecuta el método filterEvents cuando cambia la opción -->
    <select v-model="category" @change="filterEvents">
      <!-- Opción para mostrar todos los eventos -->
      <option value="">Todas</option>
      <!-- Opción para filtrar por categoría Música -->
      <option value="Música">Música</option>
      <!-- Opción para filtrar por categoría Tecnología -->
      <option value="Tecnología">Tecnología</option>
    </select>
    <!-- Bucle que recorre el array 'events' -->
    <!-- v-for genera una tarjeta por cada evento -->
    <!-- :key ayuda a Vue a identificar cada elemento de forma única -->
    <div v-for="event in events" :key="event.id" class="card">
      <!-- Muestra el título del evento -->
      <h2>{{ event.title }}</h2>
      <!-- Muestra la descripción del evento -->
      <p>{{ event.description }}</p>
      <!-- Muestra la fecha del evento -->
      <p>{{ event.date }}</p>
      <!-- Muestra el número de inscritos -->
      <p>Inscritos: {{ event.attendees }}</p>
    </div>
  </div>
</template>
<script>
// Exportamos el componente Vue
export default {
  // data() define el estado reactivo del componente
  data() {
    return {
      // Array donde se almacenarán los eventos obtenidos del backend
      events: [],
      // Variable para almacenar la categoría seleccionada en el select
      category: ''
    }
  },
  methods: {
    // Método asíncrono para obtener todos los eventos desde el backend
    async fetchEvents() {
      // Realiza una petición HTTP GET a la API
      const res = await fetch('http://localhost:3000/events');
      // Convierte la respuesta a JSON y la guarda en 'events'
      this.events = await res.json();
    },
    // Método asíncrono para filtrar eventos por categoría
    async filterEvents() {
      // Si no hay categoría seleccionada
      if (!this.category) {
        // Se vuelven a cargar todos los eventos
        this.fetchEvents();
        return;
      }
      // Realiza una petición al endpoint de filtrado pasando la categoría como parámetro
      const res = await fetch(
        `http://localhost:3000/events/filter?category=${this.category}`
      );
      // Guarda los eventos filtrados en 'events'
      this.events = await res.json();
    }
  },
  // Hook del ciclo de vida que se ejecuta cuando el componente se monta
  mounted() {
    // Llama al método para cargar los eventos al iniciar la app
    this.fetchEvents();
  }
}
</script>