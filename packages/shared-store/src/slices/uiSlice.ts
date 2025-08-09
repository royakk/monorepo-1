import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS, DEFAULT_VALUES } from "../api/config";
import type { Theme, Locale, UiState } from "../types";

const getInitialState = (): UiState => {
  try {
    if (typeof window === "undefined") {
      return {
        theme: DEFAULT_VALUES.theme,
        locale: DEFAULT_VALUES.locale,
      };
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) as Theme;
    const savedLocale = localStorage.getItem(STORAGE_KEYS.locale) as Locale;

    return {
      theme: savedTheme || DEFAULT_VALUES.theme,
      locale: savedLocale || DEFAULT_VALUES.locale,
    };
  } catch {
    return {
      theme: DEFAULT_VALUES.theme,
      locale: DEFAULT_VALUES.locale,
    };
  }
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: getInitialState(),
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.theme, action.payload);

        if (action.payload === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.locale, action.payload);

        document.documentElement.dir = action.payload === "fa" ? "rtl" : "ltr";
        document.documentElement.lang = action.payload;
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        if (state.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        document.documentElement.dir = state.locale === "fa" ? "rtl" : "ltr";
        document.documentElement.lang = state.locale;
      }
    },
  },
});

export const { setTheme, setLocale, initializeTheme } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
