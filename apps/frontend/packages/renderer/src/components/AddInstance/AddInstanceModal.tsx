import {
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
} from "@chakra-ui/react";
import { useState } from "react";
import AddBasicInstance from "./AddBasicInstance";

interface AddInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InstanceType = "basic" | "curse" | "ftb" | "import";

const AddInstanceModal: React.FC<AddInstanceModalProps> = (props) => {
  const { isOpen } = props;

  const [type, setType] = useState<InstanceType>("basic");

  const onClose = () => {
    props.onClose();
    setType("basic");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Instance</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs width="100%" alignItems="center">
            <TabList display="flex" justifyContent="center">
              <Tab>Basic</Tab>
              <Tab>CurseForge</Tab>
              <Tab>FTB</Tab>
              <Tab>Import</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddBasicInstance />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddInstanceModal;
