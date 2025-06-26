import { get } from './api';
import type { Degree, DegreesResponse, DegreeFilterParams, FilterOptionsResponse } from '../types/degree';

/**
 * Fetch all degrees with optional filtering
 * @param filters Optional filters to apply to the request
 * @returns Promise with the degrees response
 */
export const fetchDegrees = async (filters?: DegreeFilterParams): Promise<DegreesResponse> => {
  try {
    // Convert filters to query parameters
    const params = new URLSearchParams();

    if (filters) {
      if (filters.name) {
        params.append('name', filters.name);
      }

      if (filters.area_names && filters.area_names.length > 0) {
        filters.area_names.forEach(area => {
          params.append('area_names[]', area);
        });
      }

      if (filters.area_codes && filters.area_codes.length > 0) {
        filters.area_codes.forEach(code => {
          params.append('area_codes[]', code);
        });
      }

      if (filters.degree_level) {
        params.append('degree_level', filters.degree_level.toString());
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
    const url = queryString ? `/degrees?${queryString}` : '/degrees';

    console.log(`Making request to: ${url}`);
    const response = await get<DegreesResponse>(url);
    return response;
  } catch (error) {
    console.error('Error fetching degrees:', error);

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
 * Fetch a single degree by slug
 * @param slug The slug of the degree to fetch
 * @returns Promise with the degree data
 */
export const fetchDegreeBySlug = async (slug: string): Promise<Degree | null> => {
  try {
    const response = await get<{ success: boolean, data: Degree }>(`/degrees/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching degree with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Fetch available filter options for degrees
 * @returns Promise with the filter options
 */
export const fetchDegreeFilterOptions = async (): Promise<FilterOptionsResponse> => {
  try {
    const response = await get<FilterOptionsResponse>('/degrees/filter-options');
    return response;
  } catch (error) {
    console.error('Error fetching degree filter options:', error);
    // Return an empty response instead of throwing
    return {
      success: false,
      data: {
        areas: [],
        degree_levels: []
      },
      meta: null,
      errors: error
    };
  }
};
