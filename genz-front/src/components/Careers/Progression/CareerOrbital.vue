<template>
  <div class="orbital-container">
    <!-- Central planet representing the career -->
    <div class="central-planet">
      <div class="planet-core"></div>
      <div class="planet-rings"></div>
      <div class="planet-name">{{ careerData.career }}</div>
    </div>
    
    <!-- Orbital paths -->
    <div class="orbital-paths">
      <div 
        v-for="(_, index) in careerStages" 
        :key="`path-${index}`"
        class="orbital-path"
        :style="{ 
          width: `${(index + 1) * 100 + 100}px`, 
          height: `${(index + 1) * 100 + 100}px`,
          borderColor: getPathColor(index)
        }"
      ></div>
    </div>
    
    <!-- Career stage planets -->
    <div 
      v-for="(stage, index) in careerStages" 
      :key="`stage-${index}`"
      class="stage-planet"
      :class="{ 'active': selectedStage === index }"
      :style="{ 
        '--orbit-size': `${(index + 1) * 100 + 100}px`,
        '--orbit-duration': `${20 + index * 5}s`,
        '--planet-color': getStageColor(index)
      }"
      @click="selectStage(stage, index)"
    >
      <div class="planet-body">
        <div class="planet-atmosphere"></div>
      </div>
      <div class="planet-label">{{ stage }}</div>
    </div>
    
    <!-- Skill satellites -->
    <div 
      v-for="(skill, index) in skillSatellites" 
      :key="`satellite-${index}`"
      class="skill-satellite"
      :style="{ 
        '--orbit-size': `${skill.orbitSize}px`,
        '--orbit-duration': `${skill.orbitDuration}s`,
        '--orbit-delay': `${skill.orbitDelay}s`,
        '--satellite-color': getSkillColor(skill.level)
      }"
    >
      <div class="satellite-body"></div>
      <div class="satellite-label">{{ skill.name }}</div>
    </div>
    
    <!-- Stage detail panel -->
    <div v-if="selectedStage !== null" class="stage-detail">
      <div class="detail-header">
        <h3>{{ careerStages[selectedStage] }}</h3>
        <button @click="closeDetail" class="close-button">×</button>
      </div>
      <div class="detail-content">
        <p>{{ getStageDescription(selectedStage) }}</p>
        
        <div class="detail-stats">
          <div class="stat-item">
            <div class="stat-label">Experience</div>
            <div class="stat-value">{{ getExperienceYears(selectedStage) }} years</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Salary Range</div>
            <div class="stat-value">{{ getSalaryRange(selectedStage) }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Key Skills</div>
            <div class="stat-tags">
              <span 
                v-for="(skill, i) in getKeySkills(selectedStage)" 
                :key="i"
                class="skill-tag"
                :style="{ backgroundColor: getSkillColor(skill.level) }"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  pathwayId: {
    type: String,
    required: true
  },
  careerData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['stage-selected']);

// State
const selectedStage = ref(null);

// Get career stages for the selected pathway
const careerStages = computed(() => {
  const pathwayData = props.careerData.progression_opportunities.career_advancement.find(
    item => item.from_pathway_id === props.pathwayId
  );
  return pathwayData ? pathwayData.typical_progression : [];
});

// Sample skill satellites (in a real app, this would come from API data)
const skillSatellites = ref([
  { name: "Sound Mixing", level: "intermediate", orbitSize: 180, orbitDuration: 15, orbitDelay: 0 },
  { name: "Audio Editing", level: "advanced", orbitSize: 220, orbitDuration: 18, orbitDelay: 2 },
  { name: "Recording", level: "beginner", orbitSize: 150, orbitDuration: 12, orbitDelay: 4 },
  { name: "Pro Tools", level: "intermediate", orbitSize: 200, orbitDuration: 16, orbitDelay: 6 },
  { name: "Sound Design", level: "intermediate", orbitSize: 250, orbitDuration: 20, orbitDelay: 8 },
  { name: "Music Theory", level: "beginner", orbitSize: 170, orbitDuration: 14, orbitDelay: 10 },
  { name: "Project Management", level: "intermediate", orbitSize: 230, orbitDuration: 19, orbitDelay: 12 }
]);

// Get color for orbital path
const getPathColor = (index) => {
  const baseColor = getBaseColor();
  const opacity = 0.2 - (index * 0.03);
  return `${baseColor}${Math.max(opacity, 0.05).toFixed(2)})`;
};

// Get color for a stage planet
const getStageColor = (index) => {
  const colors = getColorArray();
  return colors[index % colors.length];
};

// Get base color based on pathway
const getBaseColor = () => {
  switch (props.pathwayId) {
    case 'P1': return 'rgba(79, 70, 229, '; // indigo
    case 'P2': return 'rgba(59, 130, 246, '; // blue
    case 'P3': return 'rgba(34, 197, 94, '; // green
    case 'P4': return 'rgba(147, 51, 234, '; // purple
    default: return 'rgba(79, 70, 229, '; // default to indigo
  }
};

