"use client";

import ReactQueryProvider from "./ReactQueryProvider";
import { AuthInitializerProvider } from "./authInitializer"; // import the new provider

/**
 * Root provider tree for the NovaLabs frontend.
 * Composes ReactQueryProvider (for data fetching) and AuthInitializerProvider
 * (for session restoration) in the correct order.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthInitializerProvider>{children}</AuthInitializerProvider>
    </ReactQueryProvider>
  );
}
