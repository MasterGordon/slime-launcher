import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMainMutation } from "../../hooks/main";

interface AddOfflineAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOfflineAccount: React.FC<AddOfflineAccountProps> = (props) => {
  const { isOpen, onClose } = props;
  const addOfflineAccount = useMainMutation("addOfflineAccount", (qc) => {
    qc.invalidateQueries(["getAccounts"]);
  });
  const [username, setUsername] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Accounts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="2">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              if (username.trim().length > 0) {
                addOfflineAccount.mutate(username);
                onClose();
                setUsername("");
              }
            }}
            size="sm"
          >
            Add Offline Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOfflineAccount;
