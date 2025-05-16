import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { FilterOption } from '@/types/career';
import { fetchCareerFilterOptions } from '@/services/careerService';

export const useDegreeSearchStore = defineStore('degreeSearch', () => {
  // State
  const degrees = ref<FilterOption[]>([]);
  const selectedDegrees = ref<number[]>([]);
  const degreeSearchQuery = ref('');
  const showDegreeDropdown = ref(false);
  const isLoading = ref(false);

  // Getters
  const filteredDegrees = computed(() => {
    if (!degreeSearchQuery.value) return degrees.value;

    const query = degreeSearchQuery.value.toLowerCase();
    return degrees.value.filter((degree) =>
      degree.name.toLowerCase().includes(query),
    );
  });

  const selectedDegreesWithNames = computed(() => {
    return selectedDegrees.value.map((id) => {
      const degree = degrees.value.find((d) => d.id === id);
      return {
        id,
        name: degree ? degree.name : `Degree ${id}`,
      };
    });
  });

  // Actions
  const fetchDegrees = async () => {
    if (degrees.value.length > 0) return;
    
    isLoading.value = true;
    try {
      const response = await fetchCareerFilterOptions();
      degrees.value = response.data.degrees || [];
    } catch (error) {
      console.error('Failed to fetch degrees:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const addDegree = (degreeId: number) => {
    if (!selectedDegrees.value.includes(degreeId)) {
      selectedDegrees.value.push(degreeId);
    }
    degreeSearchQuery.value = ''; // Clear search after selection
    showDegreeDropdown.value = false; // Close dropdown after selection
  };

  const removeDegree = (degreeId: number) => {
    selectedDegrees.value = selectedDegrees.value.filter((id) => id !== degreeId);
  };

  const reset = () => {
    selectedDegrees.value = [];
    degreeSearchQuery.value = '';
    showDegreeDropdown.value = false;
  };

  const toggleDropdown = (value?: boolean) => {
    if (value !== undefined) {
      showDegreeDropdown.value = value;
    } else {
      showDegreeDropdown.value = !showDegreeDropdown.value;
    }
  };

  return {
    // State
    degrees,
    selectedDegrees,
    degreeSearchQuery,
    showDegreeDropdown,
    isLoading,
    
    // Getters
    filteredDegrees,
    selectedDegreesWithNames,
    
    // Actions
    fetchDegrees,
    addDegree,
    removeDegree,
    reset,
    toggleDropdown,
  };
});