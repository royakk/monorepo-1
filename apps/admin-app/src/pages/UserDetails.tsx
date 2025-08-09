import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { ArrowBack, Email, Person } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "@shared/store";
import { LoadingState, ErrorState } from "@shared/ui";

const UserDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserQuery(Number(id), {
    skip: !id || isNaN(Number(id)),
  });

  if (!id || isNaN(Number(id))) {
    return (
      <Container className="py-8">
        <ErrorState
          message={t("pages.userDetails.notFound")}
          severity="warning"
        />
      </Container>
    );
  }

  if (isLoading) {
    return <LoadingState message={t("pages.userDetails.loading")} />;
  }

  if (isError || !user) {
    return (
      <Container className="py-8">
        <Box className="mb-4">
          <Button
            component={Link}
            to="/users"
            startIcon={<ArrowBack />}
            variant="outlined"
            size="small"
          >
            {t("pages.userDetails.backToUsers")}
          </Button>
        </Box>
        <ErrorState
          message={t("pages.userDetails.error")}
          onRetry={() => refetch()}
          retryLabel={t("common.retry")}
        />
      </Container>
    );
  }

  return (
    <Container className="py-6 md:py-8 max-w-4xl">
      <Box className="mb-6">
        <Button
          component={Link}
          to="/users"
          startIcon={<ArrowBack />}
          variant="outlined"
          size="small"
          className="mb-4"
        >
          {t("pages.userDetails.backToUsers")}
        </Button>

        <Typography variant="h4" component="h1" className="font-bold">
          {t("pages.userDetails.title")}
        </Typography>
      </Box>

      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Box className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0"
            />

            <Box className="flex-1 text-center md:text-left">
              <Typography
                variant="h5"
                component="h2"
                className="font-semibold mb-2"
              >
                {user.name}
              </Typography>

              <Box className="flex flex-col md:flex-row gap-4 mb-4">
                <Box className="flex items-center justify-center md:justify-start gap-2">
                  <Person
                    className="text-gray-600 dark:text-gray-400"
                    fontSize="small"
                  />
                  <Typography
                    variant="body1"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    ID: {user.id}
                  </Typography>
                </Box>

                <Box className="flex items-center justify-center md:justify-start gap-2">
                  <Email
                    className="text-gray-600 dark:text-gray-400"
                    fontSize="small"
                  />
                  <Typography
                    variant="body1"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Divider className="my-4" />

              <Box className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 mb-2"
                >
                  Avatar URL
                </Typography>
                <Typography variant="body2" className="break-all">
                  {user.avatar}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default UserDetails;
