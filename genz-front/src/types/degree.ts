// Define types for degree-related data

export interface Degree {
  degree_id: number;
  name: string;
  slug: string;
  degree_level: number;
  salary?: number;
  satisfaction?: string;
  image_url?: string;
  areas?: string[];
  description?: string;
  duration?: string;
  level?: string;
  image?: string;
}

export interface DegreeFilterParams {
  name?: string;
  area_names?: string[];
  area_codes?: string[];
  degree_level?: number;
  per_page?: number;
  page?: number;
}

export interface DegreesResponse {
  success: boolean;
  data: Degree[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  errors: any;
}

export interface FilterOption {
  name: string;
  id?: number;
}

export interface FilterOptionsResponse {
  success: boolean;
  data: {
    areas: FilterOption[];
    degree_levels: {
      id: number;
      name: string;
    }[];
  };
  meta: any;
  errors: any;
}
