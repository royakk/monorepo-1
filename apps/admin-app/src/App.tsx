import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  createStore,
  useAppDispatch,
  useAppSelector,
  initializeTheme,
} from "@shared/store";
import { createMuiTheme } from "./theme/muiTheme";
import { Header } from "@shared/ui";
import "./i18n";
const store = createStore();
const Users = lazy(() => import("./pages/Users"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);
  const muiTheme = createMuiTheme(theme);
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};
export default App;
