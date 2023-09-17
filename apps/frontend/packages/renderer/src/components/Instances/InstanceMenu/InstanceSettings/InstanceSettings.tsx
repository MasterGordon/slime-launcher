import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useInstance } from "../../InstanceProvider";
import Overview from "./Overview";
import Mods from "./Mods";

const InstanceSettingsMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const instance = useInstance();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Modify</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent height="calc(100vh - 200px)">
          <ModalCloseButton />
          <ModalHeader>{instance.name}</ModalHeader>
          <ModalBody padding="0" height="100%">
            <Tabs
              display="flex"
              variant="solid-rounded"
              height="100%"
              onChange={handleTabsChange}
              background="gray.700"
              index={tabIndex}
            >
              <TabList
                flexDirection="column"
                background="gray.800"
                height="100%"
                padding="2"
                borderBottomLeftRadius="md"
              >
                <Tab>Overview</Tab>
                <Tab>Mods</Tab>
                <Tab whiteSpace="nowrap">Resource Packs</Tab>
                <Tab>Screenshots</Tab>
              </TabList>
              <TabPanels height="100%" overflowY="auto">
                <TabPanel>
                  <Overview />
                </TabPanel>
                <TabPanel>
                  <Mods />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstanceSettingsMenu;
