"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserProvider from "@/context/UserProvider";

import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}
