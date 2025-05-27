<script setup lang="ts">
import { type Component } from 'vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Clock, Banknote, Briefcase, Award, Info, ThumbsUp, ThumbsDown, Minus, Eye, EyeOff } from 'lucide-vue-next';

interface Pathway {
  pathway_id: string;
  pathway_name: string;
  rank: number;
  duration_years: number;
  estimated_total_cost_MAD: number;
}

interface ComparisonFactor {
  factor: string;
  P1_value: string;
  P2_value: string;
  P3_value: string;
  P4_value: string;
}

interface Props {
  pathways: Pathway[];
  comparisonFactors: ComparisonFactor[];
  selectedPathway: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'viewPathway', pathwayId: string): void;
}>();

function getFactorIcon(factor: string): Component {
  const lowerFactor = factor.toLowerCase();
  if (lowerFactor === "time to qualification") return Clock;
  if (lowerFactor === "cost") return Banknote;
  if (lowerFactor === "employment rate") return Briefcase;
  if (lowerFactor === "industry recognition") return Award;
  return Info;
}

function getPathwayValue(factorData: ComparisonFactor, pathway: Pathway): string {
  const pathwayKey = `P${pathway.rank}_value` as keyof ComparisonFactor;
  return factorData[pathwayKey];
}

function getEmploymentRateStyling(value: string): { dotClass: string; percentage: number } {
  const percentage = parseInt(value);
  let dotBaseClass = "w-3 h-3 rounded-full ring-2";

  if (percentage >= 70) dotBaseClass += ` bg-green-500 ring-green-500/20`;
  else if (percentage >= 50) dotBaseClass += ` bg-sky-500 ring-sky-500/20`; // Using sky for a "primary" feel
  else if (percentage >= 30) dotBaseClass += ` bg-yellow-500 ring-yellow-500/20`;
  else dotBaseClass += ` bg-red-500 ring-red-500/20`;
  
  return { dotClass: dotBaseClass, percentage };
}

function getIndustryRecognitionStyling(value: string): { iconComponent: Component; containerClass: string; iconClass: string } {
  if (value === "High") return { 
    iconComponent: ThumbsUp, 
    containerClass: "bg-green-100 dark:bg-green-700/30 p-1 rounded-full", 
    iconClass: "text-green-600 dark:text-green-400" 
  };
  if (value === "Medium") return { 
    iconComponent: ThumbsUp, 
    containerClass: "bg-sky-100 dark:bg-sky-700/30 p-1 rounded-full", 
    iconClass: "text-sky-600 dark:text-sky-400" 
  };
  if (value === "Low") return { 
    iconComponent: ThumbsDown, 
    containerClass: "bg-yellow-100 dark:bg-yellow-700/30 p-1 rounded-full", 
    iconClass: "text-yellow-600 dark:text-yellow-400" 
  };
  return { 
    iconComponent: Minus, 
    containerClass: "bg-gray-100 dark:bg-gray-600/30 p-1 rounded-full", 
    iconClass: "text-gray-500 dark:text-gray-400" 
  };
}

function getBestValueClass(factorName: string, currentValue: string, allPathways: Pathway[], currentFactorData: ComparisonFactor): string {
  const lowerFactorName = factorName.toLowerCase();
  const successClass = "font-semibold text-green-600 dark:text-green-400";

  if (currentValue === null || currentValue === undefined || currentValue.trim() === "") return "";


  if (lowerFactorName === "cost") {
    const costs = allPathways.map(p => {
      const key = `P${p.rank}_value` as keyof ComparisonFactor;
      const costValue = currentFactorData[key];
      return costValue ? parseInt(costValue.replace(/[^\d]/g, '')) : Infinity;
    }).filter(c => c !== Infinity); // Filter out pathways with no cost data for min calculation

    if (costs.length === 0) return ""; // No valid costs to compare

    const minCost = Math.min(...costs);
    const currentCost = parseInt(currentValue.replace(/[^\d]/g, ''));
    if (currentCost === minCost) {
      return successClass;
    }
  }

  if (lowerFactorName === "employment rate") {
    const rates = allPathways.map(p => {
      const key = `P${p.rank}_value` as keyof ComparisonFactor;
      const rateValue = currentFactorData[key];
      return rateValue ? parseInt(rateValue) : -Infinity;
    }).filter(r => r !== -Infinity); // Filter out pathways with no rate data

    if (rates.length === 0) return ""; // No valid rates

    const maxRate = Math.max(...rates);
    const currentRate = parseInt(currentValue);
    if (currentRate === maxRate) {
      return successClass;
    }
  }

  if (lowerFactorName === "industry recognition") {
    if (currentValue === "High") {
        // If current is "High", it's considered best among typical values (High, Medium, Low)
        return successClass;
    }
    // Optional: more complex logic if "Medium" could be best if no "High" exists, etc.
    // For now, only "High" gets highlighted.
  }
  
  return "";
}

