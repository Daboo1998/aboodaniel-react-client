import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useAuth } from "../../contexts/AuthContext";
import AuthContextProvider from "./AuthContextProvider";
import database from "../../data/database";

let mockAuthChangeHandler: ((user: any) => void) | undefined;

jest.mock("firebase/auth", () => ({}));

jest.mock("firebase/app", () => {
  const authInstance = {
    onAuthStateChanged: (handler: (user: any) => void) => {
      mockAuthChangeHandler = handler;
      return () => {};
    },
    setPersistence: jest.fn(() => Promise.resolve()),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };

  const auth = (() => authInstance) as any;

  auth.GoogleAuthProvider = jest.fn();
  auth.Auth = {
    Persistence: {
      LOCAL: "local",
      SESSION: "session",
    },
  };

  const firebaseMock = {
    auth,
  };

  return {
    __esModule: true,
    ...firebaseMock,
    default: firebaseMock,
  };
});

jest.mock("../../data/database", () => ({
  __esModule: true,
  default: {
    roles: {
      get: jest.fn(),
    },
  },
}));

const RoleStatus = () => {
  const { isDeveloper, isOwner, isLoggedIn } = useAuth();

  return (
    <div>
      <span data-testid="developer">{String(isDeveloper)}</span>
      <span data-testid="owner">{String(isOwner)}</span>
      <span data-testid="logged-in">{String(isLoggedIn)}</span>
    </div>
  );
};

describe("AuthContextProvider", () => {
  beforeEach(() => {
    mockAuthChangeHandler = undefined;
    jest.clearAllMocks();
  });

  it("ignores stale role results after logout", async () => {
    let resolveDeveloperRole: (value: { users: string[] }) => void = () => {};

    (database.roles.get as jest.Mock).mockImplementation((role: string) => {
      if (role === "developer") {
        return new Promise((resolve) => {
          resolveDeveloperRole = resolve;
        });
      }

      return Promise.resolve({ users: ["user-1"] });
    });

    render(
      <AuthContextProvider>
        <RoleStatus />
      </AuthContextProvider>
    );

    await act(async () => {
      mockAuthChangeHandler?.({ uid: "user-1", isAnonymous: false });
      mockAuthChangeHandler?.(null);
      resolveDeveloperRole({ users: ["user-1"] });
    });

    await waitFor(() => {
      expect(screen.getByTestId("logged-in")).toHaveTextContent("false");
      expect(screen.getByTestId("developer")).toHaveTextContent("false");
      expect(screen.getByTestId("owner")).toHaveTextContent("false");
    });
  });
});
