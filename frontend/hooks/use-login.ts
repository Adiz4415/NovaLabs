import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "sonner";

type LoginBody = {
  email: string;
  password: string;
  rememberMe: boolean;
};

/**
 * Hook that encapsulates the login flow for the NovaLabs frontend.
 * Calls the auth store's login action, shows a toast on success/error,
 * and redirects the user to the intended page (or /dashboard by default).
 *
 * @returns An object with `login` handler and `loading` state
 */
export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (payload: LoginBody) => {
    setLoading(true);

    try {
      await login({ email: payload.email, password: payload.password });

      toast.success("Login successful");

      const redirect = searchParams.get("redirect");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { login: handleLogin, loading };
}
