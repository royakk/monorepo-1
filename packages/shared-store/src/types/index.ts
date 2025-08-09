// User types
export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
}

export interface UserResponse {
  data: ReqresUser;
}

// UI types
export type Theme = "light" | "dark";
export type Locale = "en" | "fa";

export interface UiState {
  theme: Theme;
  locale: Locale;
}

// API types
export interface PaginatedUsersResult {
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUsersParams {
  page?: number;
}
