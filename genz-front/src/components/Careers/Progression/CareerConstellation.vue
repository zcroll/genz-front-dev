<template>
  <div class="constellation-container" ref="constellationRef">
    <!-- Central star representing the career -->
    <div class="central-star">
      <div class="star-core"></div>
      <div class="star-name">{{ careerData.career }}</div>
    </div>
    
    <!-- Constellation lines connecting career stages -->
    <svg class="constellation-lines" ref="linesRef"></svg>
    
    <!-- Career stage stars -->
    <div 
      v-for="(stage, index) in careerStages" 
      :key="index"
      class="stage-star"
      :class="{ 'pulse-highlight': highlightedStage === index }"
      :style="getStagePosition(index)"
      @mouseenter="highlightStage(index)"
      @mouseleave="clearHighlight"
      @click="selectStage(stage, index)"
    >
      <div class="stage-star-core" :style="{ backgroundColor: getStageColor(index) }"></div>
      <div class="stage-star-label">{{ stage }}</div>
    </div>
    
    <!-- Skill clusters -->
    <div 
      v-for="(cluster, index) in skillClusters" 
      :key="`cluster-${index}`"
      class="skill-cluster"
      :style="getClusterPosition(index)"
    >
      <div 
        v-for="(skill, skillIndex) in cluster.skills" 
        :key="`skill-${skillIndex}`"
        class="skill-particle"
        :style="{ 
          '--particle-delay': `${skillIndex * 0.2}s`,
          '--particle-color': getSkillColor(skill.level),
          transform: `translate(${Math.sin(skillIndex * 1.5) * 30}px, ${Math.cos(skillIndex * 1.5) * 30}px)`
        }"
      >
        {{ skill.name }}
      </div>
      <div class="cluster-name">{{ cluster.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

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

// Refs for DOM elements
const constellationRef = ref(null);
const linesRef = ref(null);

// State
const highlightedStage = ref(null);

// Get career stages for the selected pathway
const careerStages = computed(() => {
  const pathwayData = props.careerData.progression_opportunities.career_advancement.find(
    item => item.from_pathway_id === props.pathwayId
  );
  return pathwayData ? pathwayData.typical_progression : [];
});

// Sample skill clusters (in a real app, this would come from API data)
const skillClusters = ref([
  {
    name: "Technical Skills",
    skills: [
      { name: "Sound Mixing", level: "intermediate" },
      { name: "Audio Editing", level: "advanced" },
      { name: "Recording", level: "beginner" },
      { name: "Pro Tools", level: "intermediate" }
    ]
  },
  {
    name: "Creative Skills",
    skills: [
      { name: "Sound Design", level: "intermediate" },
      { name: "Music Theory", level: "beginner" },
      { name: "Composition", level: "beginner" }
    ]
  },
  {
    name: "Professional Skills",
    skills: [
      { name: "Project Management", level: "intermediate" },
      { name: "Client Communication", level: "advanced" },
      { name: "Time Management", level: "beginner" }
    ]
  }
]);

// Calculate positions for stage stars in a constellation pattern
const getStagePosition = (index) => {
  const totalStages = careerStages.value.length;
  const angle = (index / totalStages) * Math.PI * 2;
  const radius = 180; // Distance from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return {
    transform: `translate(${x}px, ${y}px)`
  };
};

// Calculate positions for skill clusters
const getClusterPosition = (index) => {
  const totalClusters = skillClusters.value.length;
  const angle = ((index + 0.5) / totalClusters) * Math.PI * 2;
  const radius = 100; // Distance from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return {
    transform: `translate(${x}px, ${y}px)`
  };
};

