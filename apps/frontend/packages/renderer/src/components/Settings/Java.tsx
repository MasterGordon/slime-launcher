import { Heading, VStack } from "@chakra-ui/react";
import JavaVersionPicker from "./JavaVersionPicker";

const Java: React.FC = () => {
  return (
    <VStack alignItems="start">
      <Heading size="md">Java</Heading>
      <JavaVersionPicker version={8} />
      <JavaVersionPicker version={17} />
    </VStack>
  );
};

export default Java;
