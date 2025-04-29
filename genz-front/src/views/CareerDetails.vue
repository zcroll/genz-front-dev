<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-6">Redirecting to Career Details...</h1>
      <p class="mb-6">You will be redirected to the Film Director career page in a moment.</p>
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-blue-500 mx-auto"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "@/layout/Main-layout.vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Define the layout to use
defineOptions({
  layout: MainLayout,
});

const router = useRouter();

// Redirect to the career detail page after a short delay
onMounted(() => {
  setTimeout(() => {
    router.push('/career-detail');
  }, 1500);
});
</script>