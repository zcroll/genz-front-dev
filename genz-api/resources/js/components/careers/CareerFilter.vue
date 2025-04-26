<template>
  <div class="career-filter">
    <div class="filter-sidebar">
      <div class="filter-section">
        <h3 class="filter-section-title">Search Careers</h3>
        <div class="filter-search">
          <input 
            type="text" 
            v-model="filters.name" 
            placeholder="Search by career name"
            class="filter-search-input"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <div class="filter-section">
        <h3 class="filter-section-title">Industries</h3>
        <div class="filter-options">
          <div v-if="loading.filterOptions" class="loading-placeholder">
            Loading industries...
          </div>
          <div v-else v-for="industry in filterOptions.industries" :key="industry.id" class="filter-option">
            <input 
              type="checkbox" 
              :id="`industry-${industry.id}`" 
              :value="industry.id"
              v-model="filters.industry_ids"
              @change="applyFilters"
            />
            <label :for="`industry-${industry.id}`">{{ industry.name }}</label>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <h3 class="filter-section-title">Employment Types</h3>
        <div class="filter-options">
          <div v-if="loading.filterOptions" class="loading-placeholder">
            Loading employment types...
          </div>
          <div v-else v-for="(label, type) in filterOptions.employment_types" :key="type" class="filter-option">
            <input 
              type="checkbox" 
              :id="`employment-${type}`" 
              :value="type"
              v-model="filters.employment_types"
              @change="applyFilters"
            />
            <label :for="`employment-${type}`">{{ label }}</label>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <h3 class="filter-section-title">Related Degrees</h3>
        <div class="filter-options">
          <div v-if="loading.filterOptions" class="loading-placeholder">
            Loading degrees...
          </div>
          <div v-else v-for="degree in filterOptions.degrees" :key="degree.id" class="filter-option">
            <input 
              type="checkbox" 
              :id="`degree-${degree.id}`" 
              :value="degree.id"
              v-model="filters.degree_ids"
              @change="applyFilters"
            />
            <label :for="`degree-${degree.id}`">{{ degree.name }}</label>
          </div>
        </div>
      </div>

      <div class="filter-actions">
        <button class="filter-clear-btn" @click="clearFilters">Clear All Filters</button>
      </div>
    </div>

    <div class="results-area">
      <div class="results-header">
        <h2 class="results-title">{{ filteredCareers.length }} Career{{ filteredCareers.length !== 1 ? 's' : '' }} Found</h2>
        <div class="results-sort">
          <label for="sort-select">Sort by:</label>
          <select id="sort-select" v-model="sortOption" @change="applyFilters">
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="salary">Salary (Low to High)</option>
            <option value="-salary">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      <div v-if="loading.careers" class="loading-results">
        <div v-for="i in 6" :key="i" class="career-card-skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-details"></div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredCareers.length === 0" class="empty-results">
        <p>No careers match your filter criteria.</p>
        <button class="filter-clear-btn" @click="clearFilters">Clear All Filters</button>
      </div>

      <div v-else class="career-grid">
        <div 
          v-for="career in filteredCareers" 
          :key="career.id" 
          class="career-card"
          @click="viewCareerDetails(career)"
        >
          <div class="career-image">
            <img 
              :src="career.image || '/images/career-placeholder.jpg'" 
              :alt="career.name"
              class="career-image-content"
            />
          </div>
          <div class="career-details">
            <h3 class="career-title">{{ career.name }}</h3>
            <div class="career-meta">
              <span v-if="career.industries && career.industries.length" class="career-industry">
                {{ career.industries[0] }}
              </span>
              <span v-if="career.employment_types && career.employment_types.length" class="career-employment">
                {{ formatEmploymentType(career.employment_types[0]) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="meta && meta.last_page > 1" class="pagination">
        <button 
          :disabled="meta.current_page === 1" 
          @click="changePage(meta.current_page - 1)"
          class="pagination-btn"
        >
          Previous
        </button>
        <span class="pagination-info">
          Page {{ meta.current_page }} of {{ meta.last_page }}
        </span>
        <button 
          :disabled="meta.current_page === meta.last_page" 
          @click="changePage(meta.current_page + 1)"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { debounce } from 'lodash';
import axios from 'axios';

const emit = defineEmits(['career-selected']);

const careers = ref([]);
const meta = ref(null);
const filterOptions = reactive({
  industries: [],
  employment_types: {},
  self_employment: {},
  degrees: []
});

const loading = reactive({
  careers: true,
  filterOptions: true
});

const filters = reactive({
  name: '',
  industry_ids: [],
  employment_types: [],
  self_employment: null,
  degree_ids: []
});

const sortOption = ref('name');
const currentPage = ref(1);

const filteredCareers = computed(() => {
  return careers.value;
});

// Load filter options when component mounts
onMounted(async () => {
  await loadFilterOptions();
  await fetchCareers();
});

const loadFilterOptions = async () => {
  loading.filterOptions = true;
  try {
    const response = await axios.get('/api/v1/careers/filter-options');
    if (response.data.success) {
      filterOptions.industries = response.data.data.industries;
      filterOptions.employment_types = response.data.data.employment_types;
      filterOptions.self_employment = response.data.data.self_employment;
      filterOptions.degrees = response.data.data.degrees;
    }
  } catch (error) {
    console.error('Failed to load filter options:', error);
  } finally {
    loading.filterOptions = false;
  }
};

const fetchCareers = async () => {
  loading.careers = true;
  try {
    const params = {
      page: currentPage.value,
      sort: sortOption.value
    };
    
    // Add filters only if they have values
    if (filters.name) params.name = filters.name;
    if (filters.industry_ids.length) params.industry_ids = filters.industry_ids;
    if (filters.employment_types.length) params.employment_types = filters.employment_types;
    if (filters.self_employment) params.self_employment = filters.self_employment;
    if (filters.degree_ids.length) params.degree_ids = filters.degree_ids;
    
    const response = await axios.get('/api/v1/careers', { params });
    
    if (response.data.success) {
      careers.value = response.data.data;
      meta.value = response.data.meta;
    }
  } catch (error) {
    console.error('Failed to fetch careers:', error);
  } finally {
    loading.careers = false;
  }
};

const debouncedSearch = debounce(() => {
  currentPage.value = 1;
  fetchCareers();
}, 500);

const applyFilters = () => {
  currentPage.value = 1;
  fetchCareers();
};

const clearFilters = () => {
  filters.name = '';
  filters.industry_ids = [];
  filters.employment_types = [];
  filters.self_employment = null;
  filters.degree_ids = [];
  currentPage.value = 1;
  fetchCareers();
};

const changePage = (page) => {
  currentPage.value = page;
  fetchCareers();
};

const viewCareerDetails = (career) => {
  emit('career-selected', career);
};

const formatEmploymentType = (type) => {
  return filterOptions.employment_types[type] || type;
};
</script>

<style scoped>
.career-filter {
  display: flex;
  gap: 2rem;
}

.filter-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section-title {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
}

.filter-actions {
  margin-top: 1.5rem;
}

.filter-clear-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
}

.filter-clear-btn:hover {
  background-color: #e5e7eb;
}

.results-area {
  flex: 1;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.career-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.career-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.career-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.career-image {
  height: 150px;
  background-color: #f3f4f6;
}

.career-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.career-details {
  padding: 1rem;
}

.career-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.career-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.career-industry,
.career-employment {
  padding: 0.25rem 0.5rem;
  background-color: #f1f5f9;
  border-radius: 9999px;
}

.loading-placeholder,
.loading-results {
  color: #94a3b8;
}

.career-card-skeleton {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.skeleton-image {
  height: 150px;
  background-color: #f3f4f6;
  animation: pulse 1.5s infinite;
}

.skeleton-content {
  padding: 1rem;
}

.skeleton-title {
  height: 1.25rem;
  width: 80%;
  background-color: #f3f4f6;
  margin-bottom: 0.75rem;
  animation: pulse 1.5s infinite;
}

.skeleton-details {
  height: 1rem;
  width: 60%;
  background-color: #f3f4f6;
  animation: pulse 1.5s infinite;
}

.empty-results {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #64748b;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style> 