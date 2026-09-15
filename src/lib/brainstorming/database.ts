export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface BrainstormingDatabase {
  brainstorming: {
    Tables: {
      sources: {
        Row: {
          id: string;
          slug: string;
          name: string;
          homepage_url: string;
          status: "pending" | "approved" | "paused" | "blocked" | "retired";
          robots_txt_url: string | null;
          robots_checked_at: string | null;
          permission_status: "unknown" | "allowed" | "limited" | "denied";
          permission_notes: string | null;
          allowed_content: Json;
          attribution_template: string;
          crawl_delay_seconds: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["sources"]["Row"]> & {
          slug: string;
          name: string;
          homepage_url: string;
        };
        Update: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["sources"]["Row"]>;
      };
      projects: {
        Row: {
          id: string;
          source_id: string;
          source_project_id: string | null;
          source_url: string;
          canonical_url: string | null;
          title: string;
          title_i18n: Json;
          designer: string | null;
          collaborators: string[];
          location: string | null;
          country: string | null;
          latitude: number | null;
          longitude: number | null;
          year_completed: number | null;
          description_snippet: string | null;
          description_i18n: Json;
          source_published_at: string | null;
          source_accessed_at: string;
          attribution: string;
          status: "draft" | "needs_review" | "published" | "archived";
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["projects"]["Row"]> & {
          source_id: string;
          source_url: string;
          title: string;
          attribution: string;
        };
        Update: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["projects"]["Row"]>;
      };
      project_ai_metadata: {
        Row: {
          project_id: string;
          typology: string | null;
          landscape_typology: string | null;
          materials: string[];
          planting_style: string | null;
          atmosphere: string | null;
          climate: string | null;
          colour_palette: string[];
          project_scale: string | null;
          spatial_character: string | null;
          design_elements: string[];
          sustainability_features: string[];
          nature_based_solutions: string[];
          biodiversity_strategies: string[];
          accessibility_features: string[];
          public_health_themes: string[];
          environmental_themes: string[];
          gis_spatial_analysis_themes: string[];
          client_facing_keywords: string[];
          ai_summary: string | null;
          ai_model: string | null;
          confidence: number | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["project_ai_metadata"]["Row"]> & {
          project_id: string;
        };
        Update: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["project_ai_metadata"]["Row"]>;
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          source_id: string;
          image_url: string;
          thumbnail_url: string | null;
          alt_text: string | null;
          caption: string | null;
          credit: string;
          license_notes: string | null;
          permission_status: "unknown" | "allowed" | "limited" | "denied";
          status: "pending" | "approved" | "blocked";
          width: number | null;
          height: number | null;
          dominant_colours: string[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["project_images"]["Row"]> & {
          project_id: string;
          source_id: string;
          image_url: string;
          credit: string;
        };
        Update: Partial<BrainstormingDatabase["brainstorming"]["Tables"]["project_images"]["Row"]>;
      };
    };
    Functions: {
      match_projects: {
        Args: {
          query_embedding: string;
          match_count?: number;
          similarity_threshold?: number;
          metadata_filter?: Json;
        };
        Returns: {
          project_id: string;
          similarity: number;
          title: string;
          designer: string | null;
          location: string | null;
          source_url: string;
          thumbnail_url: string | null;
          metadata: Json;
        }[];
      };
    };
  };
}
