import { glob } from "glob";
import path from "path";
import { getInstancesPath } from "./get-instances-path";
import fs from "fs-extra";
import type { Instance, InstanceUpdate } from "./Instance";
import { initialInstanceState } from "./Instance";
import type { ChildProcessWithoutNullStreams } from "child_process";

const instancesPath = getInstancesPath();
const listener = new Set<() => void>();

let instances: Instance[] = [];
const instanceProcesses = new Map<string, ChildProcessWithoutNullStreams>();

const instanceManager = {
  getInstances: async () => {
    return instances;
  },
  loadInstances: async () => {
    const instanceJsonPaths = await glob(`${instancesPath}/*/instance.json`);
    instances = await Promise.all(
      instanceJsonPaths.map(async (fullInstancePath) => {
        const json = await fs.readJSON(fullInstancePath);
        const instancePath = fullInstancePath.split(path.sep).at(-2);
        return { ...json, path: instancePath, state: initialInstanceState };
      }),
    );

    instanceManager.emitInstancesChange();
  },
  addInstance: async (instance: Instance) => {
    await fs.ensureDir(`${instancesPath}/${instance.path}`);
    const { path, state: _, ...instanceJson } = instance;
    console.log("path", path);
    console.log("ipath", instancesPath);

    await fs.writeJSON(`${instancesPath}/${path}/instance.json`, instanceJson);

    instances.push(instance);
    instanceManager.emitInstancesChange();
  },
  removeInstance: async (instance: Instance) => {
    await fs.remove(`${instancesPath}/${instance.path}`);

    instances = instances.filter((i) => i.path !== instance.path);

    instanceManager.emitInstancesChange();
  },
  getInstance: (path: string): Instance | undefined => {
    return instances.find((instance) => instance.path === path);
  },
  onInstancesChange: (cb: () => void) => {
    listener.add(cb);
    return () => listener.delete(cb);
  },
  emitInstancesChange: () => {
    listener.forEach((cb) => cb());
  },
  updateInstance: async (instancePath: string, update: InstanceUpdate) => {
    const { state, path, ...updatedInstance } = update;
    if (path) {
      // TODO: handle path change
    }
    const instance = instanceManager.getInstance(instancePath);
    if (!instance) throw new Error(`Instance ${instancePath} not found`);
    if (Object.keys(updatedInstance).length > 0) {
      const { path: _, state: __, ...instanceJson } = instance;
      await fs.writeJSON(`${instancesPath}/${instancePath}/instance.json`, {
        ...instanceJson,
        ...updatedInstance,
      });
    }
    Object.assign(instance, updatedInstance, {
      state: { ...instance.state, ...state },
    });

    instanceManager.emitInstancesChange();
  },
  getInstanceProcess: (instancePath: string) => {
    return instanceProcesses.get(instancePath);
  },
  setInstanceProcess: (
    instancePath: string,
    process: ChildProcessWithoutNullStreams,
  ) => {
    instanceProcesses.set(instancePath, process);
  },
  killInstanceProcess: (instancePath: string) => {
    const process = instanceManager.getInstanceProcess(instancePath);
    if (process) {
      process.kill(9);
      instanceProcesses.delete(instancePath);
    }
  },
};
instanceManager.loadInstances();

export { instanceManager };
