import React from "react";
import { Alert, AlertTitle, Button, Box } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  severity?: "error" | "warning";
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  retryLabel = "Retry",
  severity = "error",
}) => {
  return (
    <Box className="p-4">
      <Alert
        severity={severity}
        action={
          onRetry ? (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<Refresh />}
            >
              {retryLabel}
            </Button>
          ) : undefined
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
};
