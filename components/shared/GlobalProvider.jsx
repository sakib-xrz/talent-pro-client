"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StoreProvider from "@/context/StoreProvider";
import { Toaster } from "../ui/sonner";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-right" richColors />
          {children}
        </QueryClientProvider>
      </StoreProvider>
    </>
  );
}
