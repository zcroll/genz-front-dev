<template>
  <div>
    <!-- Navigation component -->
    <CareerNavigationSkeleton v-if="isLoadingNavigation" />
    <CareerNavigation 
      v-else
      :slug="slug" 
      :active-tab="activeTab" 
      :is-loading="isLoadingNavigation"
      :navigationItems="navigationItems"
      @tab-changed="$emit('tab-changed', $event)"
    />

    <!-- Tab content with loading skeletons -->
    <div class="mb-10">
      <!-- Overview tab -->
      <CareerContentSkeleton v-if="activeTab === 'overview' && isLoadingOverview" />
      <CareerOverview
        v-else-if="activeTab === 'overview'"
        :overview="careerOverview"
        :isLoading="isLoadingOverview"
      />

      <!-- How to Become tab -->
      <CareerContentSkeleton v-if="activeTab === 'how-to-become' && isLoadingHowToBecome" />
      <CareerHowToBecome
        v-else-if="activeTab === 'how-to-become'"
        :howToBecome="careerHowToBecome"
        :isLoading="isLoadingHowToBecome"
      />

      <!-- Personality tab -->
      <CareerContentSkeleton v-if="activeTab === 'personality' && isLoadingPersonality" />
      <CareerPersonality
        v-else-if="activeTab === 'personality'"
        :personality="careerPersonality"
        :isLoading="isLoadingPersonality"
      />

      <!-- Work Environment tab -->
      <CareerContentSkeleton v-if="activeTab === 'work-environment' && isLoadingWorkEnvironment" />
      <CareerWorkEnvironment
        v-else-if="activeTab === 'work-environment'"
        :workEnvironment="careerWorkEnvironment"
        :isLoading="isLoadingWorkEnvironment"
      />

      <!-- Tech Skills tab and related tabs -->
      <CareerContentSkeleton v-if="(activeTab === 'tech-skills' || activeTab === 'technologies' || activeTab === 'skills') && isLoadingTechSkills" />
      <CareerTechSkills
        v-else-if="activeTab === 'tech-skills' || activeTab === 'technologies' || activeTab === 'skills'"
        :techSkills="careerTechSkills"
        :isLoading="isLoadingTechSkills"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CareerNavigation from './CareerNavigation.vue';
import CareerOverview from './CareerOverview.vue';
import CareerHowToBecome from './CareerHowToBecome.vue';
import CareerPersonality from './CareerPersonality.vue';
import CareerWorkEnvironment from './CareerWorkEnvironment.vue';
import CareerTechSkills from './CareerTechSkills.vue';

// Import skeleton components
import CareerNavigationSkeleton from './Skeleton/CareerNavigationSkeleton.vue';
import CareerContentSkeleton from './Skeleton/CareerContentSkeleton.vue';

// Import types
import type { 
  CareerOverview as CareerOverviewType,
  CareerHowToBecome as CareerHowToBecomeType,
  CareerPersonality as CareerPersonalityType,
  CareerWorkEnvironment as CareerWorkEnvironmentType,
  CareerTechSkills as CareerTechSkillsType,
  CareerNavigationItem
} from '@/types/career';

// Define props with types
const props = defineProps<{
  slug: string;
  activeTab: string;
  careerOverview: CareerOverviewType | null;
  careerHowToBecome: CareerHowToBecomeType | null;
  careerPersonality: CareerPersonalityType | null;
  careerWorkEnvironment: CareerWorkEnvironmentType | null;
  careerTechSkills: CareerTechSkillsType | null;
  navigationItems: CareerNavigationItem[];
  isLoadingNavigation: boolean;
  isLoadingOverview: boolean;
  isLoadingHowToBecome: boolean;
  isLoadingPersonality: boolean;
  isLoadingWorkEnvironment: boolean;
  isLoadingTechSkills: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: 'tab-changed', tabKey: string): void;
}>();
</script>