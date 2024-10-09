import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface GlobalProviderProps {
  children?: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
