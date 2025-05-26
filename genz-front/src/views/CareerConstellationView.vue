<template>
  <div class="constellation-container" :class="{ 'dark-cosmos': isDarkMode }">
    <!-- Cosmic background with parallax stars -->
    <div class="cosmic-background">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
    </div>

    <!-- Header section with cosmic theme -->
    <div class="cosmic-header">
      <h1 class="cosmic-title">{{ careerData.career }} Journey</h1>
      <p class="cosmic-subtitle">Explore the celestial paths to becoming an {{ careerData.career }} in {{ careerData.country }}</p>
      
      <div class="cosmic-controls">
        <button @click="toggleDarkMode" class="cosmic-button">
          <span v-if="isDarkMode">Cosmic Day</span>
          <span v-else>Cosmic Night</span>
        </button>
        <button @click="toggleView" class="cosmic-button">
          <span v-if="viewMode === 'constellation'">Orbital View</span>
          <span v-else>Constellation View</span>
        </button>
      </div>
    </div>

    <!-- Main content area -->
    <div class="cosmic-content">
      <!-- Pathway selection navigation -->
      <div class="pathway-navigation">
        <div 
          v-for="pathway in careerData.academic_pathways" 
          :key="pathway.pathway_id"
          class="pathway-star"
          :class="{ 'active': selectedPathway === pathway.pathway_id }"
          @click="selectPathway(pathway.pathway_id)"
        >
          <div class="star-core" :style="{ backgroundColor: getPathwayColor(pathway.pathway_id) }"></div>
          <div class="star-name">{{ pathway.pathway_name }}</div>
          <div class="star-rank">Rank {{ pathway.rank }}</div>
        </div>
      </div>

      <!-- Constellation or Orbital view based on selected mode -->
      <transition name="fade-slide">
        <div v-if="viewMode === 'constellation'" class="constellation-view">
          <CareerConstellation 
            :pathway-id="selectedPathway"
            :career-data="careerData"
            @stage-selected="selectStage"
          />
        </div>
        <div v-else class="orbital-view">
          <CareerOrbital 
            :pathway-id="selectedPathway"
            :career-data="careerData"
            @stage-selected="selectStage"
          />
        </div>
      </transition>

      <!-- Career stage detail panel -->
      <transition name="fade-up">
        <div v-if="selectedStage" class="stage-detail-panel">
          <div class="panel-header">
            <h3>{{ selectedStage.title }}</h3>
            <button @click="closeStageDetail" class="close-button">×</button>
          </div>
          <div class="panel-content">
            <p>{{ selectedStage.description }}</p>
            <div class="skill-particles">
              <div 
                v-for="(skill, index) in selectedStage.skills" 
                :key="index"
                class="skill-particle"
                :style="{ 
                  '--particle-delay': `${index * 0.1}s`,
                  '--particle-color': getSkillColor(skill.level)
                }"
              >
                {{ skill.name }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Cosmic footer with pathway comparison -->
    <div class="cosmic-footer">
      <h2 class="section-title">Celestial Path Comparison</h2>
      <PathwayComparisonChart :career-data="careerData" />
      
      <div class="cosmic-legend">
        <div class="legend-item" v-for="(color, type) in pathwayColors" :key="type">
          <span class="color-dot" :style="{ backgroundColor: color }"></span>
          <span>{{ getPathwayName(type) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CareerConstellation from '@/components/Careers/Progression/CareerConstellation.vue';
import CareerOrbital from '@/components/Careers/Progression/CareerOrbital.vue';
import PathwayComparisonChart from '@/components/Careers/Progression/PathwayComparisonChart.vue';

// State management
const isDarkMode = ref(document.documentElement.classList.contains('dark'));
const viewMode = ref('constellation'); // 'constellation' or 'orbital'
const selectedPathway = ref('P1');
const selectedStage = ref(null);

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark');
};

// Toggle view mode
const toggleView = () => {
  viewMode.value = viewMode.value === 'constellation' ? 'orbital' : 'constellation';
};

// Select a pathway
const selectPathway = (pathwayId) => {
  selectedPathway.value = pathwayId;
  selectedStage.value = null; // Reset selected stage when changing pathway
};

// Select a career stage
const selectStage = (stage) => {
  selectedStage.value = stage;
};

// Close stage detail panel
const closeStageDetail = () => {
  selectedStage.value = null;
};

// Pathway colors
const pathwayColors = {
  'P1': 'var(--color-indigo-500)',
  'P2': 'var(--color-blue-500)',
  'P3': 'var(--color-green-500)',
  'P4': 'var(--color-purple-500)'
};

// Get color for a pathway
const getPathwayColor = (pathwayId) => {
  return pathwayColors[pathwayId] || 'var(--color-gray-500)';
};

// Get pathway name
const getPathwayName = (pathwayId) => {
  const pathway = careerData.value.academic_pathways.find(p => p.pathway_id === pathwayId);
  return pathway ? pathway.pathway_name : 'Unknown Pathway';
};

// Get color for skill level
const getSkillColor = (level) => {
  const colors = {
    'beginner': 'var(--color-blue-300)',
    'intermediate': 'var(--color-indigo-400)',
    'advanced': 'var(--color-purple-500)',
    'expert': 'var(--color-pink-600)'
  };
  return colors[level] || colors.beginner;
};

// Sample career data (will be replaced with props or API data)
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
      "difficulty": "High",
      "employment_rate": "75%"
    },
    {
      "pathway_id": "P2",
      "pathway_name": "Alternative University Track",
      "rank": 2,
      "ranking_reason": "This pathway is ranked second due to potentially less focused training compared to ENSEM, but still offers a solid foundation and may be more accessible to students with varying Baccalauréat backgrounds.",
      "description": "This pathway involves obtaining a Licence in a related scientific field from a University and pursuing a specialized professional diploma in Audio Engineering from a private institute or overseas. This blends theoretical knowledge with practical skills.",
      "duration_years": 4,
      "estimated_total_cost_MAD": 60000,
      "difficulty": "Medium-High",
      "employment_rate": "60%"
    },
    {
      "pathway_id": "P3",
      "pathway_name": "Vocational Excellence Track",
      "rank": 3,
      "ranking_reason": "This vocational path is ranked third due to its practical focus, but it may lack the theoretical depth required for advanced roles and research. Recognition is more limited than university degrees.",
      "description": "Enrolling in specialized vocational training programs focused on audio technology and sound engineering at vocational schools or private training centers. This pathway is shorter and focuses on practical skills.",
      "duration_years": 2,
      "estimated_total_cost_MAD": 30000,
      "difficulty": "Medium",
      "employment_rate": "40%"
    },
    {
      "pathway_id": "P4",
      "pathway_name": "Emerging Alternative Path",
      "rank": 4,
      "ranking_reason": "This pathway is included because online learning is becoming more accessible and accepted, although its recognition within the Moroccan employment context is still developing. Accreditation of online programs is crucial.",
      "description": "Combining a basic academic qualification (like a Licence in arts or humanities) with online courses and certifications from reputable international platforms focused on audio engineering. This requires self-discipline and careful selection of courses.",
      "duration_years": 3,
      "estimated_total_cost_MAD": 20000,
      "difficulty": "Medium-Low",
      "employment_rate": "30%"
    }
  ],
  "progression_opportunities": {
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
  }
});
</script>

