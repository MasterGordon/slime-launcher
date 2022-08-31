import {createRoot} from 'react-dom/client';
import {api} from '#preload';
import {Box, ChakraProvider, Grid, HStack, Spacer} from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('app')!);

api.invoke('sum', {a: 1, b: 2}).then(sum => {
  console.log(sum);
});
root.render(
  <ChakraProvider>
    <Grid
      gridTemplateRows="4em 1fr"
      height="100vh"
    >
      <HStack background="gray.200">
        <Box>GLauncher</Box>
        <Spacer />
      </HStack>
    </Grid>
  </ChakraProvider>,
);
