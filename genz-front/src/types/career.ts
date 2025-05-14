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

// Career detail interfaces for the new API endpoints
export interface CareerOverview {
  id: number;
  name: string;
  slug: string;
  image: string;
  salary: number;
  satisfaction: string;
  definition: string;
  duties: string[];
  workspace: string[];
  career_types: {
    name: string;
    description: string;
  }[];
}

export interface CareerHowToBecome {
  id: number;
  name: string;
  education_level: string;
  degrees: {
    id: number;
    name: string;
    slug: string;
    image_url: string;
  }[];
  education_levels: {
    level: string;
    description: string;
  }[];
  steps: {
    number: number;
    title: string;
    content: string;
    sub_steps: any[];
  }[];
  path_overview: string;
  path_structure_type: string;
  resources: {
    type: string;
    name: string;
    description: string;
    url: string | null;
  }[];
}

export interface CareerPersonality {
  id: number;
  name: string;
  personality_overview: {
    holland_summary: string;
    big_five_summary: string;
  };
  holland_codes: {
    code: string;
    value: number;
    description: string;
    order: number;
  }[];
  big_five_traits: {
    trait: string;
    value: number;
    description: string;
    order: number;
  }[];
}

export interface CareerWorkEnvironment {
  id: number;
  name: string;
  employment: {
    ease_of_employment: string;
    self_employment: string;
    employment_type: string;
  };
  workplaces: string[];
  work_schedule: {
    full_time_percent: number;
    part_time_percent: number;
    schedule_description: string;
  };
  environments: {
    type: string;
    description: string;
    value?: number;
  }[];
}

export interface CareerTechSkills {
  id: number;
  name: string;
  slug: string;
  technologies: {
    category: string;
    technologies: {
      tech_id: number;
      name: string;
      description: string;
      category: string | null;
      is_hot: boolean;
      is_in_demand: boolean;
      last_updated: string;
    }[];
  }[];
  skills: {
    element_id: string;
    element_name: string;
    skills: {
      skill_id: number;
      name: string;
      element_id: string;
      element_name: string;
      description: string;
      scale_id: string;
      scale_name: string;
      data_value: number;
      last_updated: string;
    }[];
  }[];
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

// Response interfaces for the career detail API endpoints
export interface CareerOverviewResponse {
  success: boolean;
  data: CareerOverview;
  meta: any;
  errors: any;
}

export interface CareerHowToBecomeResponse {
  success: boolean;
  data: CareerHowToBecome;
  meta: any;
  errors: any;
}

export interface CareerPersonalityResponse {
  success: boolean;
  data: CareerPersonality;
  meta: any;
  errors: any;
}

export interface CareerWorkEnvironmentResponse {
  success: boolean;
  data: CareerWorkEnvironment;
  meta: any;
  errors: any;
}

export interface CareerTechSkillsResponse {
  success: boolean;
  data: CareerTechSkills;
  meta: any;
  errors: any;
}
