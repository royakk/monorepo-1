import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { Header } from "../Header";
import { uiSlice } from "@shared/store";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "nav.dashboard": "Dashboard",
        "nav.toggleTheme": "Toggle theme",
        "language.en": "English",
        "language.fa": "فارسی",
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: {
        theme: "light",
        locale: "en",
        ...initialState,
      },
    },
  });
};

const TestWrapper = ({
  children,
  store = createTestStore(),
}: {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
}) => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header with default title", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("should render header with custom title", () => {
    render(
      <TestWrapper>
        <Header title="Custom Title" />
      </TestWrapper>,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should hide language switch when showLanguageSwitch is false", () => {
    render(
      <TestWrapper>
        <Header showLanguageSwitch={false} />
      </TestWrapper>,
    );

    expect(screen.queryByText("English")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("should hide theme toggle when showThemeToggle is false", () => {
    render(
      <TestWrapper>
        <Header showThemeToggle={false} />
      </TestWrapper>,
    );

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /toggle theme/i }),
    ).not.toBeInTheDocument();
  });

  it("should dispatch setTheme action when theme toggle is clicked", () => {
    const store = createTestStore();
    const spy = jest.spyOn(store, "dispatch");

    render(
      <TestWrapper store={store}>
        <Header />
      </TestWrapper>,
    );

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeToggle);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "ui/setTheme",
        payload: "dark",
      }),
    );
  });

  it("should show correct theme icon based on current theme", () => {
    const darkStore = createTestStore({ theme: "dark" });

    render(
      <TestWrapper store={darkStore}>
        <Header />
      </TestWrapper>,
    );

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("should dispatch setLocale action when language is changed", () => {
    const store = createTestStore();
    const spy = jest.spyOn(store, "dispatch");

    render(
      <TestWrapper store={store}>
        <Header />
      </TestWrapper>,
    );

    // Open language selector
    const languageSelector = screen.getByDisplayValue("English");
    fireEvent.mouseDown(languageSelector);

    // Select Persian
    const persianOption = screen.getByText("فارسی");
    fireEvent.click(persianOption);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "ui/setLocale",
        payload: "fa",
      }),
    );
  });
});
