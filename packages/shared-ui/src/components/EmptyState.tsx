import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Inbox, PersonOff, SearchOff } from "@mui/icons-material";

interface EmptyStateProps {
  icon?: "inbox" | "users" | "search";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap = {
  inbox: Inbox,
  users: PersonOff,
  search: SearchOff,
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  action,
}) => {
  const IconComponent = iconMap[icon];

  return (
    <Box className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <IconComponent
        className="text-gray-300 dark:text-gray-600 mb-4"
        sx={{ fontSize: 80 }}
      />

      <Typography
        variant="h6"
        className="font-semibold mb-2 text-gray-600 dark:text-gray-400"
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          className="text-gray-500 dark:text-gray-500 mb-6 max-w-md"
        >
          {description}
        </Typography>
      )}

      {action && (
        <Button variant="outlined" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </Box>
  );
};
