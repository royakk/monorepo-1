import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../usersApi";

// Mock fetch
global.fetch = jest.fn();

const createTestStore = () => {
  return configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
};

describe("usersApi", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should fetch users successfully from API", async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            email: "george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
          },
        ],
        total: 12,
        total_pages: 2,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await store.dispatch(
        usersApi.endpoints.getUsers.initiate({ page: 1 }),
      );

      expect(fetch).toHaveBeenCalledWith(
        "https://reqres.in/api/users?page=1",
        expect.objectContaining({
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }),
      );

      expect(result.data).toEqual({
        users: [
          {
            id: 1,
            email: "george.bluth@reqres.in",
            name: "George Bluth",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
          },
        ],
        total: 12,
        totalPages: 2,
        currentPage: 1,
      });
    });

    it("should fallback to mock data when API fails", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await store.dispatch(
        usersApi.endpoints.getUsers.initiate({ page: 1 }),
      );

      expect(result.data?.users).toHaveLength(6); // Mock data has 6 users
      expect(result.data?.total).toBe(6);
      expect(result.data?.currentPage).toBe(1);
    });
  });

  describe("getUser", () => {
    it("should fetch single user successfully from API", async () => {
      const mockResponse = {
        data: {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await store.dispatch(
        usersApi.endpoints.getUser.initiate(1),
      );

      expect(fetch).toHaveBeenCalledWith(
        "https://reqres.in/api/users/1",
        expect.objectContaining({
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }),
      );

      expect(result.data).toEqual({
        id: 1,
        email: "george.bluth@reqres.in",
        name: "George Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      });
    });

    it("should fallback to mock data when API fails", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await store.dispatch(
        usersApi.endpoints.getUser.initiate(1),
      );

      expect(result.data?.id).toBe(1);
      expect(result.data?.name).toBe("George Bluth");
    });

    it("should return error for non-existent user in mock data", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await store.dispatch(
        usersApi.endpoints.getUser.initiate(999),
      );

      expect(result.error).toEqual({
        status: 404,
        data: "User not found",
      });
    });
  });
});
