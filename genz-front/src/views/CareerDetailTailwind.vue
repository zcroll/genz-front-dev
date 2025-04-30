 <template>
  <div class="container mx-auto py-8 px-4 max-w-7xl">
    <!-- Breadcrumb navigation with enhanced styling -->
    <nav class="text-sm mb-6">
      <ol class="flex items-center space-x-2">
        <li><router-link to="/careers" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:underline transition-colors">Careers</router-link></li>
        <li class="flex items-center">
          <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:underline transition-colors">Film & Television</a>
        </li>
        <li class="flex items-center">
          <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ career.title }}</span>
        </li>
      </ol>
    </nav>

    <!-- Career title and compatibility with enhanced styling -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold mb-3 text-gray-900 dark:text-white">What does a {{ career.title.toLowerCase() }} do?</h1>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <span :class="[
          'px-3 py-1 text-sm font-medium rounded-full text-white inline-flex items-center justify-center shadow-sm',
          `bg-${themeColorName}-500 hover:bg-${themeColorName}-600 transition-colors`
        ]">
          {{ career.compatibility }} Match?
        </span>
        <p class="text-gray-600 dark:text-gray-400">
          <strong>Would you make a good {{ career.title.toLowerCase() }}?</strong> Take our career test and find your match with over 800 careers.
        </p>
      </div>
    </div>

    <!-- Career content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left sidebar with career summary - enhanced styling -->
      <div class="lg:col-span-1">
        <div class="sticky top-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">

          <!-- Card header with enhanced styling -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
            <div class="flex items-center space-x-4">
              <img
                :src="career.thumbnail"
                :alt="career.title"
                class="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100 dark:border-gray-700"
              />
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ career.title }}</h2>
                <div class="mt-1">
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm',
                    `bg-${themeColorName}-500`
                  ]">
                    {{ career.compatibility }} Match?
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card content -->
          <div class="p-6">
            <div class="space-y-4">
              <!-- Career test CTA with enhanced styling -->
              <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-sm mb-3 text-gray-700 dark:text-gray-300">
                  <strong>Would you make a good {{ career.title.toLowerCase() }}?</strong> Take our career test and find your match with over 800 careers.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button :class="[
                    'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm',
                    `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
                  ]">
                    Take the free test now
                  </button>
                  <button class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
                    Learn more about the career test
                  </button>
                </div>
              </div>

              <!-- Career stats with enhanced styling -->
              <div class="space-y-3">
                <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Avg Salary</span>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium">{{ career.salary.hourly }}</span>
                </div>
                <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

                <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="9" y2="15"></line>
                      <line x1="15" y1="9" x2="15" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Job Market</span>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium">{{ career.jobMarket.growth }}</span>
                </div>
                <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

                <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Education</span>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium">{{ career.education }}</span>
                </div>
                <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

                <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Satisfaction</span>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium">{{ career.satisfaction }}</span>
                </div>
                <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

                <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Personality</span>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium">{{ career.personality }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <div class="lg:col-span-2">
        <!-- Navigation tabs with enhanced styling -->
        <div class="mb-8 border-b dark:border-gray-700">
          <div class="flex flex-wrap -mb-px">
            <a
              v-for="(tab, index) in tabs"
              :key="index"
              href="#"
              @click.prevent="activeTab = tab.id"
              :class="[
                'inline-block py-4 px-4 text-sm font-medium transition-colors duration-200',
                activeTab === tab.id
                  ? `border-b-2 border-${themeColorName}-500 text-${themeColorName}-500 hover:text-${themeColorName}-600`
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              ]"
            >
              {{ tab.label }}
            </a>
          </div>
        </div>

        <!-- Tab content with enhanced styling -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- What is a Film Director section -->
          <div id="what-is" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is a {{ career.title }}?</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ career.description }}
            </p>
          </div>

          <!-- What does a Film Director do section with enhanced styling -->
          <div id="what-does" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What does a {{ career.title }} do?</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {{ career.title }}s are multifaceted professionals who blend artistic vision, technical expertise, and leadership skills to oversee all aspects of filmmaking, from pre-production planning to post-production editing, ensuring the creation of a cohesive and impactful cinematic experience.
            </p>

            <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Duties and Responsibilities</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              Here are the key duties and responsibilities of a {{ career.title.toLowerCase() }}:
            </p>

            <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="(duty, index) in career.duties" :key="index" class="leading-relaxed">
                {{ duty }}
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Types of {{ career.title }}s</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              {{ career.title }}s can be categorized into various types based on their directing styles, genres they specialize in, and their approaches to storytelling. Here are some common types of {{ career.title.toLowerCase() }}s:
            </p>

            <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="(type, index) in career.types" :key="index" class="leading-relaxed">
                {{ type }}
              </li>
            </ul>
          </div>

          <!-- Are you suited to be a film director? with enhanced styling -->
          <div id="suited" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Are you suited to be a {{ career.title.toLowerCase() }}?</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {{ career.title }}s have distinct personalities. They tend to be artistic individuals, which means they're creative, intuitive, sensitive, articulate, and expressive. They are unstructured, original, nonconforming, and innovative. Some of them are also enterprising, meaning they're adventurous, ambitious, assertive, extroverted, energetic, enthusiastic, confident, and optimistic.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Does this sound like you? Take our free career test to find out if {{ career.title.toLowerCase() }} is one of your top career matches.
            </p>

            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <button :class="[
                'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm',
                `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
              ]">
                Take the free test now
              </button>
              <button class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
                Learn more about the career test
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'workplace'" class="space-y-8">
          <!-- Workplace section with enhanced styling -->
          <div id="workplace" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is the workplace of a {{ career.title }} like?</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {{ career.workplace }}
            </p>
          </div>
        </div>

        <div v-if="activeTab === 'faq'" class="space-y-8">
          <!-- FAQ section with enhanced styling -->
          <div id="faq" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div v-for="(faq, index) in career.faqs" :key="index" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
                <button
                  @click="toggleFaq(index)"
                  class="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors"
                >
                  <span>{{ faq.question }}</span>
                  <svg
                    class="w-5 h-5 transition-transform duration-200"
                    :class="{ 'rotate-180': openFaqs.includes(index) }"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div
                  v-show="openFaqs.includes(index)"
                  class="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-pre-line bg-white dark:bg-gray-800/50"
                >
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'related'" class="space-y-8">
          <!-- Related careers and degrees with enhanced styling -->
          <div id="related" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ career.title }} Related Careers and Degrees</h2>

            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Careers</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li v-for="(relatedCareer, index) in career.relatedCareers" :key="index">
                <a :href="`/careers/${relatedCareer.slug}`" class="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ relatedCareer.title }}</span>
                </a>
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">Degrees</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li v-for="(relatedDegree, index) in career.relatedDegrees" :key="index">
                <a :href="`/degrees/${relatedDegree.slug}`" class="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ relatedDegree.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom navigation with enhanced styling -->
    <div class="mt-10 border-t pt-8 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">Up Next</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 dark:text-gray-200">Avg Salary</h4>
                <p class="text-gray-700 dark:text-gray-300 mt-1 font-medium">{{ career.salary.hourly }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="9" y2="15"></line>
                  <line x1="15" y1="9" x2="15" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 dark:text-gray-200">Growth</h4>
                <p class="text-gray-700 dark:text-gray-300 mt-1 font-medium">{{ career.jobMarket.growth }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-red-50 dark:bg-red-900/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 dark:text-gray-200">Satisfaction</h4>
                <p class="text-gray-700 dark:text-gray-300 mt-1 font-medium">{{ career.satisfaction }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import careerData from '@/data/careerdata.json';
import MainLayout from "@/layout/Main-layout.vue";

// Define the layout to use
defineOptions({
  layout: MainLayout,
});

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Career data
const career = ref(careerData);

// Active tab state
const activeTab = ref('overview');

// FAQ accordion state
const openFaqs = ref<number[]>([]);

// Toggle FAQ accordion
const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};

// Tabs configuration
const tabs = [
  { id: 'overview', label: 'Career Overview' },
  { id: 'workplace', label: 'Work Environment' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Careers' }
];
</script>

<style scoped>
/* Animation for content sections */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Smooth transitions for tab content */
div[id^="what-"], div[id^="workplace"], div[id^="faq"], div[id^="related"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Card animations */
.sticky {
  animation: slideInRight 0.6s ease-out forwards;
}

/* Bottom navigation animations */
.grid > div {
  animation: scaleIn 0.5s ease-out forwards;
}

.grid > div:nth-child(1) {
  animation-delay: 0.1s;
}

.grid > div:nth-child(2) {
  animation-delay: 0.2s;
}

.grid > div:nth-child(3) {
  animation-delay: 0.3s;
}

/* Hover effects */
.hover\:shadow-md:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>
