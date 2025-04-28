<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-4xl font-bold mb-6">FILM DIRECTOR CAREER PAGE</h1>
    <!-- Breadcrumb navigation -->
    <nav class="text-sm mb-6">
      <ol class="flex items-center space-x-2">
        <li><router-link to="/careers" class="hover:underline">Careers</router-link></li>
        <li class="flex items-center">
          <span class="mx-2">/</span>
          <a href="#" class="hover:underline">Film & Television</a>
        </li>
        <li class="flex items-center">
          <span class="mx-2">/</span>
          <span class="font-medium">{{ career.title }}</span>
        </li>
      </ol>
    </nav>

    <!-- Page Title -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">What does a {{ career.title.toLowerCase() }} do?</h1>
      <div class="flex items-center">
        <Badge :class="primaryColorClass + ' text-white'">
          {{ career.compatibility }} Match?
        </Badge>
      </div>
    </div>

    <!-- Career content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left sidebar with career summary -->
      <div class="lg:col-span-1">
        <Card class="sticky top-8">
          <CardHeader>
            <div class="flex items-center space-x-4">
              <img
                :src="career.thumbnail"
                :alt="career.title"
                class="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <CardTitle>{{ career.title }}</CardTitle>
                <CardDescription>
                  <Badge :class="primaryColorClass + ' text-white'">
                    {{ career.compatibility }} Match?
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <!-- Career test CTA -->
              <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p class="text-sm mb-3">
                  <strong>Would you make a good {{ career.title.toLowerCase() }}?</strong> Take our career test and find your match with over 800 careers.
                </p>
                <Button :class="primaryColorClass + ' text-white w-full'">
                  Take the free career test
                </Button>
                <p class="text-xs text-center mt-2 text-gray-500">
                  <a href="#" class="hover:underline">Learn more about the career test</a>
                </p>
              </div>

              <!-- Key Stats -->
              <div class="space-y-3">
                <!-- Salary -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <CurrencyDollarIcon class="h-5 w-5 mr-2 text-green-500" />
                    <span class="text-sm font-medium">Avg Salary</span>
                  </div>
                  <div class="text-sm">{{ career.salary.hourly }}</div>
                </div>

                <!-- Job Market -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
                    <span class="text-sm font-medium">Job Market</span>
                  </div>
                  <div class="text-sm">{{ career.jobMarket.growth }}</div>
                </div>

                <!-- Education -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <GraduationCapIcon class="h-5 w-5 mr-2 text-purple-500" />
                    <span class="text-sm font-medium">Education</span>
                  </div>
                  <div class="text-sm">{{ career.education }}</div>
                </div>

                <!-- Satisfaction -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <HeartIcon class="h-5 w-5 mr-2 text-red-500" />
                    <span class="text-sm font-medium">Satisfaction</span>
                  </div>
                  <div class="text-sm">{{ career.satisfaction }}</div>
                </div>

                <!-- Personality -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <UserIcon class="h-5 w-5 mr-2 text-orange-500" />
                    <span class="text-sm font-medium">Personality</span>
                  </div>
                  <div class="text-sm">{{ career.personality }}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Main content area -->
      <div class="lg:col-span-2">
        <!-- Table of Contents -->
        <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-lg font-medium mb-2">In this article:</h3>
          <ol class="list-decimal list-inside space-y-1 text-sm">
            <li><a href="#what-is" class="hover:underline" :class="primaryTextClass">What is a {{ career.title }}?</a></li>
            <li><a href="#what-does" class="hover:underline" :class="primaryTextClass">What does a {{ career.title }} do?</a></li>
            <li><a href="#workplace" class="hover:underline" :class="primaryTextClass">What is the workplace of a {{ career.title }} like?</a></li>
            <li><a href="#faq" class="hover:underline" :class="primaryTextClass">{{ career.faqs[0].question }}</a></li>
            <li><a href="#related" class="hover:underline" :class="primaryTextClass">Filmmaker Related Careers and Degrees</a></li>
          </ol>
        </div>

        <!-- What is a Film Director section -->
        <div id="what-is" class="mb-8">
          <h2 class="text-2xl font-bold mb-4">What is a {{ career.title }}?</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {{ career.description }}
          </p>
        </div>

        <!-- What does a Film Director do section -->
        <div id="what-does" class="mb-8">
          <h2 class="text-2xl font-bold mb-4">What does a {{ career.title }} do?</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Film directors are multifaceted professionals who blend artistic vision, technical expertise, and leadership skills to oversee all aspects of filmmaking, from pre-production planning to post-production editing, ensuring the creation of a cohesive and impactful cinematic experience.
          </p>

          <h3 class="text-xl font-semibold mb-3">Duties and Responsibilities</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4">Here are the key duties and responsibilities of a film director:</p>

          <ul class="list-disc list-inside space-y-2 mb-6">
            <li v-for="(duty, index) in career.duties" :key="index" class="text-gray-700 dark:text-gray-300">
              {{ duty }}
            </li>
          </ul>

          <h3 class="text-xl font-semibold mb-3">Types of {{ career.title }}s</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Film directors can be categorized into various types based on their directing styles, genres they specialize in, and their approaches to storytelling. Here are some common types of film directors:
          </p>

          <ul class="list-disc list-inside space-y-2">
            <li v-for="(type, index) in career.types" :key="index" class="text-gray-700 dark:text-gray-300">
              {{ type }}
            </li>
          </ul>
        </div>

        <!-- Personality section -->
        <Card class="mb-8">
          <CardHeader>
            <CardTitle>Are you suited to be a {{ career.title.toLowerCase() }}?</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ career.title }}s have distinct personalities. They tend to be artistic individuals,
              which means they're creative, intuitive, sensitive, articulate, and expressive.
              They are unstructured, original, nonconforming, and innovative. Some of them are also
              enterprising, meaning they're adventurous, ambitious, assertive, extroverted,
              energetic, enthusiastic, confident, and optimistic.
            </p>
            <p class="mb-4">Does this sound like you? Take our free career test to find out if {{ career.title.toLowerCase() }} is one of your top career matches.</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <Button :class="primaryColorClass + ' text-white'">
                Take the free test now
              </Button>
              <Button variant="outline">
                Learn more about the career test
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Workplace section -->
        <div id="workplace" class="mb-8">
          <h2 class="text-2xl font-bold mb-4">What is the workplace of a {{ career.title }} like?</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ career.workplace }}
          </p>
        </div>

        <!-- FAQ section -->
        <div id="faq" class="mb-8">
          <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible class="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger :class="primaryTextClass">{{ career.faqs[0].question }}</AccordionTrigger>
              <AccordionContent>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {{ career.faqs[0].answer }}
                </p>
                <div class="mt-4">
                  <h4 class="font-medium mb-2">See Also</h4>
                  <div class="flex flex-wrap gap-2">
                    <Badge variant="outline" class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Filmmaker
                    </Badge>
                    <Badge variant="outline" class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Film Producer
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <!-- Related careers and degrees section -->
        <div id="related" class="mb-8">
          <h2 class="text-2xl font-bold mb-4">Filmmaker Related Careers and Degrees</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Related careers -->
            <div>
              <h3 class="text-lg font-medium mb-4">Careers</h3>
              <ul class="space-y-2">
                <li v-for="career in career.relatedCareers" :key="career.slug">
                  <a
                    :href="`/careers/${career.slug}`"
                    class="flex items-center hover:underline"
                    :class="primaryTextClass"
                  >
                    <BriefcaseIcon class="h-4 w-4 mr-2" />
                    {{ career.title }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Related degrees -->
            <div>
              <h3 class="text-lg font-medium mb-4">Degrees</h3>
              <ul class="space-y-2">
                <li v-for="degree in career.relatedDegrees" :key="degree.slug">
                  <a
                    :href="`/degrees/${degree.slug}`"
                    class="flex items-center hover:underline"
                    :class="primaryTextClass"
                  >
                    <GraduationCapIcon class="h-4 w-4 mr-2" />
                    {{ degree.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6">
            <Button variant="outline" class="w-full">
              Continue reading
            </Button>
          </div>

          <div class="mt-4">
            <h4 class="font-medium mb-2">See Also</h4>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="career in career.relatedCareers.slice(0, 6)" :key="career.slug"
                     variant="outline" class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                {{ career.title }}
              </Badge>
            </div>
          </div>
        </div>

        <!-- Also known as section -->
        <div class="mb-8">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Film Directors are also known as:<br>
            Director
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom navigation -->
    <div class="mt-8 border-t pt-8 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4">Up Next</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent class="p-4">
            <div class="flex items-center space-x-3">
              <CurrencyDollarIcon class="h-5 w-5 text-green-500" />
              <div>
                <h4 class="font-medium">Avg Salary</h4>
                <p>{{ career.salary.hourly }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="p-4">
            <div class="flex items-center space-x-3">
              <ChartBarIcon class="h-5 w-5 text-blue-500" />
              <div>
                <h4 class="font-medium">Growth</h4>
                <p>{{ career.jobMarket.growth }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="p-4">
            <div class="flex items-center space-x-3">
              <HeartIcon class="h-5 w-5 text-red-500" />
              <div>
                <h4 class="font-medium">Satisfaction</h4>
                <p>{{ career.satisfaction }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Navigation links -->
      <div class="mt-6">
        <ol class="list-decimal list-inside space-y-1">
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Your Compatibility</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Overview</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Salary</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Job Market</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">How to Become</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Education</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Satisfaction</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Personality</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Demographics</a></li>
          <li><a href="#" class="hover:underline" :class="primaryTextClass">Work Environment</a></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { currentTheme } from '@/lib/theme-utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  UserIcon,
  ChartBarIcon,
  CurrencyDollarIcon
} from 'lucide-vue-next';
import careerData from '@/data/careerdata.json';


// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Career data
const career = ref(careerData);

// Computed classes for theme colors
const primaryColorClass = computed(() => `bg-${themeColorName.value}-500 hover:bg-${themeColorName.value}-600`);
const primaryTextClass = computed(() => `text-${themeColorName.value}-500 hover:text-${themeColorName.value}-600`);
const primaryBorderClass = computed(() => `border-${themeColorName.value}-500`);
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

h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

p, ul, ol {
  animation: fadeIn 0.7s ease-out forwards;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
