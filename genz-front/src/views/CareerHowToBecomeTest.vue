<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Career How To Become Test</h1>

    <div class="flex justify-end mb-4">
      <button
        @click="toggleDarkMode"
        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
      >
        Toggle Dark Mode
      </button>
    </div>

    <CareerHowToBecome
      :isLoading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CareerHowToBecome from '@/components/Careers/Detail/CareerHowToBecome.vue';

const isLoading = ref(false);

// Toggle dark mode function
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

// Old sample data - no longer needed as we're using hardcoded data in the component
/*
const careerData = ref({
  id: 1,
  name: "Pastry Chef",
  education_level: "High School",
  degrees: [
    {
      id: 255,
      name: "Baking and Pastry Arts",
      slug: "baking-and-pastry-arts-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1717014186/hswv8lkmonh8nbypw1ns.jpg"
    },
    {
      id: 632,
      name: "Culinary Arts",
      slug: "culinary-arts-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1717015109/xwerb51zt37tz4bak72n.jpg"
    }
  ],
  education_levels: [
    {
      level: "High School Diploma",
      description: "A high school diploma or equivalent is the minimum educational requirement for becoming a pastry chef."
    },
    {
      level: "Certificate/Diploma",
      description: "A certificate or diploma in baking and pastry arts can provide specialized training in pastry techniques."
    },
    {
      level: "Associate's Degree",
      description: "An associate's degree in culinary arts or baking and pastry arts provides more comprehensive training."
    },
    {
      level: "Bachelor's Degree",
      description: "A bachelor's degree in culinary arts can provide advanced knowledge and business skills."
    }
  ],
  steps: [
    {
      number: 1,
      title: "Gain Culinary Experience",
      content: "Start by gaining experience in the culinary field, either through part-time jobs, internships, or entry-level positions in restaurants, bakeries, or pastry shops. This will give you exposure to kitchen operations and help you decide if pursuing a career as a pastry chef is the right path for you.",
      sub_steps: []
    },
    {
      number: 2,
      title: "Complete Culinary Education",
      content: "Consider enrolling in a culinary arts program or baking and pastry arts program at a reputable culinary school, community college, or vocational school. These programs provide a solid foundation in baking and pastry techniques, as well as instruction in food safety, nutrition, and kitchen management.",
      sub_steps: []
    },
    {
      number: 3,
      title: "Specialize in Pastry Arts",
      content: "Focus your studies and training on pastry arts and baking techniques. Take courses in cake decorating, bread baking, chocolate work, and other specialized areas of pastry production to develop your skills and expertise as a pastry chef.",
      sub_steps: []
    },
    {
      number: 4,
      title: "Gain Practical Experience",
      content: "Seek opportunities to gain hands-on experience in pastry kitchens, working under experienced pastry chefs and learning from their expertise. This may involve internships, apprenticeships, or entry-level positions as a pastry cook or assistant in professional kitchens.",
      sub_steps: []
    }
  ],
  path_overview: "",
  path_structure_type: "SIMPLE_STRUCTURE",
  resources: [
    {
      type: "CERTIFICATION",
      name: "Certified Pastry Culinarian (CPC)",
      description: "Offered by the American Culinary Federation (ACF), the CPC certification is designed for pastry professionals who have completed a culinary program and have at least two years of industry experience. It demonstrates competency in basic pastry techniques, including baking, pastry doughs, and dessert presentation.",
      url: null
    },
    {
      type: "CERTIFICATION",
      name: "Certified Executive Pastry Chef (CEPC)",
      description: "Also offered by the ACF, the CEPC certification is intended for experienced pastry chefs who have completed a culinary program and have at least five years of industry experience, including two years in a supervisory role. It demonstrates advanced skills in pastry arts, including chocolate work, sugar art, and advanced cake decorating.",
      url: null
    },
    {
      type: "CERTIFICATION",
      name: "Certified Master Pastry Chef (CMPC)",
      description: "The highest level of certification offered by the ACF, the CMPC certification is reserved for elite pastry professionals who have demonstrated mastery of advanced pastry techniques and leadership in the industry. It requires extensive experience, rigorous testing, and a portfolio review of pastry creations.",
      url: null
    }
  ]
});*/
</script>
