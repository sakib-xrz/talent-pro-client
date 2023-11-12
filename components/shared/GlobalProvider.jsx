"use client";

import store from "@/redux/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </QueryClientProvider>
      </Provider>
    </>
  );
}