// Get color for a stage based on index
const getStageColor = (index) => {
  const colors = [
    'var(--color-indigo-500)',
    'var(--color-indigo-400)',
    'var(--color-indigo-300)',
    'var(--color-indigo-600)',
    'var(--color-indigo-700)'
  ];
  
  // Use different color sets based on pathway
  if (props.pathwayId === 'P2') {
    colors[0] = 'var(--color-blue-500)';
    colors[1] = 'var(--color-blue-400)';
    colors[2] = 'var(--color-blue-300)';
    colors[3] = 'var(--color-blue-600)';
    colors[4] = 'var(--color-blue-700)';
  } else if (props.pathwayId === 'P3') {
    colors[0] = 'var(--color-green-500)';
    colors[1] = 'var(--color-green-400)';
    colors[2] = 'var(--color-green-300)';
    colors[3] = 'var(--color-green-600)';
    colors[4] = 'var(--color-green-700)';
  } else if (props.pathwayId === 'P4') {
    colors[0] = 'var(--color-purple-500)';
    colors[1] = 'var(--color-purple-400)';
    colors[2] = 'var(--color-purple-300)';
    colors[3] = 'var(--color-purple-600)';
    colors[4] = 'var(--color-purple-700)';
  }
  
  return colors[index % colors.length];
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

// Highlight a stage
const highlightStage = (index) => {
  highlightedStage.value = index;
  drawConstellationLines();
};

// Clear highlight
const clearHighlight = () => {
  highlightedStage.value = null;
  drawConstellationLines();
};

// Select a stage
const selectStage = (stage, index) => {
  // Create a stage object with more details
  const stageDetail = {
    title: stage,
    description: getStageDescription(index),
    skills: getStageSkills(index)
  };
  
  emit('stage-selected', stageDetail);
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

// Get skills for a stage (sample data - would come from API in real app)
const getStageSkills = (index) => {
  // Combine skills from clusters with varying levels based on career stage
  const allSkills = [];
  
  skillClusters.value.forEach(cluster => {
    cluster.skills.forEach(skill => {
      // Adjust skill level based on career stage
      const adjustedLevel = adjustSkillLevel(skill.level, index);
      allSkills.push({
        name: skill.name,
        level: adjustedLevel
      });
    });
  });
  
  return allSkills;
};

// Adjust skill level based on career stage
const adjustSkillLevel = (baseLevel, stageIndex) => {
  const levelMap = {
    'beginner': 0,
    'intermediate': 1,
    'advanced': 2,
    'expert': 3
  };
  
  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
  let levelIndex = levelMap[baseLevel] || 0;
  
  // Increase level based on career stage
  levelIndex = Math.min(levelIndex + stageIndex, 3);
  
  return levels[levelIndex];
};

// Draw constellation lines connecting the stars
const drawConstellationLines = () => {
  if (!linesRef.value || !constellationRef.value) return;
  
  // Clear previous lines
  linesRef.value.innerHTML = '';
  
  const container = constellationRef.value;
  const containerRect = container.getBoundingClientRect();
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;
  
  // Create SVG namespace
  const svgNS = "http://www.w3.org/2000/svg";
  
  // Draw lines from center to each stage
  careerStages.value.forEach((_, index) => {
    const totalStages = careerStages.value.length;
    const angle = (index / totalStages) * Math.PI * 2;
    const radius = 180;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    // Create line element
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', centerX.toString());
    line.setAttribute('y1', centerY.toString());
    line.setAttribute('x2', x.toString());
    line.setAttribute('y2', y.toString());
    line.setAttribute('stroke', highlightedStage.value === index ? getStageColor(index) : 'rgba(148, 163, 184, 0.3)');
    line.setAttribute('stroke-width', highlightedStage.value === index ? '2' : '1');
    line.setAttribute('stroke-dasharray', highlightedStage.value === index ? '0' : '4,4');
    
    linesRef.value.appendChild(line);
    
    // Connect to next stage if not the last one
    if (index < totalStages - 1) {
      const nextIndex = (index + 1) % totalStages;
      const nextAngle = (nextIndex / totalStages) * Math.PI * 2;
      const nextX = centerX + Math.cos(nextAngle) * radius;
      const nextY = centerY + Math.sin(nextAngle) * radius;
      
      const connectionLine = document.createElementNS(svgNS, 'line');
      connectionLine.setAttribute('x1', x.toString());
      connectionLine.setAttribute('y1', y.toString());
      connectionLine.setAttribute('x2', nextX.toString());
      connectionLine.setAttribute('y2', nextY.toString());
      connectionLine.setAttribute('stroke', 'rgba(148, 163, 184, 0.2)');
      connectionLine.setAttribute('stroke-width', '1');
      connectionLine.setAttribute('stroke-dasharray', '2,2');
      
      linesRef.value.appendChild(connectionLine);
    }
  });
};

// Initialize constellation when component is mounted
onMounted(() => {
  drawConstellationLines();
  
  // Redraw lines when window is resized
  window.addEventListener('resize', drawConstellationLines);
});

// Watch for changes in pathway
watch(() => props.pathwayId, () => {
  drawConstellationLines();
});
</script>

<style scoped>
.constellation-container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Central star */
.central-star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.star-core {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 70, 229, 1) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(79, 70, 229, 0) 100%);
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
  animation: pulse-central 4s infinite alternate;
}

.star-name {
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-indigo-600);
  text-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
}

:deep(.dark-cosmos) .star-name {
  color: var(--color-indigo-300);
}

@keyframes pulse-central {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Constellation lines */
.constellation-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Career stage stars */
.stage-star {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stage-star:hover {
  transform: translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) scale(1.1) !important;
}

.stage-star-core {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-indigo-500);
  box-shadow: 0 0 15px currentColor;
  transition: all 0.3s ease;
}

.stage-star:hover .stage-star-core {
  box-shadow: 0 0 25px currentColor;
}

.stage-star-label {
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-gray-700);
  text-align: center;
  max-width: 120px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

:deep(.dark-cosmos) .stage-star-label {
  color: var(--color-gray-300);
}

.stage-star:hover .stage-star-label {
  opacity: 1;
  transform: translateY(0);
}

/* Pulse highlight animation for selected stage */
.pulse-highlight .stage-star-core {
  animation: pulse-highlight 1.5s infinite alternate;
}

@keyframes pulse-highlight {
  0% {
    transform: scale(1);
    box-shadow: 0 0 15px currentColor;
  }
  100% {
    transform: scale(1.2);
    box-shadow: 0 0 30px currentColor;
  }
}

/* Skill clusters */
.skill-cluster {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}

.cluster-name {
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--color-gray-500);
  text-align: center;
}

:deep(.dark-cosmos) .cluster-name {
  color: var(--color-gray-400);
}

.skill-particle {
  position: absolute;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background: var(--particle-color, var(--color-indigo-400));
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  animation: orbit 10s linear infinite;
  animation-delay: var(--particle-delay, 0s);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.skill-particle:hover {
  opacity: 1;
  transform: scale(1.1) !important;
  z-index: 10;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(30px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(30px) rotate(-360deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .constellation-container {
    height: 400px;
  }
  
  .star-core {
    width: 3rem;
    height: 3rem;
  }
  
  .star-name {
    font-size: 1rem;
  }
  
  .stage-star-core {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .stage-star-label {
    font-size: 0.75rem;
    max-width: 100px;
  }
  
  .skill-particle {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
}

@media (max-width: 480px) {
  .constellation-container {
    height: 350px;
  }
  
  .star-core {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .stage-star-core {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .stage-star-label {
    max-width: 80px;
  }
  
  .skill-particle {
    display: none;
  }
}
</style>
