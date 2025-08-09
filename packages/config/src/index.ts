export const API_BASE_URL = "https://reqres.in/api";

export const DEFAULT_THEME = "light" as const;
export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = ["en", "fa"] as const;
export const SUPPORTED_THEMES = ["light", "dark"] as const;

export const STORAGE_KEYS = {
  theme: "dashboard-theme",
  locale: "dashboard-locale",
} as const;
