import axios from "axios";
import { constants } from "./constants";

type FabricLoaderVersionsResponse = Array<{
  version: string;
  stable: boolean;
}>;

type FabricSupportedVersionsResponse = Array<{
  version: string;
}>;
export const getFabricLoaderVersions = async () => {
  const fabricLoaderVersionsResponse: FabricLoaderVersionsResponse = (
    await axios.get(constants.fabricLoaderVersions)
  ).data;
  return {
    latest: fabricLoaderVersionsResponse.find((version) => version.stable)
      ?.version as string,
    versions: fabricLoaderVersionsResponse.map((version) => version.version),
  };
};

export const getFabricSupportedVersions = async () => {
  const fabricSupportedVersionsResponse: FabricSupportedVersionsResponse = (
    await axios.get(constants.fabricSupportedVersions)
  ).data;
  return fabricSupportedVersionsResponse.map((version) => version.version);
};
