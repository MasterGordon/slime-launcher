import { chakra, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  path: string;
  version: string;
}

const AddBasicInstance: React.FC = () => {
  const { handleSubmit, register, formState } = useForm();

  return (
    <chakra.form>
      <FormControl></FormControl>
    </chakra.form>
  );
};

export default AddBasicInstance;
