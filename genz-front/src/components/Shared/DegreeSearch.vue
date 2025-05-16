<template>
  <div class="degree-search-component" :style="{
    paddingLeft: padding?.left || sideSpacing ? `${padding?.left || sideSpacing}px` : '0px',
    paddingRight: padding?.right || sideSpacing ? `${padding?.right || sideSpacing}px` : '0px',
    paddingTop: padding?.top ? `${padding.top}px` : '0px',
    paddingBottom: padding?.bottom ? `${padding.bottom}px` : '0px',
    marginLeft: margin?.left ? `${margin.left}px` : '0px',
    marginRight: margin?.right ? `${margin.right}px` : '0px',
    marginTop: margin?.top ? `${margin.top}px` : '0px',
    marginBottom: margin?.bottom ? `${margin.bottom}px` : '0px',
    width: width ? `${width}` : '100%'
  }">
    <!-- Degree search with dropdown -->
    <div class="relative degree-dropdown-container">
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
          :style="{ color: `var(--${themeColorName}-500)` }"
        />
        <input
          v-model="degreeStore.degreeSearchQuery"
          type="search"
          :placeholder="placeholder"
          @focus="degreeStore.toggleDropdown(true)"
          @click.stop="degreeStore.toggleDropdown(true)"
          :class="[
            'pl-10 pr-3 rounded-lg shadow-sm transition-colors duration-200 text-sm border focus:outline-none',
            inputClassname,
            `focus:ring-2 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`
          ]"
          :style="{
            width: inputWidth ? inputWidth : '100%',
            height: inputHeight ? `${inputHeight}px` : '48px',
            backgroundColor: isDarkMode
              ? 'rgba(30, 30, 30, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)'
          }"
        />
      </div>

      <!-- Dropdown menu -->
      <div
        v-if="degreeStore.showDegreeDropdown"
        class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
      >
        <div
          v-if="degreeStore.isLoading"
          class="px-5 py-4 text-gray-500 dark:text-gray-400 text-sm"
        >
          Loading degrees...
        </div>
        <div
          v-else-if="
            degreeStore.showDegreeDropdown &&
            degreeStore.degreeSearchQuery &&
            degreeStore.filteredDegrees.length === 0
          "
          class="px-5 py-4 text-gray-500 dark:text-gray-400 text-sm"
        >
          No degrees found
        </div>
        <div
          v-else
          class="max-h-72 overflow-y-auto custom-scrollbar"
        >
          <div
            v-for="degree in degreeStore.filteredDegrees"
            :key="degree.id"
            class="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 text-sm"
            @click="degreeStore.addDegree(degree.id)"
          >
            {{ degree.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Selected degrees -->
    <div v-if="degreeStore.selectedDegrees.length > 0" 
      :class="['flex flex-wrap', tagContainerClassname]"
      :style="{
        marginTop: tagContainerMarginTop ? `${tagContainerMarginTop}px` : '12px',
        gap: tagGap ? `${tagGap}px` : '8px'
      }">
      <div
        v-for="degree in degreeStore.selectedDegreesWithNames"
        :key="degree.id"
        class="inline-flex items-center px-3 py-1.5 rounded-full text-xs"
        :style="{
          backgroundColor: `var(--${themeColorName}-100)`,
          color: `var(--${themeColorName}-800)`,
        }"
      >
        <span>{{ degree.name }}</span>
        <button
          class="ml-2 focus:outline-none"
          @click="degreeStore.removeDegree(degree.id)"
        >
          <XCircle class="h-4 w-4" :style="{ color: `var(--${themeColorName}-500)` }" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Search, XCircle } from "lucide-vue-next";
import { useDegreeSearchStore } from "@/stores/degreeSearchStore";

// Props
const props = defineProps({
  themeColorName: {
    type: String,
    default: "blue",
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Search and select degrees",
  },
  sideSpacing: {
    type: Number,
    default: 0,
    description: "Spacing in pixels to add to both sides of the component",
  },
  // Enhanced spacing and layout options
  padding: {
    type: Object as () => { top?: number, right?: number, bottom?: number, left?: number },
    default: () => ({}),
  },
  margin: {
    type: Object as () => { top?: number, right?: number, bottom?: number, left?: number },
    default: () => ({}),
  },
  width: {
    type: String,
    default: '100%',
  },
  inputWidth: {
    type: String,
    default: '100%',
  },
  inputHeight: {
    type: Number,
    default: 48,
  },
  inputClassname: {
    type: String,
    default: '',
  },
  tagGap: {
    type: Number,
    default: 8,
  },
  tagContainerMarginTop: {
    type: Number,
    default: 12,
  },
  tagContainerClassname: {
    type: String,
    default: '',
  },
});

// Store
const degreeStore = useDegreeSearchStore();

// Fetch degrees on component mount
onMounted(async () => {
  await degreeStore.fetchDegrees();
  
  // Add click outside handler
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Handle clicking outside the dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const dropdownContainer = document.querySelector(".degree-dropdown-container");
  
  if (dropdownContainer && !dropdownContainer.contains(target)) {
    degreeStore.toggleDropdown(false);
  }
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) rgba(229, 231, 235, 0.5);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(229, 231, 235, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.7);
}
</style>