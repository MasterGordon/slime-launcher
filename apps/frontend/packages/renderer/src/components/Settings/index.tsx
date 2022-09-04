import {
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import Download from "./Download";
import General from "./General";
import Java from "./Java";

const Settings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label="Settings" onClick={onOpen}>
        <Icon as={FaCog} />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent height="450px">
          <ModalCloseButton />
          <ModalBody padding="0" height="100%">
            <Tabs display="flex" variant="solid-rounded" height="100%">
              <TabList
                flexDirection="column"
                background="gray.800"
                height="100%"
                padding="2"
                borderLeftRadius="md"
              >
                <Tab>General</Tab>
                <Tab>Java</Tab>
                <Tab>Download</Tab>
              </TabList>
              <TabPanels height="100%">
                <TabPanel>
                  <General />
                </TabPanel>
                <TabPanel>
                  <Java />
                </TabPanel>
                <TabPanel>
                  <Download />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
