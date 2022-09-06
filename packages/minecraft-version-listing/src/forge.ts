import axios from "axios";
import { constants } from "./constants";
import convert from "xml-js";

export interface ForgeVersionResponse {
  metadata: {
    versioning: {
      latest: {
        _text: string;
      };
      release: {
        _text: string;
      };
      versions: {
        version: {
          _text: `${string}-${string}`;
        }[];
      };
    };
  };
}

export interface ForgeVersions {
  release: {
    minecraftVersion: string;
    version: string;
  };
  versions: {
    [minecraftVersion: string]: string[];
  };
}

export const getForgeVersions = async () => {
  const forgeVersionsData = (await axios.get(constants.forgeVersionMeta)).data;
  const forgeVersionsObject = convert.xml2js(forgeVersionsData, {
    compact: true,
  }) as ForgeVersionResponse;
  const forgeVersions: ForgeVersions = {
    release: {
      minecraftVersion:
        forgeVersionsObject.metadata.versioning.release._text.split("-")[0],
      version: forgeVersionsObject.metadata.versioning.release._text
        .split("-")
        .splice(1)
        .join("-"),
    },
    versions: {},
  };

  forgeVersionsObject.metadata.versioning.versions.version.forEach(
    (version) => {
      const minecraftVersion = version._text.split("-")[0];
      const forgeVersion = version._text.split("-").splice(1).join("-");
      forgeVersions.versions[minecraftVersion] ||= [];
      forgeVersions.versions[minecraftVersion].push(forgeVersion);
    }
  );

  return forgeVersions;
};
