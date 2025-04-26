import { get } from './api';

// Define types for the API responses
export interface Degree {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  // Add other properties as needed
}

export interface DegreesResponse {
  data: Degree[];
  total: number;
  // Add pagination or other metadata as needed
}

export interface DegreeFilterParams {
  q?: string;
  type?: string[];
  // Add other filter parameters as needed
}

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
      if (filters.q) {
        params.append('q', filters.q);
      }

      if (filters.type && filters.type.length > 0) {
        filters.type.forEach(type => {
          params.append('type[]', type);
        });
      }

      // Add other filters as needed
    }

    // Make the API request with the constructed query parameters
    const queryString = params.toString();
    const url = queryString ? `/degrees?${queryString}` : '/degrees';

    return await get<DegreesResponse>(url);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    // Return an empty response instead of throwing to make error handling easier
    return { data: [], total: 0 };
  }
};

/**
 * Fetch a single degree by slug
 * @param slug The slug of the degree to fetch
 * @returns Promise with the degree data
 */
export const fetchDegreeBySlug = async (slug: string): Promise<Degree | null> => {
  try {
    return await get<Degree>(`/degrees/${slug}`);
  } catch (error) {
    console.error(`Error fetching degree with slug ${slug}:`, error);
    return null;
  }
};
