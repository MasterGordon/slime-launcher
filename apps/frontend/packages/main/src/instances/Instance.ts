export interface InstanceMod {
  modId: number;
  fileId: number;
  fileName: string;
  downloadUrl: string;
  fingerprint: number;
}

export interface Instance {
  name: string;
  minecraftVersion: string;
  loaderVersion?: string;
  loaderType?: "fabric" | "forge" | "quilt";
  mods: InstanceMod[];
}
