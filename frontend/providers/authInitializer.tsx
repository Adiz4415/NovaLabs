"use client";
import { useAuthInit } from "@/lib/hooks/useAuthInit";
import { ReactNode } from "react";

interface AuthInitializerProviderProps {
  children: ReactNode;
}

/**
 * Provider that initializes authentication state on app mount.
 * Calls useAuthInit to restore the user session from localStorage/cookies.
 * Must be placed inside ReactQueryProvider in the provider tree.
 */
export const AuthInitializerProvider = ({
  children,
}: AuthInitializerProviderProps) => {
  useAuthInit(); // triggers auth initialization on mount

  return <>{children}</>; // renders nothing extra
};
