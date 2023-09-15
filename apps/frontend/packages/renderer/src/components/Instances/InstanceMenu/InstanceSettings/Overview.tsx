import { Button, Code, Grid, Heading } from "@chakra-ui/react";
import Value from "../../../Value";
import { useInstance } from "../../InstanceProvider";

const Overview: React.FC = () => {
  const instance = useInstance();
  return (
    <Grid gridTemplateColumns="1fr 1fr min-content" gap="1em">
      <Heading size="md">Version</Heading>
      <Value>{instance.minecraftVersion}</Value>
      <Button variant="outline" isDisabled>
        Change
      </Button>
      <Heading size="md">Loader</Heading>
      <Value>{instance.loaderType ?? "None"}</Value>
      <Button variant="outline" isDisabled>
        Change
      </Button>
      <Heading size="md">Loader Version</Heading>
      <Value>{instance.loaderVersion ?? "None"}</Value>
      <Button variant="outline" isDisabled>
        Change
      </Button>
    </Grid>
  );
};

export default Overview;
