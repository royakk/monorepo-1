import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
} from "@mui/material";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  setLocale,
  type Locale,
} from "@shared/store";

interface LanguageSwitcherProps {
  variant?: "select" | "toggle" | "buttons";
  size?: "small" | "medium";
  showLabel?: boolean;
  showIcon?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "select",
  size = "medium",
  showLabel = false,
  showIcon = true,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector((state) => state.ui);

  const handleLocaleChange = (newLocale: Locale) => {
    dispatch(setLocale(newLocale));
    i18n.changeLanguage(newLocale);
  };

  if (variant === "toggle") {
    return (
      <ToggleButtonGroup
        value={locale}
        exclusive
        onChange={(_, newLocale) => newLocale && handleLocaleChange(newLocale)}
        size={size}
      >
        <ToggleButton value="en" aria-label={t("language.en")}>
          EN
        </ToggleButton>
        <ToggleButton value="fa" aria-label={t("language.fa")}>
          فا
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }

  if (variant === "buttons") {
    return (
      <Box className="flex items-center gap-2">
        {showIcon && <Language fontSize="small" className="text-gray-500" />}
        <Box className="flex gap-1">
          <Typography
            component="button"
            onClick={() => handleLocaleChange("en")}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              locale === "en"
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            EN
          </Typography>
          <Typography
            component="button"
            onClick={() => handleLocaleChange("fa")}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              locale === "fa"
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            فا
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <FormControl size={size} variant="outlined">
      {showLabel && <InputLabel>{t("nav.language")}</InputLabel>}
      <Select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="min-w-[80px]"
        startAdornment={
          showIcon ? (
            <Language className="ml-1 text-gray-500" fontSize="small" />
          ) : undefined
        }
        label={showLabel ? t("nav.language") : undefined}
      >
        <MenuItem value="en">{t("language.en")}</MenuItem>
        <MenuItem value="fa">{t("language.fa")}</MenuItem>
      </Select>
    </FormControl>
  );
};
