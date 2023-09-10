import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import type { Instance } from "@slime-launcher/piston";
import { FaEllipsisH } from "react-icons/fa";
import { useMainMutation } from "../../../hooks/main";
import { DeleteInstanceItem } from "./DeleteInstanceItem";

interface Props {
  instance: Instance;
}

const InstanceMenu: React.FC<Props> = ({ instance }) => {
  return (
    <Menu strategy="fixed">
      <MenuButton
        as={IconButton}
        aria-label="Instance Settings"
        borderRadius="none"
        borderBottomEndRadius="lg"
      >
        <Icon as={FaEllipsisH} />
      </MenuButton>
      <MenuList>
        <DeleteInstanceItem instance={instance} />
        <MenuItem>Rename</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default InstanceMenu;
