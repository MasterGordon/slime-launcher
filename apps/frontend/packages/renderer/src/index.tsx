import { createRoot } from "react-dom/client";
import { Grid, Heading, HStack, Spacer } from "@chakra-ui/react";
import App from "./App";
import LoginMenu from "./components/LoginMenu";
import Settings from "./components/Settings";
import AddInstance from "./components/AddInstance";
import Instances from "./components/Instances";
import "./reset/reset";
import "./reset/reset.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);

root.render(
  <App>
    <Grid gridTemplateRows="4em 1fr" height="100vh">
      <HStack background="gray.700" padding="2">
        <Heading marginLeft="2">Slime Launcher</Heading>
        <Spacer />
        <LoginMenu />
        <Settings />
      </HStack>
      <Instances />
    </Grid>
    <AddInstance />
  </App>,
);
