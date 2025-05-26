<template>
  <div class="comparison-chart-container">
    <!-- Radar chart for pathway comparison -->
    <div class="radar-chart" ref="radarChartRef">
      <canvas ref="radarCanvas" width="400" height="400"></canvas>
    </div>
    
    <!-- Comparison metrics -->
    <div class="comparison-metrics">
      <div class="metrics-header">
        <h3>Pathway Metrics</h3>
        <div class="metrics-controls">
          <button 
            v-for="metric in availableMetrics" 
            :key="metric.id"
            class="metric-button"
            :class="{ 'active': selectedMetrics.includes(metric.id) }"
            @click="toggleMetric(metric.id)"
          >
            {{ metric.label }}
          </button>
        </div>
      </div>
      
      <div class="metrics-table">
        <table>
          <thead>
            <tr>
              <th>Pathway</th>
              <th v-for="metric in filteredMetrics" :key="metric.id">{{ metric.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pathway in careerData.academic_pathways" :key="pathway.pathway_id">
              <td class="pathway-name">
                <span 
                  class="pathway-color-dot"
                  :style="{ backgroundColor: getPathwayColor(pathway.pathway_id) }"
                ></span>
                {{ pathway.pathway_name }}
              </td>
              <td v-for="metric in filteredMetrics" :key="`${pathway.pathway_id}-${metric.id}`">
                {{ getPathwayMetricValue(pathway, metric.id) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  careerData: {
    type: Object,
    required: true
  }
});

// Refs for chart
const radarChartRef = ref(null);
const radarCanvas = ref(null);
let chart = null;

// Available metrics for comparison
const availableMetrics = ref([
  { id: 'duration', label: 'Duration' },
  { id: 'cost', label: 'Cost' },
  { id: 'employment', label: 'Employment Rate' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'recognition', label: 'Recognition' }
]);

// Selected metrics
const selectedMetrics = ref(['duration', 'cost', 'employment', 'difficulty']);

// Filtered metrics based on selection
const filteredMetrics = computed(() => {
  return availableMetrics.value.filter(metric => selectedMetrics.value.includes(metric.id));
});

// Toggle a metric
const toggleMetric = (metricId) => {
  if (selectedMetrics.value.includes(metricId)) {
    // Don't allow deselecting if only one metric is selected
    if (selectedMetrics.value.length > 1) {
      selectedMetrics.value = selectedMetrics.value.filter(id => id !== metricId);
    }
  } else {
    selectedMetrics.value.push(metricId);
  }
  
  // Update chart
  updateChart();
};

// Get color for a pathway
const getPathwayColor = (pathwayId) => {
  const colors = {
    'P1': 'var(--color-indigo-500)',
    'P2': 'var(--color-blue-500)',
    'P3': 'var(--color-green-500)',
    'P4': 'var(--color-purple-500)'
  };
  
  return colors[pathwayId] || 'var(--color-gray-500)';
};

// Get pathway metric value
const getPathwayMetricValue = (pathway, metricId) => {
  switch (metricId) {
    case 'duration':
      return `${pathway.duration_years} years`;
    case 'cost':
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'MAD',
        maximumFractionDigits: 0
      }).format(pathway.estimated_total_cost_MAD);
    case 'employment':
      return pathway.employment_rate || 'N/A';
    case 'difficulty':
      return pathway.difficulty || 'N/A';
    case 'recognition':
      // This is a derived value based on rank
      const recognitionLevels = ['Very High', 'High', 'Medium', 'Low'];
      return recognitionLevels[pathway.rank - 1] || 'N/A';
    default:
      return 'N/A';
  }
};

// Get normalized metric value for chart (0-100 scale)
const getNormalizedMetricValue = (pathway, metricId) => {
  switch (metricId) {
    case 'duration':
      // Shorter duration is better (inverse scale)
      const maxDuration = Math.max(...props.careerData.academic_pathways.map(p => p.duration_years));
      return 100 - ((pathway.duration_years / maxDuration) * 100);
    case 'cost':
      // Lower cost is better (inverse scale)
      const maxCost = Math.max(...props.careerData.academic_pathways.map(p => p.estimated_total_cost_MAD));
      return 100 - ((pathway.estimated_total_cost_MAD / maxCost) * 100);
    case 'employment':
      // Parse employment rate percentage
      const rate = parseInt(pathway.employment_rate || '0');
      return rate;
    case 'difficulty':
      // Map difficulty to numeric value (inverse scale - easier is better)
      const difficultyMap = {
        'Low': 80,
        'Medium-Low': 60,
        'Medium': 50,
        'Medium-High': 40,
        'High': 20
      };
      return difficultyMap[pathway.difficulty] || 50;
    case 'recognition':
      // Recognition is directly related to rank (inverse scale)
      return 100 - ((pathway.rank / props.careerData.academic_pathways.length) * 100);
    default:
      return 50; // Default middle value
  }
};

