import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { queryClient } from "./hooks/main";

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={extendTheme(
          {
            config: {
              initialColorMode: "dark",
            },
          },
          withDefaultColorScheme({ colorScheme: "teal" }),
        )}
      >
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
