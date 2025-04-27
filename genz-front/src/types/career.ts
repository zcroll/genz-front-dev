// Define types for career-related data

export interface Career {
  id: number;
  name: string;
  slug: string;
  image?: string;
  salary?: number;
  satisfaction?: string;
  industries?: string[];
  ease_of_employment?: string;
  self_employment?: string;
  employment_type?: string;
  degrees?: string[];
}

export interface CareerFilterParams {
  name?: string;
  industry_ids?: number[];
  ease_of_employment?: string;
  self_employment?: string;
  employment_type?: string;
  degree_ids?: number[];
  per_page?: number;
  page?: number;
  sort?: string;
}

export interface CareersResponse {
  success: boolean;
  data: Career[];
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
  id: number;
  name: string;
}

export interface FilterOptionsResponse {
  success: boolean;
  data: {
    industries: FilterOption[];
    ease_of_employment: Record<string, string>;
    self_employment: Record<string, string>;
    employment_type: Record<string, string>;
    degrees: FilterOption[];
  };
  meta: any;
  errors: any;
}