// Initialize and update chart
const initChart = () => {
  if (!radarCanvas.value) return;
  
  // Import Chart.js dynamically
  import('chart.js/auto').then((ChartModule) => {
    const Chart = ChartModule.default;
    
    // Register required components
    Chart.register({
      id: 'custom-radar-background',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = document.documentElement.classList.contains('dark') 
          ? 'rgba(15, 23, 42, 0.3)' 
          : 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    });
    
    // Create chart data
    const data = {
      labels: filteredMetrics.value.map(metric => metric.label),
      datasets: props.careerData.academic_pathways.map(pathway => ({
        label: pathway.pathway_name,
        data: filteredMetrics.value.map(metric => getNormalizedMetricValue(pathway, metric.id)),
        backgroundColor: `${getPathwayColor(pathway.pathway_id)}33`, // Add transparency
        borderColor: getPathwayColor(pathway.pathway_id),
        pointBackgroundColor: getPathwayColor(pathway.pathway_id),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: getPathwayColor(pathway.pathway_id)
      }))
    };
    
    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: document.documentElement.classList.contains('dark') 
              ? '#e2e8f0' 
              : '#1e293b'
          }
        },
        tooltip: {
          backgroundColor: document.documentElement.classList.contains('dark') 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          titleColor: document.documentElement.classList.contains('dark') 
            ? '#e2e8f0' 
            : '#1e293b',
          bodyColor: document.documentElement.classList.contains('dark') 
            ? '#e2e8f0' 
            : '#1e293b',
          borderColor: document.documentElement.classList.contains('dark') 
            ? 'rgba(148, 163, 184, 0.2)' 
            : 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false
          },
          pointLabels: {
            color: document.documentElement.classList.contains('dark') 
              ? '#e2e8f0' 
              : '#1e293b',
            font: {
              size: 12
            }
          },
          grid: {
            color: document.documentElement.classList.contains('dark') 
              ? 'rgba(148, 163, 184, 0.2)' 
              : 'rgba(148, 163, 184, 0.2)'
          },
          angleLines: {
            color: document.documentElement.classList.contains('dark') 
              ? 'rgba(148, 163, 184, 0.2)' 
              : 'rgba(148, 163, 184, 0.2)'
          }
        }
      }
    };
    
    // Create chart
    chart = new Chart(radarCanvas.value, {
      type: 'radar',
      data: data,
      options: options
    });
  });
};

// Update chart when metrics change
const updateChart = () => {
  if (!chart) return;
  
  chart.data.labels = filteredMetrics.value.map(metric => metric.label);
  chart.data.datasets.forEach((dataset, index) => {
    const pathway = props.careerData.academic_pathways[index];
    dataset.data = filteredMetrics.value.map(metric => getNormalizedMetricValue(pathway, metric.id));
  });
  
  chart.update();
};

// Watch for dark mode changes
watch(() => document.documentElement.classList.contains('dark'), () => {
  if (chart) {
    chart.destroy();
    initChart();
  }
});

// Initialize chart when component is mounted
onMounted(() => {
  initChart();
  
  // Redraw chart when window is resized
  window.addEventListener('resize', () => {
    if (chart) {
      chart.resize();
    }
  });
});

// Clean up when component is unmounted
onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
  
  window.removeEventListener('resize', () => {
    if (chart) {
      chart.resize();
    }
  });
});
</script>

<style scoped>
.comparison-chart-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .comparison-chart-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Radar chart */
.radar-chart {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.dark-cosmos) .radar-chart {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(30, 41, 59, 0.5);
}

/* Comparison metrics */
.comparison-metrics {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

:deep(.dark-cosmos) .comparison-metrics {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(30, 41, 59, 0.5);
}

.metrics-header {
  margin-bottom: 1.5rem;
}

.metrics-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-gray-800);
}

:deep(.dark-cosmos) .metrics-header h3 {
  color: var(--color-gray-200);
}

.metrics-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric-button {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-gray-700);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
}

.metric-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.metric-button.active {
  background: var(--color-indigo-500);
  color: white;
  border-color: var(--color-indigo-600);
}

:deep(.dark-cosmos) .metric-button {
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-gray-300);
  border: 1px solid rgba(30, 41, 59, 0.8);
}

:deep(.dark-cosmos) .metric-button:hover {
  background: rgba(30, 41, 59, 0.7);
}

:deep(.dark-cosmos) .metric-button.active {
  background: var(--color-indigo-600);
  color: white;
  border-color: var(--color-indigo-700);
}

.metrics-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

th {
  font-weight: 600;
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

:deep(.dark-cosmos) th {
  color: var(--color-gray-400);
}

td {
  color: var(--color-gray-800);
}

:deep(.dark-cosmos) td {
  color: var(--color-gray-300);
}

.pathway-name {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pathway-color-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

/* Responsive design */
@media (max-width: 768px) {
  .radar-chart {
    height: 350px;
  }
  
  .metrics-controls {
    gap: 0.25rem;
  }
  
  .metric-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  th, td {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .radar-chart {
    height: 300px;
  }
  
  .metrics-header h3 {
    font-size: 1.1rem;
  }
  
  .metric-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.4rem 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