<style scoped>
/* Cosmic container */
.constellation-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #e4ecff 100%);
  color: #333;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  transition: all 0.5s ease;
}

/* Dark mode */
.dark-cosmos {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
}

/* Cosmic background with stars */
.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat;
  opacity: 0.5;
}

.stars-small {
  background-image: radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0));
  background-size: 200px 200px;
  animation: stars-move 150s linear infinite;
}

.stars-medium {
  background-image: radial-gradient(1.5px 1.5px at 50px 80px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 100px 150px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 160px 50px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 200px 200px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 250px 120px, #ffffff, rgba(0,0,0,0));
  background-size: 300px 300px;
  animation: stars-move 100s linear infinite;
}

.stars-large {
  background-image: radial-gradient(2px 2px at 100px 50px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 200px 100px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 300px 200px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 400px 150px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 500px 250px, #ffffff, rgba(0,0,0,0));
  background-size: 600px 600px;
  animation: stars-move 80s linear infinite;
}

@keyframes stars-move {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-200px);
  }
}

/* Header section */
.cosmic-header {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fade-in 1s ease-out;
}

.cosmic-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #4f46e5, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(79, 70, 229, 0.3);
}

.dark-cosmos .cosmic-title {
  background: linear-gradient(to right, #818cf8, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(129, 140, 248, 0.5);
}

.cosmic-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.dark-cosmos .cosmic-subtitle {
  color: #d1d5db;
}

.cosmic-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.cosmic-button {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  border: 1px solid rgba(79, 70, 229, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.cosmic-button:hover {
  background: rgba(79, 70, 229, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.dark-cosmos .cosmic-button {
  background: rgba(129, 140, 248, 0.1);
  color: #818cf8;
  border: 1px solid rgba(129, 140, 248, 0.2);
}

.dark-cosmos .cosmic-button:hover {
  background: rgba(129, 140, 248, 0.2);
  box-shadow: 0 4px 12px rgba(129, 140, 248, 0.3);
}

/* Main content area */
.cosmic-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Pathway navigation */
.pathway-navigation {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.pathway-star {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pathway-star:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.pathway-star.active {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
}

.dark-cosmos .pathway-star {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(30, 41, 59, 0.5);
}

.dark-cosmos .pathway-star:hover {
  background: rgba(30, 41, 59, 0.6);
}

.dark-cosmos .pathway-star.active {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(79, 70, 229, 0.5);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
}

.star-core {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  position: relative;
  box-shadow: 0 0 20px currentColor;
  animation: pulse 3s infinite alternate;
}

.star-core::before,
.star-core::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0.5;
}

.star-core::before {
  width: 4rem;
  height: 4rem;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  animation: pulse 2s infinite alternate;
}

.star-core::after {
  width: 5rem;
  height: 5rem;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  animation: pulse 4s infinite alternate;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.star-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.star-rank {
  font-size: 0.875rem;
  color: #6b7280;
}

.dark-cosmos .star-rank {
  color: #9ca3af;
}

/* Constellation and Orbital views */
.constellation-view,
.orbital-view {
  min-height: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.dark-cosmos .constellation-view,
.dark-cosmos .orbital-view {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(30, 41, 59, 0.5);
}

/* Stage detail panel */
.stage-detail-panel {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.dark-cosmos .stage-detail-panel {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(30, 41, 59, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(79, 70, 229, 0.1);
  border-bottom: 1px solid rgba(79, 70, 229, 0.2);
}

.dark-cosmos .panel-header {
  background: rgba(79, 70, 229, 0.2);
  border-bottom: 1px solid rgba(79, 70, 229, 0.3);
}

.panel-header h3 {
  font-weight: 600;
  font-size: 1.25rem;
  color: #4f46e5;
}

.dark-cosmos .panel-header h3 {
  color: #818cf8;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #4f46e5;
}

.dark-cosmos .close-button {
  color: #9ca3af;
}

.dark-cosmos .close-button:hover {
  color: #818cf8;
}

.panel-content {
  padding: 1.5rem;
}

.skill-particles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.skill-particle {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: var(--particle-color, #4f46e5);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  animation: float 3s ease-in-out infinite;
  animation-delay: var(--particle-delay, 0s);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Cosmic footer */
.cosmic-footer {
  position: relative;
  z-index: 10;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 3rem;
}

.dark-cosmos .cosmic-footer {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(30, 41, 59, 0.5);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4f46e5;
}

.dark-cosmos .section-title {
  color: #818cf8;
}

.cosmic-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.color-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(30px) translateX(-50%);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .cosmic-title {
    font-size: 2rem;
  }
  
  .cosmic-subtitle {
    font-size: 1rem;
  }
  
  .pathway-navigation {
    gap: 1rem;
  }
  
  .star-core {
    width: 2rem;
    height: 2rem;
  }
  
  .star-core::before {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .star-core::after {
    width: 3rem;
    height: 3rem;
  }
  
  .star-name {
    font-size: 0.875rem;
  }
  
  .star-rank {
    font-size: 0.75rem;
  }
  
  .constellation-view,
  .orbital-view {
    padding: 1rem;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .cosmic-header {
    padding: 1.5rem 1rem;
  }
  
  .cosmic-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .cosmic-button {
    width: 100%;
  }
  
  .pathway-star {
    padding: 0.75rem;
  }
  
  .stage-detail-panel {
    width: 95%;
  }
}
</style>
