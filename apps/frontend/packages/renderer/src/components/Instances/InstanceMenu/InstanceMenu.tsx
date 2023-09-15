import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
import { useMainMutation } from "../../../hooks/main";
import { useInstance } from "../InstanceProvider";
import { DeleteInstanceItem } from "./DeleteInstanceItem";
import InstanceSettingsMenu from "./InstanceSettings/InstanceSettings";

const InstanceMenu: React.FC = () => {
  const openInstance = useMainMutation("openInstance");
  const instance = useInstance();

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
        <InstanceSettingsMenu />
        <MenuItem>Add Mods</MenuItem>
        <MenuItem onClick={() => openInstance.mutate(instance.path)}>
          Open Folder
        </MenuItem>
        <MenuItem>Rename</MenuItem>
        <DeleteInstanceItem />
      </MenuList>
    </Menu>
  );
};

export default InstanceMenu;
