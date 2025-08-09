import React from "react";
import {
  IconButton,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  setTheme,
  type Theme,
} from "@shared/store";

interface ThemeSwitcherProps {
  variant?: "icon" | "toggle";
  size?: "small" | "medium" | "large";
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = "icon",
  size = "medium",
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  const handleThemeChange = (newTheme?: Theme) => {
    if (newTheme && newTheme !== theme) {
      dispatch(setTheme(newTheme));
    } else if (variant === "icon") {
      const toggledTheme: Theme = theme === "light" ? "dark" : "light";
      dispatch(setTheme(toggledTheme));
    }
  };

  if (variant === "toggle") {
    return (
      <ToggleButtonGroup
        value={theme}
        exclusive
        onChange={(_, newTheme) => handleThemeChange(newTheme)}
        size={size}
      >
        <ToggleButton value="light" aria-label={t("theme.light")}>
          <LightMode />
        </ToggleButton>
        <ToggleButton value="dark" aria-label={t("theme.dark")}>
          <DarkMode />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }

  return (
    <Tooltip title={t("nav.toggleTheme")}>
      <IconButton
        onClick={() => handleThemeChange()}
        color="inherit"
        size={size}
      >
        {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};
