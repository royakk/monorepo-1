import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/utils";
import { UserDetails } from "../UserDetails";
import * as storeHooks from "@shared/store";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

// Mock the useGetUserQuery hook
jest.mock("@shared/store", () => ({
  ...jest.requireActual("@shared/store"),
  useGetUserQuery: jest.fn(),
}));

const mockUseGetUserQuery = storeHooks.useGetUserQuery as jest.Mock;

describe("UserDetails Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<UserDetails />);

    expect(screen.getByText("Loading user...")).toBeInTheDocument();
  });

  it("should render error state with retry and back button", () => {
    const mockRefetch = jest.fn();
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    render(<UserDetails />);

    expect(screen.getByText("Failed to load user")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });

  it("should render user details successfully", async () => {
    const mockUser = {
      id: 1,
      name: "George Bluth",
      email: "george.bluth@reqres.in",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    };

    mockUseGetUserQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<UserDetails />);

    await waitFor(() => {
      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("George Bluth")).toBeInTheDocument();
      expect(screen.getByText("george.bluth@reqres.in")).toBeInTheDocument();
      expect(screen.getByText("ID: 1")).toBeInTheDocument();
      expect(screen.getByText("Avatar URL")).toBeInTheDocument();
      expect(
        screen.getByText("https://reqres.in/img/faces/1-image.jpg"),
      ).toBeInTheDocument();
      expect(screen.getByText("Back to Users")).toBeInTheDocument();
    });

    // Check that avatar image is present
    const avatar = screen.getByRole("img", { name: "George Bluth" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://reqres.in/img/faces/1-image.jpg",
    );
  });

  it("should render not found error for invalid ID", () => {
    // Mock useParams to return invalid ID
    jest.doMock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ id: "invalid" }),
    }));

    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<UserDetails />);

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });
});
