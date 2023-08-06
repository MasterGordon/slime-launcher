import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { kebabCase } from "case-anything";
import { useMainQuery } from "../../hooks/main";
import type { CreateInstanceOptions, MinecraftVersion } from "piston";
import { api } from "#preload";
import { useToast } from "@chakra-ui/react";

interface FormValues {
  name: string;
  path: string;
  version: string;
  versionType: MinecraftVersion["type"];
  loaderType: CreateInstanceOptions["loaderType"];
  loaderVersion?: string;
  memory: number;
}

const useAddBasicInstanceForm = () => {
  const { data: minecraftVersionsRaw } = useMainQuery(
    "getMinecraftVersions",
    undefined,
  );
  const { data: fabricVersions } = useMainQuery(
    "getFabricLoaderVersions",
    undefined,
  );
  const { data: fabricSupportedVersions } = useMainQuery(
    "getFabricSupportedVersions",
    undefined,
  );
  const { data: instancesPath } = useMainQuery("getInstancesPath", undefined);
  const { data: forgeVersions } = useMainQuery("getForgeVersions", undefined);
  const { data: maxMemory } = useMainQuery("getMaxMemory", undefined);

  const { handleSubmit, register, formState, watch, setValue } =
    useForm<FormValues>();
  const { errors, isSubmitting } = formState;
  const {
    versionType,
    memory,
    version,
    path,
    name,
    loaderType,
    loaderVersion,
  } = watch();

  useEffect(() => {
    setValue("path", kebabCase(name || ""));
  }, [name, setValue]);

  let minecraftVersions = minecraftVersionsRaw?.versions.filter(
    (version) => version.type === versionType,
  );

  useEffect(() => {
    if (minecraftVersionsRaw)
      setValue("version", minecraftVersionsRaw?.latest.release);
  }, [minecraftVersionsRaw, setValue]);

  let loaderVersions: string[] | undefined;

  if (loaderType === "forge") {
    loaderVersions = forgeVersions?.versions[version];
  }
  if (loaderType === "fabric") {
    loaderVersions = fabricVersions?.versions;
    minecraftVersions = minecraftVersions?.filter((version) =>
      fabricSupportedVersions?.includes(version.id),
    );
  }

  useEffect(() => {
    if (loaderType) setValue("loaderVersion", loaderVersions?.[0]);
  }, [loaderType, loaderVersions, setValue]);

  const toast = useToast({
    title: "Instance created",
  });
  const onSubmit = (values: FormValues) => {
    // TODO: useMutation
    api
      .mutate("createBasicInstance", {
        loaderType,
        name,
        path,
        version,
        memory,
        versionType,
        loaderVersion,
      })
      .then(() => toast());
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    register,
    minecraftVersions,
    loaderVersions,
    loaderType,
    instancesPath,
    maxMemory: (maxMemory ?? 0) * 1024,
  };
};

export default useAddBasicInstanceForm;
