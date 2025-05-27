<script setup lang="ts">
import { computed } from 'vue';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/vue";
import { currentTheme } from "@/lib/theme-utils";

interface Institution {
  institution_id: string;
  name: string;
  tier: string;
  location: string;
  public_or_private: string;
  language_of_instruction: string[];
  admission_competitiveness: string;
  programs: Program[];
}

interface Program {
  program_id: string;
  program_name: string;
  degree_level: string;
  duration_years: number;
  admission_requirements: {
    previous_education: string;
    minimum_score: string;
    entrance_exam: boolean;
    language_requirements: string[];
  };
  curriculum_strength: string;
  industry_connections: string;
  certification: {
    degree_awarded: string;
    recognition_level: string;
  };
  career_outcomes: string[];
}

interface Pathway {
  pathway_id: string;
  pathway_name: string;
  rank: number;
  ranking_reason: string;
  description: string;
  duration_years: number;
  estimated_total_cost_MAD: number;
  institutions: Institution[];
}

interface ProgressionOpportunities {
  further_education: {
    from_pathway_id: string;
    options: string[];
  }[];
  career_advancement: {
    from_pathway_id: string;
    typical_progression: string[];
  }[];
}

interface Props {
  pathway: Pathway;
  progressionOpportunities: ProgressionOpportunities;
}

const props = defineProps<Props>();

const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

const furtherEducation = computed(() => 
  props.progressionOpportunities.further_education.find(
    item => item.from_pathway_id === props.pathway.pathway_id
  )
);

const careerAdvancement = computed(() =>
  props.progressionOpportunities.career_advancement.find(
    item => item.from_pathway_id === props.pathway.pathway_id
  )
);

// Helper functions
function getPathwayRankBadgeVariant(rank: number): string {
  switch (rank) {
    case 1: return "default"; // Typically styled with the primary color
    case 2: return "default"; // Could be 'secondary' if differentiation is needed
    case 3: return "secondary";
    default: return "outline";
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MAD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value).replace('MAD', '').trim() + ' MAD';
}
</script>

<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex flex-col md:flex-row justify-between gap-6">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <Badge :variant="getPathwayRankBadgeVariant(props.pathway.rank) as any">
              Rank #{{ props.pathway.rank }}
            </Badge>
            <h3 class="text-xl font-semibold text-card-foreground">{{ props.pathway.pathway_name }}</h3>
          </div>
          
          <p class="text-muted-foreground mb-4">{{ props.pathway.description }}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="bg-muted rounded-full p-2">
                <Icon icon="lucide:clock" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400 text-xl`" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Duration</p>
                <p class="font-medium text-card-foreground">{{ props.pathway.duration_years }} years</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="bg-muted rounded-full p-2">
                <Icon icon="lucide:banknote" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400 text-xl`" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Estimated Cost</p>
                <p class="font-medium text-card-foreground">{{ formatCurrency(props.pathway.estimated_total_cost_MAD) }}</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-md font-medium mb-3 flex items-center gap-2 text-card-foreground">
              <Icon icon="lucide:trending-up" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400`" />
              Career Advancement Path
            </h4>
            
            <div v-if="careerAdvancement && careerAdvancement.typical_progression.length > 0" :class="`relative pl-6 before:content-[''] before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-0.5 before:bg-${themeColorName}-500/30 dark:before:bg-${themeColorName}-400/20`">
              <div v-for="(step, index) in careerAdvancement.typical_progression" :key="index" class="mb-3 relative">
                <div :class="`absolute left-[-1px] top-[3px] w-5 h-5 rounded-full bg-${themeColorName}-500 dark:bg-${themeColorName}-400 flex items-center justify-center ring-4 ring-background`">
                  <span class="text-white dark:text-gray-900 text-xs font-medium">{{ index + 1 }}</span>
                </div>
                <Card class="ml-2 border-border/70 shadow-sm">
                  <CardContent class="py-2 px-4">
                    <p class="text-sm text-foreground">{{ step }}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
             <div v-else>
              <p class="text-sm text-muted-foreground pl-1">Information on career advancement paths is not yet available for this pathway.</p>
            </div>
          </div>
        </div>
        
        <Separator orientation="vertical" class="hidden md:block self-stretch" />
        
        <div class="flex-1">
          <h4 class="text-md font-medium mb-3 flex items-center gap-2 text-card-foreground">
            <Icon icon="lucide:graduation-cap" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400`" />
            Further Education Opportunities
          </h4>
          
          <div v-if="furtherEducation && furtherEducation.options.length > 0" class="space-y-2 mb-6">
            <Card v-for="(option, index) in furtherEducation.options" :key="index" class="border-border/70 shadow-sm">
              <CardContent class="py-2 px-4">
                <div class="flex items-start gap-2">
                  <Icon icon="lucide:arrow-right-circle" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400 mt-1 flex-shrink-0`" />
                  <p class="text-sm text-foreground">{{ option }}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div v-else>
            <p class="text-sm text-muted-foreground pl-1">Further education opportunities are not specified for this pathway.</p>
          </div>
          
          <h4 class="text-md font-medium mb-3 flex items-center gap-2 text-card-foreground">
            <Icon icon="lucide:building-2" :class="`text-${themeColorName}-500 dark:text-${themeColorName}-400`" />
            Key Institutions
          </h4>
          
          <div v-if="props.pathway.institutions && props.pathway.institutions.length > 0" class="space-y-3">
            <Card v-for="institution in props.pathway.institutions" :key="institution.institution_id" class="border-border/70 shadow-sm">
              <CardContent class="p-4">
                <div class="flex justify-between items-start gap-2 mb-2">
                  <h5 class="font-medium text-foreground">{{ institution.name }}</h5>
                  <Badge variant="secondary" class="text-xs whitespace-nowrap">
                    {{ institution.tier }} Tier
                  </Badge>
                </div>
                
                <div class="text-sm space-y-1.5 text-muted-foreground">
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" class="w-4 h-4" />
                    <span>{{ institution.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:landmark" class="w-4 h-4" />
                    <span>{{ institution.public_or_private }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:languages" class="w-4 h-4" />
                    <span>{{ institution.language_of_instruction.join(", ") }}</span>
                  </div>
                </div>
                
                <div v-if="institution.programs && institution.programs.length > 0" class="mt-3">
                  <p class="text-xs text-muted-foreground mb-1">Featured Programs:</p>
                  <div class="flex flex-wrap gap-1.5">
                    <Badge v-for="program in institution.programs" :key="program.program_id" variant="outline" class="text-xs font-normal">
                      {{ program.degree_level }}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
           <div v-else>
            <p class="text-sm text-muted-foreground pl-1">No specific institutions are listed for this pathway yet.</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>