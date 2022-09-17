import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import AddInstanceModal from "./AddInstanceModal";

const AddInstance: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label={"Add Instance"}
        position="fixed"
        right="2"
        bottom="2"
        onClick={onOpen}
      >
        <Icon as={MdAdd} />
      </IconButton>
      <AddInstanceModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddInstance;
