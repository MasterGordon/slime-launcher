import { Text, Center, Heading, VStack, Flex } from "@chakra-ui/react";
import { useMainQuery } from "../../hooks/main";
import InstanceCard from "./InstanceCard";
import { InstanceProvider } from "./InstanceProvider";

const Instances: React.FC = () => {
  const { data: instances } = useMainQuery("getInstances", undefined);
  if (!instances?.length)
    return (
      <Center>
        <VStack>
          <Heading size="md">{`You don't have instances yet!`}</Heading>
          <Text>Click on the plus button to create one</Text>
        </VStack>
      </Center>
    );
  return (
    <Flex
      flexWrap="wrap"
      height="min-content"
      maxHeight="calc(100vh - 64px)"
      overflowY="auto"
      gap="50px"
      padding="50px"
    >
      {instances?.map((instance) => (
        <InstanceProvider instance={instance} key={instance.path}>
          <InstanceCard />
        </InstanceProvider>
      ))}
    </Flex>
  );
};

export default Instances;
