<template>
  <AppShell>
    <div class="careers-container">
      <div class="careers-header">
        <h1 class="careers-title">Explore Careers</h1>
        <p class="careers-subtitle">
          Discover career options that match your interests, skills, and education preferences
        </p>
      </div>
      
      <CareerFilter @career-selected="handleCareerSelected" />
    </div>
  </AppShell>
</template>

<script setup>
import { ref } from 'vue';
import AppShell from '@/components/AppShell.vue';
import CareerFilter from '@/components/careers/CareerFilter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCareerSelected = (career) => {
  router.push({ name: 'careers.show', params: { slug: career.slug } });
};
</script>

<style scoped>
.careers-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.careers-header {
  margin-bottom: 2rem;
  text-align: center;
}

.careers-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.careers-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}
</style> 