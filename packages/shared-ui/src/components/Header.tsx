import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Language,
  People,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  setTheme,
  setLocale,
  type Theme,
  type Locale,
} from "@shared/store";

interface HeaderProps {
  title?: string;
  titleKey?: string;
  showLanguageSwitch?: boolean;
  showThemeToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  titleKey = "nav.adminDashboard",
  showLanguageSwitch = true,
  showThemeToggle = true,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme, locale } = useAppSelector((state) => state.ui);

  const handleThemeToggle = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  const handleLocaleChange = (newLocale: Locale) => {
    dispatch(setLocale(newLocale));
    i18n.changeLanguage(newLocale);
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar className="px-4 md:px-6">
        <People className="mr-2" />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          {title || t(titleKey)}
        </Typography>

        <Box className="flex items-center gap-2">
          {showLanguageSwitch && (
            <FormControl size="small" variant="outlined">
              <Select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value as Locale)}
                className="min-w-[80px]"
                startAdornment={
                  <Language
                    className={
                      i18n.language === "fa"
                        ? "mx-8 text-gray-500"
                        : "mx-5 text-gray-500"
                    }
                    fontSize="small"
                  />
                }
              >
                <MenuItem value="en">{t("language.en")}</MenuItem>
                <MenuItem value="fa">{t("language.fa")}</MenuItem>
              </Select>
            </FormControl>
          )}

          {showThemeToggle && (
            <Tooltip title={t("nav.toggleTheme")}>
              <IconButton onClick={handleThemeToggle} color="inherit">
                {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
