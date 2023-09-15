import { Client } from "minecraft-launcher-core";
import { getAccounts } from "../account";
import { getInstancesPath } from "./get-instances-path";
import path from "path";
import { getSettings } from "../settings/manage-settings";
import { instanceManager } from "./instance-manager";

export const launchInstance = async (instancePath: string) => {
  const instance = instanceManager.getInstance(instancePath);
  const { accounts, activeAccount } = await getAccounts();
  const settings = await getSettings();
  const account = accounts.find((account) => account.uuid === activeAccount);
  if (!account) throw new Error("No active account");
  if (!instance) throw new Error("No instance");
  const client = new Client();
  await instanceManager.updateInstance(instancePath, {
    state: { status: "launching" },
  });
  const mcProcess = await client.launch({
    authorization: Promise.resolve(account),
    root: path.join(getInstancesPath(), instance.path),
    version: {
      number: instance.minecraftVersion,
      custom: instance.customVersion,
      type: "release",
    },
    memory: {
      min: instance.memory / 2,
      max: instance.memory,
    },
    forge: instance.forge
      ? path.join(getInstancesPath(), instance.path, instance.forge)
      : undefined,
    javaPath: settings.javaPath["13"],
  });
  client.on("debug", (e) => console.log(e));

  let running = false;

  if (!mcProcess) {
    await instanceManager.updateInstance(instancePath, {
      state: { status: "idle" },
    });
    throw new Error("Failed to launch");
  }
  instanceManager.setInstanceProcess(instancePath, mcProcess);
  client.on("data", (_e) => {
    console.log(_e);
    if (!running) {
      instanceManager.updateInstance(instancePath, {
        state: { status: "running" },
      });
      running = true;
    }
  });
  client.on("close", (_e) => {
    instanceManager.updateInstance(instancePath, {
      state: { status: "idle" },
    });
  });
};
