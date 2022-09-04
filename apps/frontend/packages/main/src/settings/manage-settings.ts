import getAppData from "../utils/get-app-data";
import path from "path";
import fs from "fs-extra";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const settingsSchema = z.object({
  $schema: z.string(),
  maxConcurrentDownloads: z.number().min(1),
  javaPath: z.record(z.string(), z.string()),
});

export type Settings = Omit<z.infer<typeof settingsSchema>, "$schema">;

const defaultSettings: z.infer<typeof settingsSchema> = {
  $schema: "./settings.schema.json",
  maxConcurrentDownloads: 3,
  javaPath: {},
};

export const getSettingsPath = async () => {
  const appData = getAppData();
  return path.join(appData, "settings.json");
};

export const generateSettings = async () => {
  const settingsPath = await getSettingsPath();
  const settingsSchemaPath = path.join(settingsPath, "../settings.schema.json");
  const schema = zodToJsonSchema(settingsSchema);
  const settings = await getSettings();
  await fs.writeJson(
    settingsPath,
    { ...defaultSettings, ...settings },
    {
      spaces: 2,
    },
  );
  await fs.writeJson(settingsSchemaPath, schema, {
    spaces: 2,
  });
};

export const getSettings = async (): Promise<Settings> => {
  const settingsPath = await getSettingsPath();
  try {
    const settingsData: unknown = await fs.readJson(settingsPath);
    return settingsSchema.parse(settingsData);
  } catch (e) {
    // fallback to default settings when the file is corrupted
    return defaultSettings;
  }
};

export const updateSettings = async (settingsUpdate: Partial<Settings>) => {
  const settingsPath = await getSettingsPath();
  const settings = await getSettings();
  await fs.writeJson(
    settingsPath,
    {
      ...settings,
      ...settingsUpdate,
      javaPath: { ...settings.javaPath, ...settingsUpdate.javaPath },
    },
    {
      spaces: 2,
    },
  );
};
