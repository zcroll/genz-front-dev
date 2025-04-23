<script setup lang="ts">
// You can add component imports and logic here
</script>

<template>
  <div class="about-container">
    <h1>About Page</h1>
    <p>This is the about page of the GenZ application.</p>

    <div class="content">
      <h2>About Our Project</h2>
      <p>
        This is a Vue 3 application with TypeScript, Vue Router, and Pinia store.
        It demonstrates best practices for setting up a modern Vue application.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Vue 3 Composition API</li>
        <li>TypeScript integration</li>
        <li>Vue Router with lazy loading</li>
        <li>Pinia state management</li>
        <li>Tailwind CSS for styling</li>
      </ul>
    </div>

    <div class="navigation">
      <router-link to="/" class="nav-link">Back to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.5rem;
}

.content {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
}

ul {
  margin-left: 1.5rem;
  line-height: 1.6;
}

.navigation {
  margin-top: 2rem;
}

.nav-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2980b9;
}
</style>