// Get color array based on pathway
const getColorArray = () => {
  switch (props.pathwayId) {
    case 'P1': 
      return [
        'var(--color-indigo-500)',
        'var(--color-indigo-600)',
        'var(--color-indigo-700)',
        'var(--color-indigo-800)'
      ];
    case 'P2':
      return [
        'var(--color-blue-500)',
        'var(--color-blue-600)',
        'var(--color-blue-700)',
        'var(--color-blue-800)'
      ];
    case 'P3':
      return [
        'var(--color-green-500)',
        'var(--color-green-600)',
        'var(--color-green-700)',
        'var(--color-green-800)'
      ];
    case 'P4':
      return [
        'var(--color-purple-500)',
        'var(--color-purple-600)',
        'var(--color-purple-700)',
        'var(--color-purple-800)'
      ];
    default:
      return [
        'var(--color-indigo-500)',
        'var(--color-indigo-600)',
        'var(--color-indigo-700)',
        'var(--color-indigo-800)'
      ];
  }
};

// Get color for skill level
const getSkillColor = (level) => {
  const colors = {
    'beginner': 'var(--color-blue-400)',
    'intermediate': 'var(--color-indigo-500)',
    'advanced': 'var(--color-purple-600)',
    'expert': 'var(--color-pink-700)'
  };
  return colors[level] || colors.beginner;
};

// Select a stage
const selectStage = (stage, index) => {
  selectedStage.value = index;
  
  // Create a stage object with more details
  const stageDetail = {
    title: stage,
    description: getStageDescription(index),
    skills: getKeySkills(index)
  };
  
  emit('stage-selected', stageDetail);
};

// Close detail panel
const closeDetail = () => {
  selectedStage.value = null;
};

// Get stage description (sample data - would come from API in real app)
const getStageDescription = (index) => {
  const descriptions = [
    "Entry-level position focused on assisting senior engineers, setting up equipment, and learning the basics of audio recording and editing.",
    "Mid-level position with responsibilities for recording, editing, and mixing audio for various projects under supervision.",
    "Senior position with creative control over audio projects, sound design, and mentoring junior staff.",
    "Leadership role managing audio production teams, overseeing multiple projects, and making strategic decisions."
  ];
  
  return descriptions[index] || "No description available";
};

// Get experience years for a stage (sample data)
const getExperienceYears = (index) => {
  const years = [0, 2, 5, 8];
  return years[index] || 0;
};

// Get salary range for a stage (sample data)
const getSalaryRange = (index) => {
  const ranges = [
    "15,000 - 25,000 MAD",
    "25,000 - 40,000 MAD",
    "40,000 - 60,000 MAD",
    "60,000+ MAD"
  ];
  
  return ranges[index] || "Not available";
};

// Get key skills for a stage (sample data)
const getKeySkills = (index) => {
  // Basic skills for first stage
  const baseSkills = [
    { name: "Sound Mixing", level: "beginner" },
    { name: "Audio Editing", level: "beginner" },
    { name: "Recording", level: "beginner" }
  ];
  
  // Add more skills and increase levels for later stages
  if (index >= 1) {
    baseSkills.push({ name: "Pro Tools", level: "intermediate" });
    baseSkills[0].level = "intermediate"; // Upgrade Sound Mixing
  }
  
  if (index >= 2) {
    baseSkills.push({ name: "Sound Design", level: "intermediate" });
    baseSkills[1].level = "advanced"; // Upgrade Audio Editing
    baseSkills[2].level = "intermediate"; // Upgrade Recording
  }
  
  if (index >= 3) {
    baseSkills.push({ name: "Project Management", level: "advanced" });
    baseSkills.push({ name: "Team Leadership", level: "intermediate" });
    baseSkills[0].level = "advanced"; // Upgrade Sound Mixing
    baseSkills[3].level = "advanced"; // Upgrade Pro Tools
    baseSkills[4].level = "advanced"; // Upgrade Sound Design
  }
  
  return baseSkills;
};

// Initialize when component is mounted
onMounted(() => {
  // Any initialization code if needed
});
</script>

<style scoped>
.orbital-container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Central planet */
.central-planet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.planet-core {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 70, 229, 1) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(79, 70, 229, 0.3) 100%);
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
  position: relative;
}

.planet-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(75deg);
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 4px solid rgba(79, 70, 229, 0.2);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.planet-name {
  margin-top: 2.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-indigo-600);
  text-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
}

:deep(.dark-cosmos) .planet-name {
  color: var(--color-indigo-300);
}

/* Orbital paths */
.orbital-paths {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.orbital-path {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px dashed rgba(79, 70, 229, 0.2);
}

/* Career stage planets */
.stage-planet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: orbit var(--orbit-duration, 20s) linear infinite;
  z-index: 5;
}

