import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersApi";
import { uiReducer } from "./slices/uiSlice";

export const createStore = () => {
  const store = configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      }).concat(usersApi.middleware),
    devTools: typeof window !== "undefined",
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
