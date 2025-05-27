<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-10">
      <p class="text-xl text-gray-700 dark:text-gray-300">Loading career details...</p>
    </div>

    <!-- Content Area: Display only if not loading and data is available -->
    <div v-else-if="howToBecome && howToBecome.career" class=" mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
    <!-- Page Header -->
      <header class="mb-8">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">How to Become a {{ howToBecome.career }}</h1>
            <div class="flex items-center flex-wrap gap-2 mt-2">
              <Badge variant="outline" class="border-primary text-primary">{{ howToBecome.career }}</Badge>
              <Badge variant="outline">{{ howToBecome.country }}</Badge>
              <Badge variant="secondary">{{ howToBecome.education_level }} Level</Badge>
            </div>
          </div>
          <Card class="w-full md:w-auto md:min-w-[300px] bg-white dark:bg-gray-800/30 mt-4 md:mt-0" v-if="howToBecome.pathway_ranking_criteria && howToBecome.pathway_ranking_criteria.length > 0">
            <CardHeader class="pb-2 pt-4 px-4">
              <CardTitle class="text-base font-medium text-gray-700 dark:text-gray-300">Ranking Criteria</CardTitle>
            </CardHeader>
            <CardContent class="p-4 pt-0">
              <ul class="space-y-1">
                <li v-for="(criteria, index) in howToBecome.pathway_ranking_criteria" :key="index" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  {{ criteria }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>    
      </header>

      <!-- All Academic Pathways Section - Enhanced Accordion -->
      <section class="mb-1" v-if="howToBecome.academic_pathways && howToBecome.academic_pathways.length > 0">
        <h2 class="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
          <span :class="[
            'inline-block p-2 rounded-full',
            `bg-${themeColorName}-50 dark:bg-${themeColorName}-900/20`
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                 :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400`">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/>
              <path d="M22 10v6"/>
              <path d="M6 12v5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5V12"/>
            </svg>
          </span>
          Academic Pathways
        </h2>
        <Accordion type="single" collapsible class="w-full space-y-3">
          <AccordionItem v-for="pathway in howToBecome.academic_pathways" :key="pathway.pathway_id" :value="pathway.pathway_id" :class="[
            'overflow-hidden transition-all duration-300 ease-in-out rounded-lg',
            'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm',
            'border border-gray-100 dark:border-gray-800 shadow-sm',
          
          ]">
            <AccordionTrigger class="p-4 hover:no-underline text-left w-full">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                <div class="flex items-center gap-3 flex-grow">
                  <Badge :variant="getBadgeVariantByRank(pathway.rank)" class="self-start sm:self-center whitespace-nowrap">
                    Rank #{{ pathway.rank }}
                  </Badge>
                  <span class="font-semibold text-lg text-gray-900 dark:text-white text-left">{{ pathway.pathway_name }}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0 sm:ml-auto flex-shrink-0">
                  <div class="flex items-center gap-1.5">
                    <div :class="['p-1 rounded-full transition-colors duration-300', pathway.rank === 1 ? `bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30` : 'bg-gray-100 dark:bg-gray-700']">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="['flex-shrink-0 transition-colors duration-300', pathway.rank === 1 ? `text-${themeColorName}-600 dark:text-${themeColorName}-400` : 'text-gray-500 dark:text-gray-400']"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <span>{{ pathway.duration_years }} years</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                     <div :class="['p-1 rounded-full transition-colors duration-300', pathway.rank === 1 ? `bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30` : 'bg-gray-100 dark:bg-gray-700']">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="['flex-shrink-0 transition-colors duration-300', pathway.rank === 1 ? `text-${themeColorName}-600 dark:text-${themeColorName}-400` : 'text-gray-500 dark:text-gray-400']"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                    </div>
                    <span>{{ formatCurrency(pathway.estimated_total_cost_MAD) }}</span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent class="p-4 border-t border-gray-200 dark:border-gray-700">
              <!-- Pathway Details Content -->
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                <strong>Why this rank:</strong> {{ pathway.ranking_reason }}
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ pathway.description }}</p>
              
              <!-- Institutions for pathway -->
              <div v-if="pathway.institutions && pathway.institutions.length > 0">
                <h3 class="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div :class="[
                    'p-1.5 rounded-full transition-colors duration-300',
                    pathway.rank === 1 ? `bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30` : 'bg-gray-100 dark:bg-gray-700/40'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                         :class="[
                           'transition-colors duration-300',
                           pathway.rank === 1 ? `text-${themeColorName}-600 dark:text-${themeColorName}-400` : 'text-gray-600 dark:text-gray-300'
                         ]">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/> <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  Recommended Institutions:
                </h3>
                <div class="space-y-4">
                  <Card v-for="institution in pathway.institutions" :key="institution.institution_id" class="bg-gray-50 dark:bg-gray-700/50">
                    <CardHeader class="pb-3">
                      <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <CardTitle class="text-lg text-gray-900 dark:text-white">{{ institution.name }}</CardTitle>
                        <div class="flex flex-wrap gap-2 mt-1 md:mt-0">
                          <Badge variant="secondary">{{ institution.tier }} Tier</Badge>
                          <Badge variant="outline">{{ institution.public_or_private }}</Badge>
                          <Badge variant="outline">{{ institution.location }}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div class="text-sm mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 dark:text-gray-400 flex-shrink-0"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                          <span v-if="institution.language_of_instruction && institution.language_of_instruction.length > 0">Instruction: {{ institution.language_of_instruction.join(", ") }}</span>
                          <span v-else>Instruction: N/A</span>
                        </div>
                        <div v-if="institution.admission_competitiveness" class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 dark:text-gray-400 flex-shrink-0"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                          <span>Admission: {{ institution.admission_competitiveness }} Competition</span>
                        </div>
                      </div>
                      <h4 v-if="institution.programs && institution.programs.length > 0" class="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Programs:</h4>
                      <div class="space-y-3">
                        <div v-for="program in institution.programs" :key="program.program_id" class="bg-white dark:bg-gray-800/40 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h5 class="font-medium text-gray-900 dark:text-white">{{ program.program_name }}</h5>
                            <Badge variant="default">{{ program.degree_level }}</Badge>
                          </div>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 text-xs">
                            <div v-if="program.admission_requirements">
                              <h6 class="font-medium text-gray-500 dark:text-gray-400 mb-1">Admission Requirements</h6>
                              <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                                <li v-if="program.admission_requirements.previous_education" class="flex items-start gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                  <span>{{ program.admission_requirements.previous_education }}</span>
                                </li>
                                <li v-if="program.admission_requirements.minimum_score && program.admission_requirements.minimum_score !== 'N/A'" class="flex items-start gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                                  <span>Min. Score: {{ program.admission_requirements.minimum_score }}</span>
                                </li>
                                <li class="flex items-start gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                                  <span>Entrance Exam: {{ program.admission_requirements.entrance_exam === null ? 'N/A' : (program.admission_requirements.entrance_exam ? 'Yes' : 'No') }}</span>
                                </li>
                                <li v-if="program.admission_requirements.language_requirements && program.admission_requirements.language_requirements.length > 0" class="flex items-start gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                                  <span>Language: {{ program.admission_requirements.language_requirements.join(", ") }}</span>
            </li>
          </ul>
        </div>
                            <div v-if="program.curriculum_strength || program.industry_connections">
                              <h6 class="font-medium text-gray-500 dark:text-gray-400 mb-1">Program Quality</h6>
                              <div class="space-y-2">
                                <div v-if="program.curriculum_strength">
                                  <div class="flex justify-between text-gray-700 dark:text-gray-300 mb-0.5">
                                    <span>Curriculum</span>
                                    <span>{{ program.curriculum_strength }}</span>
                                  </div>
                                  <Progress :model-value="getStrengthValue(program.curriculum_strength)" :class="getStrengthProgressClass(program.curriculum_strength)" class="h-1.5" />
                                </div>
                                <div v-if="program.industry_connections">
                                  <div class="flex justify-between text-gray-700 dark:text-gray-300 mb-0.5">
                                    <span>Industry Connections</span>
                                    <span>{{ program.industry_connections }}</span>
                                  </div>
                                  <Progress :model-value="getStrengthValue(program.industry_connections)" :class="getStrengthProgressClass(program.industry_connections)" class="h-1.5" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Separator v-if="program.certification || (program.career_outcomes && program.career_outcomes.length > 0)" class="my-2 dark:border-gray-700" />
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div v-if="program.certification">
                              <h6 class="font-medium text-gray-500 dark:text-gray-400 mb-1">Certification</h6>
                              <div class="space-y-1 text-gray-700 dark:text-gray-300">
                                <div class="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 dark:text-gray-400 flex-shrink-0"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                                  <span>{{ program.certification.degree_awarded }}</span>
                                </div>
                                <div class="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 dark:text-gray-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                  <span>{{ program.certification.recognition_level }} Recognition</span>
                                </div>
                              </div>
                            </div>
                            <div v-if="program.career_outcomes && program.career_outcomes.length > 0">
                              <h6 class="font-medium text-gray-500 dark:text-gray-400 mb-1">Career Outcomes</h6>
                              <div class="flex flex-wrap gap-1">
                                <Badge v-for="(outcome, outcomeIdx) in program.career_outcomes" :key="outcomeIdx" variant="outline" size="sm" class="text-xs">
                                  {{ outcome }}
                                </Badge>
                              </div>
                            </div>
                          </div>
          </div>
            </div>
                       <p v-if="!institution.programs || institution.programs.length === 0" class="text-xs text-gray-500 dark:text-gray-400">No specific programs listed for this institution.</p>
                    </CardContent>
                  </Card>
            </div>
          </div>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400 mt-4">No specific institutions listed for this pathway.</p>
              
              <!-- Progression Opportunities for pathway -->
              <div v-if="getProgressionForPathway(pathway.pathway_id)">
                <Separator class="my-6 dark:border-gray-700" />
                <div v-if="getProgressionForPathway(pathway.pathway_id)?.career_advancement && getProgressionForPathway(pathway.pathway_id)!.career_advancement!.length > 0">
                  <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Career Advancement</h3>
                  <div class="space-y-3">
                    <div v-for="(prog, index) in getProgressionForPathway(pathway.pathway_id)!.career_advancement" :key="`adv-${pathway.pathway_id}-${index}`" class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Typical Progression:</p>
                      <ul class="list-disc list-inside pl-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li v-for="(step, sIndex) in prog.typical_progression" :key="sIndex">{{ step }}</li>
                </ul>
              </div>
            </div>
          </div>
                <div v-if="getProgressionForPathway(pathway.pathway_id)?.further_education && getProgressionForPathway(pathway.pathway_id)!.further_education!.length > 0" class="mt-6">
                  <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Further Education</h3>
                  <div class="space-y-3">
                    <div v-for="(edu, index) in getProgressionForPathway(pathway.pathway_id)!.further_education" :key="`edu-${pathway.pathway_id}-${index}`" class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Options:</p>
                      <ul class="list-disc list-inside pl-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li v-for="(option, oIndex) in edu.options" :key="oIndex">{{ option }}</li>
                    </ul>
                </div>
            </div>
                </div>
            </div>
              <p v-else-if="howToBecome.progression_opportunities" class="text-sm text-gray-500 dark:text-gray-400 mt-4">No specific progression opportunities listed for this pathway.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <p v-else class="text-gray-700 dark:text-gray-300 mb-12">
        No academic pathways available for this career.
      </p>
    </div>
    <!-- Error/No Data State -->
    <div v-else class="text-center py-10">
      <p class="text-xl text-gray-700 dark:text-gray-300">Could not load career details or no data available.</p>
        </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CareerHowToBecome, AcademicPathway, ProgressionOpportunityItem } from '@/types/career';
import { currentTheme } from "@/lib/theme-utils";

// Shadcn/Vue UI Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const props = defineProps<{
  howToBecome?: CareerHowToBecome | null;
  isLoading: boolean;
}>();

// Get theme color name
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

const getProgressionForPathway = (pathwayId: string): { career_advancement: ProgressionOpportunityItem[] | undefined, further_education: ProgressionOpportunityItem[] | undefined } | null => {
  if (!props.howToBecome?.progression_opportunities) {
    return null;
  }
  const opportunities = props.howToBecome.progression_opportunities;
  const advancement = opportunities.career_advancement?.filter(ca => ca.from_pathway_id === pathwayId);
  const education = opportunities.further_education?.filter(fe => fe.from_pathway_id === pathwayId);

  if ((!advancement || advancement.length === 0) && (!education || education.length === 0)) {
    return null;
  }
  return { career_advancement: advancement, further_education: education };
};

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return 'N/A';
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MAD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  return formatted.includes('MAD') ? formatted : `${formatted} MAD`;
};

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | null | undefined;

const getBadgeVariantByRank = (rank: number): BadgeVariant => {
  if (rank === 1) return 'default'; 
  if (rank === 2) return 'secondary';
  return 'outline';
};

const getPathwayRankBorderClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return `border-l-4 border-${themeColorName.value}-500 dark:border-${themeColorName.value}-400`;
    case 2:
      return 'border-l-4 border-secondary'; 
    case 3:
      return 'border-l-4 border-blue-500 dark:border-blue-400';
    case 4:
      return 'border-l-4 border-green-500 dark:border-green-400';
    default:
      return 'border-l-4 border-gray-300 dark:border-gray-600';
  }
};

const getStrengthValue = (strength: string | undefined | null): number => {
  if (!strength) return 0;
  switch (strength.toLowerCase()) {
    case "comprehensive": case "strong": return 100;
    case "adequate": case "moderate": return 70;
    case "basic": case "limited": return 40;
    default: return 0;
  }
};

const getStrengthProgressClass = (strength: string | undefined | null): string => {
  if (!strength) return '';
  switch (strength.toLowerCase()) {
    case "comprehensive": case "strong":
      return '[&>[data-indicator]]:bg-green-500 dark:[&>[data-indicator]]:bg-green-400';
    case "adequate": case "moderate":
      return '[&>[data-indicator]]:bg-blue-500 dark:[&>[data-indicator]]:bg-blue-400';
    case "basic": case "limited":
      return '[&>[data-indicator]]:bg-yellow-500 dark:[&>[data-indicator]]:bg-yellow-400';
    default: return ''; 
  }
};

</script>

<style scoped>
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

h1, h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

.AccordionContent[data-state="open"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Additional styling for accordion trigger to ensure content is spaced out */
:deep(.AccordionTrigger > div) {
  width: 100%;
}

</style>
