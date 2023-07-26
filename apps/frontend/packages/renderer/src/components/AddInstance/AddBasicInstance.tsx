import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { pascalCase } from "case-anything";
import { useState } from "react";
import useAddBasicInstanceForm from "./useAddBasicInstanceForm";

interface MemorySliderProps {
  maxMemory: number;
  register: ReturnType<typeof useAddBasicInstanceForm>["register"];
  errors: ReturnType<typeof useAddBasicInstanceForm>["errors"];
}

const MemorySlider: React.FC<MemorySliderProps> = ({
  maxMemory,
  register,
  errors,
}) => {
  const { min: _min, max: _max, onChange } = register("memory");
  const min = 2 * 1024;
  const [value, setValue] = useState(min);

  return (
    <FormControl isInvalid={!!errors.memory}>
      <FormLabel htmlFor="memory">Memory</FormLabel>
      <Slider
        max={maxMemory}
        min={min}
        step={512}
        value={value}
        onChange={(value) => {
          if (value < min) return;
          onChange({
            target: {
              value,
            },
          });
          setValue(value);
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <FormHelperText textAlign="right">
        {(value / 1000).toFixed(3).replace(".", ",")}MB
      </FormHelperText>
    </FormControl>
  );
};

const AddBasicInstance: React.FC = () => {
  const {
    errors,
    onSubmit,
    register,
    isSubmitting,
    minecraftVersions,
    loaderType,
    loaderVersions,
    instancesPath,
    maxMemory,
  } = useAddBasicInstanceForm();

  return (
    <VStack as="form" onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Name"
          {...register("name", { required: "A name is required" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.path}>
        <FormLabel htmlFor="path">Path</FormLabel>
        <InputGroup>
          <InputLeftAddon>{instancesPath}/</InputLeftAddon>
          <Input
            id="path"
            placeholder="Path"
            {...register("path", { required: "A path is required" })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.path && errors.path.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.versionType}>
        <FormLabel htmlFor="versionType">Version Type</FormLabel>
        <Select id="versionType" {...register("versionType")}>
          <option value="release">Release</option>
          <option value="snapshot">Snapshot</option>
          <option value="old_beta">Old Beta</option>
          <option value="old_alpha">Old Alpha</option>
        </Select>
      </FormControl>
      <FormControl isInvalid={!!errors.version}>
        <FormLabel htmlFor="version">Version</FormLabel>
        <Select id="version" {...register("version")}>
          {minecraftVersions?.map((version) => (
            <option key={version.id} value={version.id}>
              {version.id.replace("a", "Alpha ").replace("b", "Beta ")}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isInvalid={!!errors.loaderType}>
        <FormLabel htmlFor="loaderType">Mod Loader</FormLabel>
        <Select
          id="loaderType"
          {...register("loaderType", {
            setValueAs: (value) => (value === "none" ? undefined : value),
          })}
        >
          <option value="none">None</option>
          <option value="forge">Forge</option>
          <option value="fabric">Fabric</option>
        </Select>
      </FormControl>
      {loaderType && (
        <FormControl isInvalid={!!errors.loaderVersion}>
          <FormLabel htmlFor="loaderVersion">
            {pascalCase(loaderType)} Version
          </FormLabel>
          <Select id="loaderVersion" {...register("loaderVersion")}>
            {loaderVersions?.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      <MemorySlider maxMemory={maxMemory} register={register} errors={errors} />
      <Button isLoading={isSubmitting} type="submit">
        Create Instance
      </Button>
    </VStack>
  );
};

export default AddBasicInstance;
