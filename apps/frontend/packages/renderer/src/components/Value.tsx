import { Heading } from "@chakra-ui/react";

const Value: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Heading size="md" fontFamily="mono">
      {children}
    </Heading>
  );
};

export default Value;
