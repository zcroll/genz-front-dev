<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Page Header -->
    <h1 class="text-3xl font-bold mb-1 text-gray-900 dark:text-white">How to Become a {{ careerData.career }}</h1>
    <p class="mb-6 text-md text-gray-600 dark:text-gray-400">In {{ careerData.country }}</p>
    
    <!-- Tabbed Interface to Separate Content -->
    <Tabs default-value="overview" class="w-full">
      <TabsList class="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="academic-pathways">
          Academic Pathways
        </TabsTrigger>
        <TabsTrigger value="comparison">
          Comparison
        </TabsTrigger>
        <TabsTrigger value="career-progression">
          Career Progression
        </TabsTrigger>
      </TabsList>

      <!-- Overview Tab Content -->
      <TabsContent value="overview" class="bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Career Overview</h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The typical education level required to become a {{ careerData.career.toLowerCase() }} is a <strong>{{ careerData.education_level }}</strong>.
          This guide outlines various academic pathways available in {{ careerData.country }}.
        </p>
        
        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Pathway Ranking Criteria</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-3">Pathways are ranked based on the following criteria:</p>
          <ul class="list-disc list-inside pl-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li v-for="(criterion, index) in careerData.pathway_ranking_criteria" :key="index">
              {{ criterion }}
            </li>
          </ul>
        </div>
      </TabsContent>

      <!-- Academic Pathways Tab Content -->
      <TabsContent value="academic-pathways" class="space-y-6">
        <div
          v-for="pathway in careerData.academic_pathways"
          :key="pathway.pathway_id"
          class="bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ pathway.pathway_name }}</h2>
            <span :class="`mt-2 sm:mt-0 text-sm font-medium rounded-full px-3 py-1 bg-${getPathwayColor(pathway.rank)}-100 text-${getPathwayColor(pathway.rank)}-800 dark:bg-${getPathwayColor(pathway.rank)}-900 dark:text-${getPathwayColor(pathway.rank)}-200`">
              Rank {{ pathway.rank }}
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Why this rank:</strong> {{ pathway.ranking_reason }}</p>
          <p class="text-gray-700 dark:text-gray-300 mb-3">{{ pathway.description }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <strong>Duration:</strong> <span class="ml-1">{{ pathway.duration_years }} years</span>
            </div>
            <div class="flex items-center text-gray-700 dark:text-gray-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <strong>Est. Cost:</strong> <span class="ml-1">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MAD' }).format(pathway.estimated_total_cost_MAD) }}</span>
            </div>
          </div>

          <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Recommended Institutions:</h4>
          <div v-if="pathway.institutions && pathway.institutions.length > 0" class="space-y-4">
            <div v-for="institution in pathway.institutions" :key="institution.institution_id" class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 class="font-semibold text-gray-800 dark:text-gray-200">{{ institution.name }} <span class="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 ml-2">{{ institution.tier }} Tier</span></h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ institution.location }} • {{ institution.public_or_private }}</p>
              
              <div v-if="institution.programs && institution.programs.length > 0" class="mt-3">
                <h6 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Programs:</h6>
                <ul class="list-disc list-inside pl-2 space-y-2 text-sm">
                  <li v-for="program in institution.programs" :key="program.program_id" class="text-gray-600 dark:text-gray-400">
                    <strong>{{ program.program_name }}</strong> ({{ program.degree_level }})
                    <ul class="list-circle list-inside pl-4 mt-1 text-xs space-y-0.5">
                      <li>Admission: {{ program.admission_requirements.previous_education }}. Entrance Exam: {{ program.admission_requirements.entrance_exam ? 'Yes' : 'No' }}</li>
                      <li>Curriculum: {{ program.curriculum_strength }}</li>
                      <li>Connections: {{ program.industry_connections }}</li>
                      <li>Awarded: {{ program.certification.degree_awarded }}</li>
                      <li v-if="program.career_outcomes && program.career_outcomes.length > 0">Outcomes: {{ program.career_outcomes.join(', ') }}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
           <p v-else class="text-sm text-gray-500 dark:text-gray-400">No specific institutions listed for this pathway.</p>
        </div>
      </TabsContent>

      <!-- Comparison Tab Content -->
      <TabsContent value="comparison" class="bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Pathway Comparison</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-transparent">
            <thead class="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th class="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-gray-700/50">Factor</th>
                <th v-for="pathway in careerData.academic_pathways" :key="pathway.pathway_id" class="p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ pathway.pathway_name }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(factorInfo, factorKey) in comparisonFactors"
                :key="factorKey"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/20"
              >
                <td class="p-3 text-sm text-gray-800 dark:text-gray-200 font-medium sticky left-0 bg-white dark:bg-gray-800/30 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/20">{{ factorInfo.label }}</td>
                <td v-for="pathway in careerData.academic_pathways" :key="pathway.pathway_id" class="p-3 text-sm text-gray-700 dark:text-gray-300">
                  {{ factorInfo.values[pathway.pathway_id] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabsContent>

      <!-- Career Progression Tab Content -->
      <TabsContent value="career-progression" class="bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        <div>
            <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Career Advancement</h2>
            <div class="space-y-4">
                <div
                    v-for="(prog, index) in careerData.progression_opportunities.career_advancement"
                    :key="`adv-${index}`"
                    class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    From {{ careerData.academic_pathways.find(p => p.pathway_id === prog.from_pathway_id)?.pathway_name || prog.from_pathway_id }}
                    </h3>
                    <ul class="list-disc list-inside pl-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li v-for="(step, sIndex) in prog.typical_progression" :key="sIndex">
                        {{ step }}
                    </li>
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <h2 class="text-2xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white">Further Education Opportunities</h2>
            <div class="space-y-4">
                <div
                    v-for="(edu, index) in careerData.progression_opportunities.further_education"
                    :key="`edu-${index}`"
                    class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    From {{ careerData.academic_pathways.find(p => p.pathway_id === edu.from_pathway_id)?.pathway_name || edu.from_pathway_id }}
                    </h3>
                    <ul class="list-disc list-inside pl-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li v-for="(option, oIndex) in edu.options" :key="oIndex">
                        {{ option }}
                    </li>
                    </ul>
                </div>
            </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define props for backward compatibility if needed
defineProps<{
  howToBecome?: any; // This can be typed more strictly if its structure is known
  isLoading: boolean;
}>();

const getPathwayColor = (rank: number) => {
  const colors = ['blue', 'green', 'purple', 'yellow']; // Example colors
  return colors[rank -1] || 'gray';
}

// Hardcoded data for Audio Engineer career path
const careerData = ref({
  "career": "Audio Engineer",
  "country": "Morocco",
  "pathway_ranking_criteria": [
    "Employment prospects",
    "Recognition of credentials",
    "Program comprehensiveness",
    "Cost-effectiveness"
  ],
  "academic_pathways": [
    {
      "pathway_id": "P1",
      "pathway_name": "Premier University Track",
      "rank": 1,
      "ranking_reason": "This pathway offers the most comprehensive theoretical and practical training in audio engineering, leading to better employment prospects within the Moroccan media and entertainment industry and abroad. University degrees are also highly recognized.",
      "description": "This pathway involves obtaining a Licence degree in a related field such as electronics, telecommunications, or computer science from a reputable Moroccan university, followed by a Master's degree specializing in audio engineering or acoustics.",
      "duration_years": 5,
      "estimated_total_cost_MAD": 50000,
      "institutions": [
        {
          "institution_id": "I1",
          "name": "École Nationale Supérieure d'Électricité et de Mécanique (ENSEM)",
          "tier": "Top",
          "location": "Casablanca, Morocco",
          "public_or_private": "Public",
          "language_of_instruction": [
            "French"
          ],
          "admission_competitiveness": "High",
          "programs": [
            {
              "program_id": "PR1",
              "program_name": "Génie Électrique (Electrical Engineering) followed by a specialized Master's degree",
              "degree_level": "Licence/Master",
              "duration_years": 5,
              "admission_requirements": {
                "previous_education": "Baccalauréat Sciences Mathématiques or Sciences Expérimentales",
                "minimum_score": "Good standing in national Baccalauréat exam, successful completion of CPGE (Classes Préparatoires aux Grandes Écoles) competition for ENSEM",
                "entrance_exam": true,
                "language_requirements": [
                  "French"
                ]
              },
              "curriculum_strength": "Comprehensive",
              "industry_connections": "Strong",
              "certification": {
                "degree_awarded": "Diplôme d'Ingénieur d'État (Equivalent to Master's)",
                "recognition_level": "National/International"
              },
              "career_outcomes": [
                "Sound Designer",
                "Audio Systems Engineer",
                "Recording Engineer",
                "Acoustic Consultant"
              ]
            }
          ]
        },
        {
          "institution_id": "I2",
          "name": "Université Mohammed V de Rabat - Faculté des Sciences",
          "tier": "Top",
          "location": "Rabat, Morocco",
          "public_or_private": "Public",
          "language_of_instruction": [
            "Arabic",
            "French"
          ],
          "admission_competitiveness": "Medium",
          "programs": [
            {
              "program_id": "PR2",
              "program_name": "Licence Sciences et Techniques (related to Electronics, Telecommunications) followed by a Master in Acoustics or Signal Processing",
              "degree_level": "Licence/Master",
              "duration_years": 5,
              "admission_requirements": {
                "previous_education": "Baccalauréat Sciences Mathématiques or Sciences Expérimentales",
                "minimum_score": "Adequate standing in national Baccalauréat exam",
                "entrance_exam": false,
                "language_requirements": [
                  "Arabic",
                  "French"
                ]
              },
              "curriculum_strength": "Comprehensive",
              "industry_connections": "Moderate",
              "certification": {
                "degree_awarded": "Master Sciences et Techniques",
                "recognition_level": "National"
              },
              "career_outcomes": [
                "Audio Engineer",
                "Sound Technician",
                "Acoustic Consultant"
              ]
            }
          ]
        }
      ]
    },
    {
      "pathway_id": "P2",
      "pathway_name": "Alternative University Track",
      "rank": 2,
      "ranking_reason": "This pathway is ranked second due to potentially less focused training compared to ENSEM, but still offers a solid foundation and may be more accessible to students with varying Baccalauréat backgrounds.",
      "description": "This pathway involves obtaining a Licence in a related scientific field from a University and pursuing a specialized professional diploma in Audio Engineering from a private institute or overseas. This blends theoretical knowledge with practical skills.",
      "similar_structure_to_P1": false,
      "duration_years": 4,
      "estimated_total_cost_MAD": 60000,
      "institutions": [
        {
          "institution_id": "I3",
          "name": "Université Hassan II de Casablanca - Faculté des Sciences Aïn Chock",
          "tier": "Mid",
          "location": "Casablanca, Morocco",
          "public_or_private": "Public",
          "language_of_instruction": [
            "Arabic",
            "French"
          ],
          "admission_competitiveness": "Medium",
          "programs": [
            {
              "program_id": "PR3",
              "program_name": "Licence Sciences et Technologies (focused on Electronics or Telecommunications)",
              "degree_level": "Licence",
              "duration_years": 3,
              "admission_requirements": {
                "previous_education": "Baccalauréat Sciences Mathématiques or Sciences Expérimentales",
                "minimum_score": "Adequate standing in national Baccalauréat exam",
                "entrance_exam": false,
                "language_requirements": [
                  "Arabic",
                  "French"
                ]
              },
              "curriculum_strength": "Adequate",
              "industry_connections": "Limited",
              "certification": {
                "degree_awarded": "Licence Sciences et Technologies",
                "recognition_level": "National"
              },
              "career_outcomes": [
                "Sound Technician (with additional training)",
                "Assistant Audio Engineer"
              ]
            }
          ]
        },
        {
          "institution_id": "I4",
          "name": "Various Private Audio Engineering Institutes",
          "tier": "N/A",
          "location": "Various cities, Morocco",
          "public_or_private": "Private",
          "language_of_instruction": [
            "French"
          ],
          "admission_competitiveness": "Low",
          "programs": [
            {
              "program_id": "PR4",
              "program_name": "Diplôme en Ingénierie du Son (Diploma in Sound Engineering)",
              "degree_level": "Professional Diploma",
              "duration_years": 1,
              "admission_requirements": {
                "previous_education": "Baccalauréat or Licence",
                "minimum_score": "N/A",
                "entrance_exam": false,
                "language_requirements": [
                  "French"
                ]
              },
              "curriculum_strength": "Adequate",
              "industry_connections": "Moderate",
              "certification": {
                "degree_awarded": "Diplôme en Ingénierie du Son",
                "recognition_level": "Regional (within Morocco)"
              },
              "career_outcomes": [
                "Sound Technician",
                "Audio Editor",
                "Music Production Assistant"
              ]
            }
          ]
        }
      ]
    },
    {
      "pathway_id": "P3",
      "pathway_name": "Vocational Excellence Track",
      "rank": 3,
      "ranking_reason": "This vocational path is ranked third due to its practical focus, but it may lack the theoretical depth required for advanced roles and research.  Recognition is more limited than university degrees.",
      "description": "Enrolling in specialized vocational training programs focused on audio technology and sound engineering at vocational schools or private training centers.  This pathway is shorter and focuses on practical skills.",
      "similar_structure_to_P1": false,
      "duration_years": 2,
      "estimated_total_cost_MAD": 30000,
      "institutions": [
        {
          "institution_id": "I5",
          "name": "Institut Spécialisé de Technologie Appliquée (ISTA) - (Specific Audio Related Programs, if available)",
          "tier": "Regional",
          "location": "Various cities, Morocco",
          "public_or_private": "Public",
          "language_of_instruction": [
            "Arabic",
            "French"
          ],
          "admission_competitiveness": "Low",
          "programs": [
            {
              "program_id": "PR5",
              "program_name": "Technicien Spécialisé en Audiovisuel (Specialized Technician in Audiovisual)",
              "degree_level": "Technicien Spécialisé",
              "duration_years": 2,
              "admission_requirements": {
                "previous_education": "Baccalauréat",
                "minimum_score": "N/A",
                "entrance_exam": false,
                "language_requirements": [
                  "Arabic",
                  "French"
                ]
              },
              "curriculum_strength": "Basic",
              "industry_connections": "Limited",
              "certification": {
                "degree_awarded": "Diplôme de Technicien Spécialisé",
                "recognition_level": "National"
              },
              "career_outcomes": [
                "Sound Assistant",
                "Studio Assistant",
                "Live Sound Technician (entry-level)"
              ]
            }
          ]
        }
      ]
    },
    {
      "pathway_id": "P4",
      "pathway_name": "Emerging Alternative Path",
      "rank": 4,
      "ranking_reason": "This pathway is included because online learning is becoming more accessible and accepted, although its recognition within the Moroccan employment context is still developing. Accreditation of online programs is crucial.",
      "description": "Combining a basic academic qualification (like a Licence in arts or humanities) with online courses and certifications from reputable international platforms focused on audio engineering. This requires self-discipline and careful selection of courses.",
      "similar_structure_to_P1": false,
      "duration_years": 3,
      "estimated_total_cost_MAD": 20000,
      "institutions": [
        {
          "institution_id": "I6",
          "name": "Various Universities (for the Licence)",
          "tier": "Regional",
          "location": "Various cities, Morocco",
          "public_or_private": "Public",
          "language_of_instruction": [
            "Arabic",
            "French"
          ],
          "admission_competitiveness": "Low",
          "programs": [
            {
              "program_id": "PR6",
              "program_name": "Licence in Arts, Humanities, or Social Sciences",
              "degree_level": "Licence",
              "duration_years": 3,
              "admission_requirements": {
                "previous_education": "Baccalauréat",
                "minimum_score": "N/A",
                "entrance_exam": false,
                "language_requirements": [
                  "Arabic",
                  "French"
                ]
              },
              "curriculum_strength": "Basic",
              "industry_connections": "Limited",
              "certification": {
                "degree_awarded": "Licence in relevant field",
                "recognition_level": "National"
              },
              "career_outcomes": [
                "Foundation for further online training"
              ]
            }
          ]
        },
        {
          "institution_id": "I7",
          "name": "Coursera/Udemy/edX",
          "tier": "N/A",
          "location": "Online",
          "public_or_private": "Private",
          "language_of_instruction": [
            "English",
            "French"
          ],
          "admission_competitiveness": "Low",
          "programs": [
            {
              "program_id": "PR7",
              "program_name": "Various Audio Engineering Specializations",
              "degree_level": "Certificate",
              "duration_years": 0,
              "admission_requirements": {
                "previous_education": "None",
                "minimum_score": "N/A",
                "entrance_exam": false,
                "language_requirements": [
                  "English",
                  "French"
                ]
              },
              "curriculum_strength": "Adequate",
              "industry_connections": "Limited",
              "certification": {
                "degree_awarded": "Various Certificates",
                "recognition_level": "International (Varies Significantly)"
              },
              "career_outcomes": [
                "Entry-level roles in less competitive markets"
              ]
            }
          ]
        }
      ]
    }
  ],
  "pathway_comparisons": [
    {
      "comparison_factors": [
        {
          "factor": "Time to qualification",
          "P1_value": "5 years",
          "P2_value": "4 years",
          "P3_value": "2 years",
          "P4_value": "3+ years"
        },
        {
          "factor": "Cost",
          "P1_value": "50,000 MAD",
          "P2_value": "60,000 MAD",
          "P3_value": "30,000 MAD",
          "P4_value": "20,000 MAD"
        },
        {
          "factor": "Employment rate",
          "P1_value": "75%",
          "P2_value": "60%",
          "P3_value": "40%",
          "P4_value": "30%"
        },
        {
          "factor": "Industry recognition",
          "P1_value": "High",
          "P2_value": "Medium",
          "P3_value": "Low",
          "P4_value": "Low"
        }
      ]
    }
  ],
  "progression_opportunities": {
    "further_education": [
      {
        "from_pathway_id": "P1",
        "options": [
          "Moroccan doctoral studies in related fields (Signal Processing, Acoustics)",
          "Specialized certifications (e.g., Pro Tools Certification)",
          "International Master's degrees"
        ]
      },
      {
        "from_pathway_id": "P2",
        "options": [
          "Specialized certifications (e.g., Pro Tools Certification)",
          "International Master's degrees (requires demonstrating sufficient academic background)",
          "Advanced vocational training"
        ]
      },
      {
        "from_pathway_id": "P3",
        "options": [
          "Specialized vocational training in specific areas (e.g., live sound)",
          "Associate degree programs (if available)",
          "Bridging programs to enter university (challenging)"
        ]
      },
      {
        "from_pathway_id": "P4",
        "options": [
          "Advanced online certifications",
          "Professional development workshops",
          "Potentially, pursuing a university degree to strengthen credentials"
        ]
      }
    ],
    "career_advancement": [
      {
        "from_pathway_id": "P1",
        "typical_progression": [
          "Junior Audio Engineer",
          "Audio Engineer",
          "Senior Audio Engineer/Sound Designer/Project Manager",
          "Studio Manager/Technical Director"
        ]
      },
      {
        "from_pathway_id": "P2",
        "typical_progression": [
          "Assistant Sound Technician",
          "Sound Technician",
          "Audio Editor/Mixing Engineer",
          "Freelance Audio Engineer"
        ]
      },
      {
        "from_pathway_id": "P3",
        "typical_progression": [
          "Sound Assistant",
          "Stagehand/Sound Technician",
          "Entry-level positions in broadcast or live events"
        ]
      },
      {
        "from_pathway_id": "P4",
        "typical_progression": [
          "Freelance Audio Editor (entry-level)",
          "Remote Sound Technician (entry-level)",
          "Content Creator (audio focused)"
        ]
      }
    ]
  },
  "career_id": 2,
  "industries": [
    {
      "industry_id": 3,
      "industry_name": "Arts"
    }
  ],
  "education_level": "Associate"
});

// Computed property to transform comparison data for the table
const comparisonFactors = computed(() => {
  if (!careerData.value.pathway_comparisons || careerData.value.pathway_comparisons.length === 0) {
    return {};
  }
  const factorsData = careerData.value.pathway_comparisons[0].comparison_factors;
  const transformed: Record<string, { label: string; values: Record<string, string> }> = {};

  factorsData.forEach(factorObj => {
    transformed[factorObj.factor] = {
      label: factorObj.factor,
      values: {
        P1: factorObj.P1_value,
        P2: factorObj.P2_value,
        P3: factorObj.P3_value,
        P4: factorObj.P4_value,
      }
    };
  });
  return transformed;
});
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

div[id^="how-to-become"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Style for sticky header in comparison table */
th.sticky, td.sticky {
  position: sticky;
  left: 0;
  z-index: 1;
}
tr:hover td.sticky {
   /* Ensures sticky column background matches row hover */
  /* @apply bg-gray-50 dark:bg-gray-700/20; Apply hover styles */
}
</style>
