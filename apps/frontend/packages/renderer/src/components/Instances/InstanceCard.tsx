import type { ButtonProps } from "@chakra-ui/react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import type { Instance } from "@slime-launcher/piston";
import { FaEllipsisH, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { useMainMutation } from "../../hooks/main";

interface Props {
  instance: Instance;
}

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

const InstanceCard: React.FC<Props> = (props) => {
  const launch = useMainMutation("launchInstance");
  const kill = useMainMutation("killInstance");

  const onClick = () => {
    if (props.instance.state.status === "running") {
      kill.mutateAsync(props.instance.path);
      return;
    }
    if (props.instance.state.status === "idle") {
      launch.mutateAsync(props.instance.path);
      return;
    }
  };

  const buttonIcon = iconByStatus[props.instance.state.status];
  const buttonLabel = buttonLabelByStatus[props.instance.state.status];

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
        {props.instance.name}
      </Center>
      <Box position="absolute" right="2" top="2" fontSize="sm" color="gray.700">
        {props.instance.minecraftVersion}
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
        <IconButton
          aria-label="Instance Settings"
          borderRadius="none"
          borderBottomEndRadius="lg"
        >
          <Icon as={FaEllipsisH} />
        </IconButton>
      </ButtonGroup>
    </Grid>
  );
};

export default InstanceCard;
