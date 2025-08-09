import React from "react";
import { Box, CircularProgress, Typography, Skeleton } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  variant?: "spinner" | "skeleton";
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  variant = "spinner",
  rows = 3,
}) => {
  if (variant === "skeleton") {
    return (
      <Box className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <Box key={index} className="flex items-center space-x-4">
            <Skeleton variant="circular" width={40} height={40} />
            <Box className="flex-1 space-y-2">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.875rem" }}
                width="60%"
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box className="flex justify-center items-center py-16">
      <CircularProgress className="mr-4" />
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        {message}
      </Typography>
    </Box>
  );
};
