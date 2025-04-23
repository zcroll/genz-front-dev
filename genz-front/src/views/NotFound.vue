<script setup lang="ts">
// No additional logic needed for this component
</script>

<template>
  <div class="not-found-container">
    <div class="error-code">404</div>
    <h1>Page Not Found</h1>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    
    <div class="navigation">
      <router-link to="/" class="nav-link">Back to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #e74c3c;
  line-height: 1;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.navigation {
  margin-top: 2rem;
}

.nav-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2980b9;
}
</style>