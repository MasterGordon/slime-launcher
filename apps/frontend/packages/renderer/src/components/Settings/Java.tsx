import { Heading } from "@chakra-ui/react";
import JavaVersionPicker from "./JavaVersionPicker";

const Java: React.FC = () => {
  return (
    <>
      <Heading size="md">Java</Heading>
      <JavaVersionPicker version={8} />
      <JavaVersionPicker version={17} />
    </>
  );
};

export default Java;
