import { Text, Center, Heading, VStack } from "@chakra-ui/react";

const Instances: React.FC = () => {
  return (
    <Center>
      <VStack>
        <Heading size="md">You have instances yet!</Heading>
        <Text>Click on the plus button to create one</Text>
      </VStack>
    </Center>
  );
};

export default Instances;
