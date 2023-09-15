import type { ButtonProps } from "@chakra-ui/react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  Grid,
  Icon,
} from "@chakra-ui/react";
import type { Instance } from "@slime-launcher/piston";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { useMainMutation } from "../../hooks/main";
import InstanceMenu from "./InstanceMenu/InstanceMenu";
import { useInstance } from "./InstanceProvider";

const buttonLabelByStatus: Record<
  Instance["state"]["status"],
  ButtonProps["children"]
> = {
  idle: "Play",
  running: "Stop",
  launching: "Launching",
  installing: "Installing",
};

const iconByStatus: Record<
  Instance["state"]["status"],
  ButtonProps["leftIcon"]
> = {
  idle: <Icon as={FaPlayCircle} />,
  running: <Icon as={FaStopCircle} />,
  launching: (
    <CircularProgress
      isIndeterminate
      size="16px"
      color="black"
      thickness="18px"
    />
  ),
  installing: (
    <CircularProgress
      isIndeterminate
      size="16px"
      color="black"
      thickness="18px"
    />
  ),
};

const InstanceCard: React.FC = (props) => {
  const launch = useMainMutation("launchInstance");
  const kill = useMainMutation("killInstance");
  const instance = useInstance();

  const onClick = () => {
    if (instance.state.status === "running") {
      kill.mutateAsync(instance.path);
      return;
    }
    if (instance.state.status === "idle") {
      launch.mutateAsync(instance.path);
      return;
    }
  };

  const buttonIcon = iconByStatus[instance.state.status];
  const buttonLabel = buttonLabelByStatus[instance.state.status];

  return (
    <Grid
      width="180px"
      height="150px"
      background="green.500"
      borderRadius="lg"
      gridTemplateRows="1fr min-content"
      gridTemplateColumns="1fr"
      position="relative"
    >
      <Center fontSize="lg" textAlign="center">
        {instance.name}
      </Center>
      <Box position="absolute" right="2" top="2" fontSize="sm" color="gray.700">
        {instance.minecraftVersion}
      </Box>
      <ButtonGroup isAttached width="100%">
        <Button
          leftIcon={buttonIcon}
          borderRadius="none"
          borderBottomStartRadius="lg"
          flexGrow={1}
          justifyContent="start"
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
        <InstanceMenu />
      </ButtonGroup>
    </Grid>
  );
};

export default InstanceCard;
