import {createRoot} from 'react-dom/client';
import {Box, Grid, HStack, Spacer} from '@chakra-ui/react';
import App from './App';
import {Acc} from './Acc';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('app')!);

root.render(
  <App>
    <Grid
      gridTemplateRows="4em 1fr"
      height="100vh"
    >
      <HStack background="gray.200">
        <Box>GLauncher</Box>
        <Spacer />
      </HStack>
      <Acc />
    </Grid>
  </App>,
);
