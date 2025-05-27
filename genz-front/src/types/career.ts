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

// Nested types for CareerHowToBecome
export interface AdmissionRequirementsType {
  previous_education: string;
  minimum_score: string | null; // Can be "N/A" or other string, or null
  entrance_exam: boolean | null;
  language_requirements: string[] | null;
}

export interface ProgramType {
  program_id: string;
  program_name: string;
  degree_level: string;
  duration_years: number;
  admission_requirements: AdmissionRequirementsType | null; // Now explicitly nullable
  curriculum_strength: string | null;
  industry_connections: string | null;
  certification: {
    degree_awarded: string;
    recognition_level: string;
  } | null;
  career_outcomes: string[] | null;
}

export interface InstitutionType {
  institution_id: string;
  name: string;
  tier: string;
  location: string;
  public_or_private: string;
  language_of_instruction: string[]; // Assuming this is always present if institution is detailed
  admission_competitiveness: string | null;
  programs: ProgramType[] | null;
}

export interface AcademicPathway {
  pathway_id: string;
  pathway_name: string;
  rank: number;
  ranking_reason: string;
  description: string;
  duration_years: number;
  estimated_total_cost_MAD: number;
  institutions: InstitutionType[]; // institutions array can be empty
  similar_structure_to_P1: boolean | null;
}

export interface ComparisonFactorValue {
  factor: string;
  [key: string]: string; // For P1_value, P2_value etc.
}

export interface ProgressionOpportunityItem {
  from_pathway_id: string;
  options?: string[]; // For further education
  typical_progression?: string[]; // For career advancement
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
  career: string;
  country: string;
  pathway_ranking_criteria: string[];
  academic_pathways: AcademicPathway[];
  pathway_comparisons: {
    comparison_factors: ComparisonFactorValue[];
  }[];
  progression_opportunities: {
    further_education: ProgressionOpportunityItem[] | null;
    career_advancement: ProgressionOpportunityItem[] | null;
  };
  career_id: number;
  industries: {
    industry_id: number;
    industry_name: string;
  }[];
  education_level: string;
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
  data: CareerOverview | null;
  meta: any;
  errors: any;
}

export interface CareerHowToBecomeResponse {
  success: boolean;
  data: CareerHowToBecome | null;
  meta: any;
  errors: any;
}

export interface CareerPersonalityResponse {
  success: boolean;
  data: CareerPersonality | null;
  meta: any;
  errors: any;
}

export interface CareerWorkEnvironmentResponse {
  success: boolean;
  data: CareerWorkEnvironment | null;
  meta: any;
  errors: any;
}

export interface CareerTechSkillsResponse {
  success: boolean;
  data: CareerTechSkills | null;
  meta: any;
  errors: any;
}

export interface CareerNavigationItem {
  name: string;
  uri: string;
  available: boolean;
  key: string;
}

export interface CareerNavigation {
  id: number;
  name: string;
  slug: string;
  navigation: CareerNavigationItem[];
}

export interface CareerNavigationResponse {
  success: boolean;
  data: CareerNavigation | null;
  meta: any;
  errors: any;
}
