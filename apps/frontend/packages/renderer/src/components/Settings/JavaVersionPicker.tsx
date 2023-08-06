import {
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline, MdSave } from "react-icons/md";
import { useMainMutation, useMainQuery } from "../../hooks/main";
import { api } from "#preload";

interface JavaVersionPickerProps {
  version: number;
}

const JavaVersionPicker: React.FC<JavaVersionPickerProps> = (props) => {
  const { version } = props;
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: settings } = useMainQuery("getSettings", undefined);
  const { data: downloadStatus } = useMainQuery("downloadStatus", undefined, {
    refetchInterval: 200,
  });
  const updateSettings = useMainMutation("updateSettings", (qc) => {
    qc.invalidateQueries(["getSettings"]);
  });
  const setupJava = useMainMutation("setupJava", (qc) => {
    qc.invalidateQueries(["getSettings"]);
    setIsValid(true);
    onClose();
  });
  const [javaPathInput, setJavaPathInput] = useState("");
  const javaPath = settings?.javaPath[version];
  useEffect(() => {
    if (javaPath) {
      setJavaPathInput(javaPath);
    }
  }, [javaPath]);
  if (!settings || !downloadStatus) return null;

  const save = async () => {
    if (
      await api.query("validateJava", {
        version,
        executable: javaPathInput,
      })
    ) {
      updateSettings.mutate({
        javaPath: {
          [version]: javaPathInput,
        },
      });
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJavaPathInput(e.target.value);
    setIsValid(undefined);
  };

  const autoSetup = async () => {
    onOpen();
    setupJava.mutate(version);
  };

  return (
    <>
      <FormControl isInvalid={isValid === false}>
        <FormLabel>
          Java {version} executable path{" "}
          <Button size="xs" onClick={autoSetup}>
            Auto Setup
          </Button>
        </FormLabel>
        <InputGroup>
          <Input
            placeholder="Java path"
            onChange={onChange}
            value={javaPathInput}
          />
          <InputRightElement>
            <IconButton aria-label="Save" onClick={save} variant="ghost">
              {isValid ? (
                <Icon as={MdCheckCircleOutline} fill="green.400" />
              ) : (
                <Icon as={MdSave} />
              )}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          Please enter a valid Java executable path. If you struggle to find
          java you can use the Auto Setup button.
        </FormErrorMessage>
      </FormControl>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Setting up Java {version}</ModalHeader>
          <ModalBody>
            <Center>
              <Box>
                <Center>
                  <CircularProgress
                    value={
                      downloadStatus.goal === 0
                        ? 0
                        : (downloadStatus.progress / downloadStatus.goal) * 100
                    }
                  />
                </Center>
                <Box>Downloading Java...</Box>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JavaVersionPicker;
