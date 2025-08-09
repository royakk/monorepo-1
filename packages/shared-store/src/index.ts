export { createStore } from "./store";
export type { RootState, AppDispatch, AppStore } from "./store";

export {
  useAppDispatch,
  useAppSelector,
  useGetUsersQuery,
  useGetUserQuery,
} from "./hooks";

export { setTheme, setLocale, initializeTheme } from "./slices/uiSlice";
export { uiSlice } from "./slices/uiSlice";

export type {
  User,
  Theme,
  Locale,
  UiState,
  PaginatedUsersResult,
  GetUsersParams,
} from "./types";

export { usersApi } from "./api/usersApi";

export { API_CONFIG, STORAGE_KEYS, DEFAULT_VALUES } from "./api/config";
