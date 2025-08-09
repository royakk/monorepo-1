import { createTheme, ThemeOptions } from "@mui/material/styles";
import type { Theme } from "@shared/store";

export const createMuiTheme = (mode: Theme) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: mode === "dark" ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#ffffff",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: mode === "dark" ? "#2b2b2b" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: mode === "dark" ? "#555" : "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: mode === "dark" ? "#777" : "#555",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#2c2c2c" : "#f5f5f5",
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};