.planet-body {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--planet-color, var(--color-indigo-500));
  box-shadow: 0 0 15px var(--planet-color, var(--color-indigo-500));
  position: relative;
  transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1.25rem));
  cursor: pointer;
  transition: all 0.3s ease;
}

.planet-body:hover {
  transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1.25rem)) scale(1.2);
}

.planet-atmosphere {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
}

.planet-label {
  position: absolute;
  top: 0;
  left: calc(var(--orbit-size, 200px) / 2 + 1.5rem);
  transform: translateY(-50%);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-gray-700);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

:deep(.dark-cosmos) .planet-label {
  color: var(--color-gray-300);
}

.planet-body:hover + .planet-label {
  opacity: 1;
}

/* Active planet */
.stage-planet.active .planet-body {
  box-shadow: 0 0 25px var(--planet-color, var(--color-indigo-500));
  animation: pulse 2s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1.25rem)) scale(1);
  }
  100% {
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1.25rem)) scale(1.2);
  }
}

/* Skill satellites */
.skill-satellite {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: orbit var(--orbit-duration, 15s) linear infinite;
  animation-delay: var(--orbit-delay, 0s);
  z-index: 3;
}

.satellite-body {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--satellite-color, var(--color-blue-400));
  box-shadow: 0 0 10px var(--satellite-color, var(--color-blue-400));
  transform: translateX(calc(var(--orbit-size, 150px) / 2 - 0.5rem));
  cursor: pointer;
  transition: all 0.3s ease;
}

.satellite-body:hover {
  transform: translateX(calc(var(--orbit-size, 150px) / 2 - 0.5rem)) scale(1.5);
}

.satellite-label {
  position: absolute;
  top: 0;
  left: calc(var(--orbit-size, 150px) / 2 + 0.75rem);
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: var(--color-gray-600);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

:deep(.dark-cosmos) .satellite-label {
  color: var(--color-gray-400);
}

.satellite-body:hover + .satellite-label {
  opacity: 1;
}

@keyframes orbit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Stage detail panel */
.stage-detail {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  animation: slide-up 0.3s ease-out forwards;
}

:deep(.dark-cosmos) .stage-detail {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(30, 41, 59, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(79, 70, 229, 0.1);
  border-bottom: 1px solid rgba(79, 70, 229, 0.2);
}

:deep(.dark-cosmos) .detail-header {
  background: rgba(79, 70, 229, 0.2);
  border-bottom: 1px solid rgba(79, 70, 229, 0.3);
}

.detail-header h3 {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--color-indigo-600);
}

:deep(.dark-cosmos) .detail-header h3 {
  color: var(--color-indigo-300);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-gray-500);
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: var(--color-indigo-600);
}

:deep(.dark-cosmos) .close-button:hover {
  color: var(--color-indigo-300);
}

.detail-content {
  padding: 1.5rem;
}

.detail-content p {
  margin-bottom: 1.5rem;
  color: var(--color-gray-700);
}

:deep(.dark-cosmos) .detail-content p {
  color: var(--color-gray-300);
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.dark-cosmos) .stat-item {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(30, 41, 59, 0.8);
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-500);
  margin-bottom: 0.5rem;
}

:deep(.dark-cosmos) .stat-label {
  color: var(--color-gray-400);
}

.stat-value {
  font-weight: 700;
  color: var(--color-gray-800);
}

:deep(.dark-cosmos) .stat-value {
  color: var(--color-gray-200);
}

.stat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .orbital-container {
    height: 400px;
  }
  
  .planet-core {
    width: 3rem;
    height: 3rem;
  }
  
  .planet-rings {
    width: 4.5rem;
    height: 4.5rem;
  }
  
  .planet-name {
    font-size: 1rem;
  }
  
  .planet-body {
    width: 2rem;
    height: 2rem;
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1rem));
  }
  
  .planet-body:hover {
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 1rem)) scale(1.2);
  }
  
  .planet-atmosphere {
    width: 2.8rem;
    height: 2.8rem;
  }
  
  .satellite-body {
    width: 0.75rem;
    height: 0.75rem;
    transform: translateX(calc(var(--orbit-size, 150px) / 2 - 0.375rem));
  }
  
  .satellite-body:hover {
    transform: translateX(calc(var(--orbit-size, 150px) / 2 - 0.375rem)) scale(1.5);
  }
}

@media (max-width: 480px) {
  .orbital-container {
    height: 350px;
  }
  
  .planet-core {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .planet-rings {
    width: 3.5rem;
    height: 3.5rem;
    border-width: 3px;
  }
  
  .planet-body {
    width: 1.5rem;
    height: 1.5rem;
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 0.75rem));
  }
  
  .planet-body:hover {
    transform: translateX(calc(var(--orbit-size, 200px) / 2 - 0.75rem)) scale(1.2);
  }
  
  .planet-atmosphere {
    width: 2.1rem;
    height: 2.1rem;
  }
  
  .satellite-body {
    display: none;
  }
  
  .detail-stats {
    grid-template-columns: 1fr;
  }
}
</style>
