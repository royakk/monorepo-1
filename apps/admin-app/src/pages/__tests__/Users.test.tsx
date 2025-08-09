import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/utils";
import { Users } from "../Users";
import * as storeHooks from "@shared/store";

// Mock the useGetUsersQuery hook
jest.mock("@shared/store", () => ({
  ...jest.requireActual("@shared/store"),
  useGetUsersQuery: jest.fn(),
}));

const mockUseGetUsersQuery = storeHooks.useGetUsersQuery as jest.Mock;

describe("Users Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    mockUseGetUsersQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<Users />);

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("should render error state with retry button", () => {
    const mockRefetch = jest.fn();
    mockUseGetUsersQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    render(<Users />);

    expect(screen.getByText("Failed to load users")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("should render empty state when no users", () => {
    mockUseGetUsersQuery.mockReturnValue({
      data: { users: [], total: 0, totalPages: 0 },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<Users />);

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("should render users list successfully", async () => {
    const mockUsers = {
      users: [
        {
          id: 1,
          name: "George Bluth",
          email: "george.bluth@reqres.in",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          name: "Janet Weaver",
          email: "janet.weaver@reqres.in",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
      ],
      total: 12,
      totalPages: 2,
    };

    mockUseGetUsersQuery.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("12 users")).toBeInTheDocument();
      expect(screen.getByText("George Bluth")).toBeInTheDocument();
      expect(screen.getByText("Janet Weaver")).toBeInTheDocument();
      expect(screen.getByText("george.bluth@reqres.in")).toBeInTheDocument();
      expect(screen.getByText("janet.weaver@reqres.in")).toBeInTheDocument();
    });

    // Check that view details buttons are present
    const viewButtons = screen.getAllByRole("button", {
      name: /view details/i,
    });
    expect(viewButtons).toHaveLength(2);
  });

  it("should render pagination when multiple pages", async () => {
    const mockUsers = {
      users: [
        {
          id: 1,
          name: "George Bluth",
          email: "george.bluth@reqres.in",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
      ],
      total: 12,
      totalPages: 2,
    };

    mockUseGetUsersQuery.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<Users />);

    await waitFor(() => {
      // Check if pagination is present
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
