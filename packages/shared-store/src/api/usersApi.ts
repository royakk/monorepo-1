import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "./config";
import type {
  User,
  ReqresUser,
  UsersResponse,
  UserResponse,
  PaginatedUsersResult,
  GetUsersParams,
} from "../types";

const transformUser = (reqresUser: ReqresUser): User => ({
  id: reqresUser.id,
  email: reqresUser.email,
  name: `${reqresUser.first_name} ${reqresUser.last_name}`,
  avatar: reqresUser.avatar,
});

// Mock data as fallback
const mockUsers: User[] = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    name: "George Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    name: "Janet Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    name: "Emma Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    name: "Eve Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    name: "Charles Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    name: "Tracey Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
];

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    mode: "cors",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUsersResult, GetUsersParams>({
      queryFn: async ({ page = 1 } = {}) => {
        try {
          const response = await fetch(
            `https://reqres.in/api/users?page=${page}`,
            {
              headers: {
                "x-api-key": "reqres-free-v1",
              },
            },
          );
          if (response.ok) {
            const data: UsersResponse = await response.json();
            return {
              data: {
                users: data.data.map(transformUser),
                total: data.total,
                totalPages: data.total_pages,
                currentPage: page,
              },
            };
          }
        } catch (error) {
          console.warn("API failed, using mock data:", error);
        }

        // Fallback to mock data
        const pageSize = 6;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = mockUsers.slice(startIndex, endIndex);

        return {
          data: {
            users: paginatedUsers,
            total: mockUsers.length,
            totalPages: Math.ceil(mockUsers.length / pageSize),
            currentPage: page,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query<User, number>({
      queryFn: async (id) => {
        try {
          const response = await fetch(`https://reqres.in/api/users/${id}`, {
            headers: {
              "x-api-key": "reqres-free-v1",
            },
          });
          if (response.ok) {
            const data: UserResponse = await response.json();
            return { data: transformUser(data.data) };
          }
        } catch (error) {
          console.warn("API failed, using mock data:", error);
        }

        // Fallback to mock data
        const user = mockUsers.find((u) => u.id === id);
        if (user) {
          return { data: user };
        }

        return { error: { status: 404, data: "User not found" } };
      },
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApi;
