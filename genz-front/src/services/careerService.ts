import { get } from './api';
import type {
  Career,
  CareersResponse,
  CareerFilterParams,
  FilterOptionsResponse,
  CareerOverviewResponse,
  CareerHowToBecomeResponse,
  CareerPersonalityResponse,
  CareerWorkEnvironmentResponse
} from '../types/career';

/**
 * Fetch all careers with optional filtering
 * @param filters Optional filters to apply to the request
 * @returns Promise with the careers response
 */
export const fetchCareers = async (filters?: CareerFilterParams): Promise<CareersResponse> => {
  try {
    // Convert filters to query parameters
    const params = new URLSearchParams();

    if (filters) {
      if (filters.name) {
        params.append('name', filters.name);
      }

      if (filters.industry_ids && filters.industry_ids.length > 0) {
        filters.industry_ids.forEach(id => {
          params.append('industry_ids[]', id.toString());
        });
      }

      if (filters.ease_of_employment) {
        params.append('ease_of_employment', filters.ease_of_employment);
      }

      if (filters.self_employment) {
        params.append('self_employment', filters.self_employment);
      }

      if (filters.employment_type) {
        params.append('employment_type', filters.employment_type);
      }

      if (filters.degree_ids && filters.degree_ids.length > 0) {
        filters.degree_ids.forEach(id => {
          params.append('degree_ids[]', id.toString());
        });
      }

      if (filters.sort) {
        params.append('sort', filters.sort);
      }

      if (filters.per_page) {
        params.append('per_page', filters.per_page.toString());
      }

      if (filters.page) {
        params.append('page', filters.page.toString());
      }
    }

    // Make the API request with the constructed query parameters
    const queryString = params.toString();
    const url = queryString ? `/careers?${queryString}` : '/careers';

    console.log(`Making request to: ${url}`);
    const response = await get<CareersResponse>(url);
    return response;
  } catch (error) {
    console.error('Error fetching careers:', error);

    // Log more detailed information about the error
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    // Return an empty response instead of throwing to make error handling easier
    return {
      success: false,
      data: [],
      meta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        per_page: 15,
        to: 0,
        total: 0
      },
      errors: error
    };
  }
};

/**
 * Fetch a single career by slug
 * @param slug The slug of the career to fetch
 * @returns Promise with the career data
 */
export const fetchCareerBySlug = async (slug: string): Promise<Career | null> => {
  try {
    const response = await get<{ success: boolean, data: Career }>(`/careers/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching career with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Fetch career overview information by slug
 * @param slug The slug of the career to fetch
 * @returns Promise with the career overview data
 */
export const fetchCareerOverview = async (slug: string): Promise<CareerOverviewResponse> => {
  try {
    const response = await get<CareerOverviewResponse>(`/careers/${slug}/detail/overview`);
    return response;
  } catch (error) {
    console.error(`Error fetching career overview for ${slug}:`, error);
    return {
      success: false,
      data: null,
      meta: null,
      errors: error
    };
  }
};

/**
 * Fetch career how-to-become information by slug
 * @param slug The slug of the career to fetch
 * @returns Promise with the career how-to-become data
 */
export const fetchCareerHowToBecome = async (slug: string): Promise<CareerHowToBecomeResponse> => {
  try {
    const response = await get<CareerHowToBecomeResponse>(`/careers/${slug}/detail/how-to-become`);
    return response;
  } catch (error) {
    console.error(`Error fetching career how-to-become for ${slug}:`, error);
    return {
      success: false,
      data: null,
      meta: null,
      errors: error
    };
  }
};

/**
 * Fetch career personality information by slug
 * @param slug The slug of the career to fetch
 * @returns Promise with the career personality data
 */
export const fetchCareerPersonality = async (slug: string): Promise<CareerPersonalityResponse> => {
  try {
    const response = await get<CareerPersonalityResponse>(`/careers/${slug}/detail/personality`);
    return response;
  } catch (error) {
    console.error(`Error fetching career personality for ${slug}:`, error);
    return {
      success: false,
      data: null,
      meta: null,
      errors: error
    };
  }
};

/**
 * Fetch career work environment information by slug
 * @param slug The slug of the career to fetch
 * @returns Promise with the career work environment data
 */
export const fetchCareerWorkEnvironment = async (slug: string): Promise<CareerWorkEnvironmentResponse> => {
  try {
    const response = await get<CareerWorkEnvironmentResponse>(`/careers/${slug}/detail/work-environment`);
    return response;
  } catch (error) {
    console.error(`Error fetching career work environment for ${slug}:`, error);
    return {
      success: false,
      data: null,
      meta: null,
      errors: error
    };
  }
};

/**
 * Fetch available filter options for careers
 * @returns Promise with the filter options
 */
export const fetchCareerFilterOptions = async (): Promise<FilterOptionsResponse> => {
  try {
    const response = await get<FilterOptionsResponse>('/careers/filter-options');
    return response;
  } catch (error) {
    console.error('Error fetching career filter options:', error);
    // Return an empty response instead of throwing
    return {
      success: false,
      data: {
        industries: [],
        ease_of_employment: {},
        self_employment: {},
        employment_type: {},
        degrees: []
      },
      meta: null,
      errors: error
    };
  }
};
