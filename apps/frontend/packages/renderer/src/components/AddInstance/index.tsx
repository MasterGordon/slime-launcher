import { Icon, IconButton } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const AddInstance: React.FC = () => {
  return (
    <IconButton
      aria-label={"Add Instance"}
      position="fixed"
      right="2"
      bottom="2"
    >
      <Icon as={MdAdd} />
    </IconButton>
  );
};

export default AddInstance;
