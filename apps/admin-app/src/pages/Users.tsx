import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
  Chip,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUsersQuery } from "@shared/store";
import { LoadingState, ErrorState, EmptyState } from "@shared/ui";

const Users: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetUsersQuery({ page });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <LoadingState
        message={t("pages.users.loading")}
        variant="skeleton"
        rows={6}
      />
    );
  }

  if (isError) {
    return (
      <Container className="py-8">
        <ErrorState
          message={t("pages.users.error")}
          onRetry={() => refetch()}
          retryLabel={t("common.retry")}
        />
      </Container>
    );
  }

  if (!data?.users || data.users.length === 0) {
    return (
      <Container className="py-8">
        <EmptyState
          icon="users"
          title={t("pages.users.noUsers")}
          description="No users have been found. Please try again later."
        />
      </Container>
    );
  }

  return (
    <Container className="py-6 md:py-8 max-w-6xl">
      <Box className="mb-6">
        <Typography variant="h4" component="h1" className="font-bold mb-2">
          {t("pages.users.title")}
        </Typography>
        <Chip
          label={`${data.total} ${t("nav.users").toLowerCase()}`}
          variant="outlined"
          size="small"
        />
      </Box>

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">
                {t("pages.users.table.name")}
              </TableCell>
              <TableCell className="font-semibold">
                {t("pages.users.table.email")}
              </TableCell>
              <TableCell align="center" className="font-semibold">
                {t("pages.users.table.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => (
              <TableRow key={user.id} hover className="transition-colors">
                <TableCell>
                  <Box className="flex items-center gap-3">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10"
                    />
                    <Typography variant="body1" className="font-medium">
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/users/${user.id}`}
                    color="primary"
                    size="small"
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {data.totalPages > 1 && (
        <Box className="flex justify-center mt-6">
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};
export default Users;
