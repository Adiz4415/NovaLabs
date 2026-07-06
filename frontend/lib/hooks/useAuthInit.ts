"use client";

import { useEffect } from "react";
import { useAuthActions } from "../store/authStore";

/**
 * Initializes authentication state from persistent storage on app mount.
 * Reads the stored access token and user object from localStorage/cookies
 * and hydrates the Zustand auth store. Called once by AuthInitializerProvider.
 */
export const useAuthInit = () => {
  const { initializeAuth } = useAuthActions();

  useEffect(() => {
    initializeAuth(); // loads token + user from storage into Zustand
  }, [initializeAuth]);
};