</script>

<template>
  <Card class="shadow-sm">
    <CardContent class="p-0 overflow-x-auto">
      <Table aria-label="Pathway Comparison Table">
        <TableHeader>
          <TableRow>
            <TableHead class="bg-muted text-muted-foreground pl-6 py-4 min-w-[200px]">Comparison Factor</TableHead>
            <TableHead
              v-for="pathway in props.pathways"
              :key="pathway.pathway_id"
              :class="[
                'py-4 min-w-[150px]',
                props.selectedPathway === pathway.pathway_id 
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary' 
                  : 'bg-muted text-muted-foreground'
              ]"
            >
              <div class="flex flex-col">
                <span class="font-semibold">{{ pathway.pathway_name }}</span>
                <span class="text-xs mt-1">{{ props.selectedPathway === pathway.pathway_id ? 'Selected' : `Rank #${pathway.rank}` }}</span>
              </div>
            </TableHead>
            <TableHead class="bg-muted text-muted-foreground py-4 w-[110px] min-w-[110px]"></TableHead> <!-- Adjusted width for buttons -->
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(factor, index) in props.comparisonFactors"
            :key="index"
            :class="['border-b', index % 2 === 0 ? '' : 'bg-muted/50']"
          >
            <TableCell class="font-medium pl-6 py-4 align-top">
              <div class="flex items-center gap-3">
                <div class="bg-muted/80 p-2 rounded-full">
                  <component :is="getFactorIcon(factor.factor)" class="text-muted-foreground h-5 w-5" />
                </div>
                {{ factor.factor }}
              </div>
            </TableCell>
            
            <TableCell
              v-for="pathway in props.pathways"
              :key="pathway.pathway_id"
              :class="[
                'py-4 align-top',
                { 'bg-primary/5 dark:bg-primary/10': props.selectedPathway === pathway.pathway_id },
                getBestValueClass(factor.factor, getPathwayValue(factor, pathway), props.pathways, factor)
              ]"
            >
              <div v-if="getPathwayValue(factor, pathway) !== null && getPathwayValue(factor, pathway) !== undefined && getPathwayValue(factor, pathway).trim() !== ''" class="flex items-center gap-2">
                <template v-if="factor.factor.toLowerCase() === 'employment rate'">
                  <TooltipProvider :delay-duration="200">
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <div class="flex items-center gap-3 cursor-default">
                          <div :class="getEmploymentRateStyling(getPathwayValue(factor, pathway)).dotClass"></div>
                          <span class="font-medium">{{ getPathwayValue(factor, pathway) }}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{{ getEmploymentRateStyling(getPathwayValue(factor, pathway)).percentage }}% employment rate after graduation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </template>
                <template v-else-if="factor.factor.toLowerCase() === 'industry recognition'">
                  <div class="flex items-center gap-3">
                    <div :class="getIndustryRecognitionStyling(getPathwayValue(factor, pathway)).containerClass">
                      <component 
                        :is="getIndustryRecognitionStyling(getPathwayValue(factor, pathway)).iconComponent" 
                        :class="[getIndustryRecognitionStyling(getPathwayValue(factor, pathway)).iconClass, 'h-4 w-4']" 
                      />
                    </div>
                    <span class="font-medium">{{ getPathwayValue(factor, pathway) }}</span>
                  </div>
                </template>
                <template v-else>
                  <span class="font-medium">{{ getPathwayValue(factor, pathway) }}</span>
                </template>
              </div>
               <div v-else class="text-muted-foreground/70 italic text-sm">N/A</div>
            </TableCell>

            <TableCell class="py-4 align-top">
              <div v-if="index === 0" class="flex flex-col gap-2">
                <Button
                  v-for="pathway in props.pathways"
                  :key="pathway.pathway_id"
                  size="sm"
                  :variant="props.selectedPathway === pathway.pathway_id ? 'default' : 'outline'"
                  @click="emit('viewPathway', pathway.pathway_id)"
                  class="min-w-[90px] w-full justify-start"
                >
                  <EyeOff v-if="props.selectedPathway === pathway.pathway_id" class="mr-2 h-4 w-4 flex-shrink-0" />
                  <Eye v-else class="mr-2 h-4 w-4 flex-shrink-0" />
                  {{ props.selectedPathway === pathway.pathway_id ? "Hide" : "View" }}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>