export type ModLoaderType = "forge" | "fabric";

export interface InstanceMod {
  modId?: number | string;
  fileId?: number | string;
  title?: string;
  source?: string[];
  fileName: string;
  version?: string;
  sha512?: string;
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
