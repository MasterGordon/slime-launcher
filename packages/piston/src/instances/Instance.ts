import type { ModLoaderType } from "@slime-launcher/curse-client";

export interface InstanceMod {
  modId?: number;
  fileId?: number;
  fileName: string;
  name: string;
  downloadUrl?: string;
  fingerprint?: number;
}

export interface InstanceState {
  status: "idle" | "installing" | "launching" | "running";
}

export const initialInstanceState: InstanceState = {
  status: "idle",
};

export interface Instance {
  path: string;
  name: string;
  minecraftVersion: string;
  loaderVersion?: string;
  loaderType?: ModLoaderType;
  mods: InstanceMod[];
  forge?: string;
  memory: number;
  customVersion?: string;
  state: InstanceState;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type InstanceUpdate = DeepPartial<Instance>;
