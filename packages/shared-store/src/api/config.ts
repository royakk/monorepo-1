export const API_CONFIG = {
  baseUrl: "https://reqres.in/api",
  timeout: 10000,
  retries: 3,
} as const;

export const STORAGE_KEYS = {
  theme: "dashboard-theme",
  locale: "dashboard-locale",
} as const;

export const DEFAULT_VALUES = {
  theme: "light" as const,
  locale: "en" as const,
  pageSize: 6,
} as const;
