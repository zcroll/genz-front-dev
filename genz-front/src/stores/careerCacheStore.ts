import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number; // Expiry time in milliseconds
}

interface CacheMap {
  [endpoint: string]: {
    [key: string]: CacheEntry<any>;
  };
}

export const useCareerCacheStore = defineStore('careerCache', () => {
  // Cache storage for all API requests
  const cache = ref<CacheMap>({});
  
  // Default expiry time - 5 minutes
  const DEFAULT_EXPIRY = 5 * 60 * 1000;
  
  // Create a cache key from parameters
  const createCacheKey = (params: any): string => {
    if (typeof params === 'string') return params;
    return JSON.stringify(params);
  };
  
  // Set data in cache
  const setCacheData = <T>(endpoint: string, params: any, data: T, expiry = DEFAULT_EXPIRY) => {
    const key = createCacheKey(params);
    
    if (!cache.value[endpoint]) {
      cache.value[endpoint] = {};
    }
    
    cache.value[endpoint][key] = {
      data,
      timestamp: Date.now(),
      expiry
    };
  };
  
  // Check if cache entry exists and is valid
  const hasCacheData = (endpoint: string, params: any): boolean => {
    const key = createCacheKey(params);
    
    if (!cache.value[endpoint] || !cache.value[endpoint][key]) {
      return false;
    }
    
    const entry = cache.value[endpoint][key];
    return Date.now() - entry.timestamp < entry.expiry;
  };
  
  // Get cached data
  const getCacheData = <T>(endpoint: string, params: any): T | null => {
    const key = createCacheKey(params);
    
    if (!hasCacheData(endpoint, params)) {
      return null;
    }
    
    return cache.value[endpoint][key].data as T;
  };
  
  // Clear a specific cache entry
  const clearCacheEntry = (endpoint: string, params: any) => {
    const key = createCacheKey(params);
    
    if (cache.value[endpoint] && cache.value[endpoint][key]) {
      delete cache.value[endpoint][key];
    }
  };
  
  // Clear all entries for an endpoint
  const clearEndpointCache = (endpoint: string) => {
    if (cache.value[endpoint]) {
      cache.value[endpoint] = {};
    }
  };
  
  // Clear all cache
  const clearAllCache = () => {
    cache.value = {};
  };
  
  // Helper to get or fetch data with caching
  const getOrFetchData = async <T>(
    endpoint: string, 
    params: any, 
    fetchFunction: () => Promise<T>,
    expiry = DEFAULT_EXPIRY
  ): Promise<T> => {
    // Check cache first
    if (hasCacheData(endpoint, params)) {
      return getCacheData<T>(endpoint, params) as T;
    }
    
    // If not in cache or expired, fetch fresh data
    const data = await fetchFunction();
    setCacheData(endpoint, params, data, expiry);
    
    return data;
  };
  
  return {
    cache,
    setCacheData,
    hasCacheData,
    getCacheData,
    clearCacheEntry,
    clearEndpointCache,
    clearAllCache,
    getOrFetchData
  };
});