import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type PropsWithChildren } from "react";
import { queryClient } from "./hooks/main";
import { onForceRevalidate } from "#preload";

const App: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    return onForceRevalidate((query) => {
      queryClient.invalidateQueries([query]);
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={extendTheme(
          {
            config: {
              initialColorMode: "dark",
            },
          },
          withDefaultColorScheme({ colorScheme: "green" }),
        )}
      >
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
