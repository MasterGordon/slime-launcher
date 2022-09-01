import {
  Button,
  Center,
  chakra,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { MdExpandMore, MdManageAccounts } from "react-icons/md";
import { useMainQuery, useMainMutation } from "../../hooks/main";
import ManageAccounts from "./ManageAccounts";

const LoginMenu = () => {
  const { data } = useMainQuery("getAccounts", undefined);
  const setActiveAccount = useMainMutation("setActiveAccount", (qc) => {
    qc.invalidateQueries(["getAccounts"]);
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  if (!data) return <Spinner />;
  const { accounts, activeAccount } = data;
  const selectedAccount = accounts.find(
    (account) => account.uuid === activeAccount,
  );

  return (
    <>
      <Menu>
        <MenuButton
          leftIcon={
            <chakra.img
              marginRight="1"
              src={
                "https://visage.surgeplay.com/face/32/" +
                (selectedAccount ? selectedAccount.uuid : "X-Steve")
              }
            />
          }
          as={Button}
          rightIcon={<Icon as={MdExpandMore} />}
        >
          <Flex>
            {selectedAccount ? selectedAccount.name : "Not logged in"}
          </Flex>
        </MenuButton>
        <MenuList>
          {accounts.map((account, id) => (
            <MenuItem
              key={account.uuid + id}
              onClick={() => setActiveAccount.mutate(account.uuid)}
            >
              <chakra.img
                marginRight="1"
                src={
                  "https://visage.surgeplay.com/face/32/" +
                  (account ? account.uuid : "X-Steve")
                }
              />
              {account.name}
            </MenuItem>
          ))}
          <MenuItem onClick={onOpen}>
            <Center width="32px" marginRight="1">
              <Icon as={MdManageAccounts} size="32px" />
            </Center>
            {"Manage Accounts"}
          </MenuItem>
        </MenuList>
      </Menu>
      <ManageAccounts isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LoginMenu;
