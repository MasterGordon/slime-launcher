import {
  Button,
  chakra,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMainMutation, useMainQuery } from "../../hooks/main";
import AddOfflineAccount from "./AddOfflineAccount";

interface ManageAccountsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageAccounts: React.FC<ManageAccountsProps> = (props) => {
  const { isOpen, onClose } = props;
  const { data } = useMainQuery("getAccounts", undefined);
  const addMicrosoftAccount = useMainMutation("addMicrosoftAccount", (qc) => {
    qc.invalidateQueries(["getAccounts"]);
  });
  const removeAccount = useMainMutation("removeAccount", (qc) => {
    qc.invalidateQueries(["getAccounts"]);
  });
  const {
    onOpen: onOpenAddOfflineAccount,
    isOpen: isAddOfflineAccountOpen,
    onClose: closeAddOfflineAccount,
  } = useDisclosure();
  if (!data) return null;
  const { accounts, activeAccount } = data;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="2">
              {accounts.map((account) => (
                <HStack
                  width="100%"
                  borderRadius="8"
                  padding="2"
                  background={
                    account.uuid === activeAccount ? "gray.600" : undefined
                  }
                >
                  <chakra.img
                    src={"https://visage.surgeplay.com/face/32/" + account.uuid}
                  />
                  <chakra.span>{account.name}</chakra.span>
                  <Spacer />
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                      removeAccount.mutate(account.uuid);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
              {accounts.length === 0 && (
                <VStack color="gray.400">
                  <chakra.span>You have no accounts yet</chakra.span>
                  <chakra.span>
                    Add one by clicking the button below
                  </chakra.span>
                </VStack>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => addMicrosoftAccount.mutate(undefined)}
              size="sm"
            >
              Add Microsoft Account
            </Button>
            <Button variant="ghost" size="sm" onClick={onOpenAddOfflineAccount}>
              Add Offline Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AddOfflineAccount
        isOpen={isAddOfflineAccountOpen}
        onClose={closeAddOfflineAccount}
      />
    </>
  );
};

export default ManageAccounts;
