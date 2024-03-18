import type { ModSource } from "./interfaces/ModSource";

class ModSourceManager {
  private modSources: ModSource[] = [];

  public registerModSource(modSource: ModSource): void {
    this.modSources.push(modSource);
  }

  public getModSources(): ModSource[] {
    return this.modSources;
  }

  public getModSource(id: string): ModSource | undefined {
    return this.modSources.find((modSource) => modSource.id === id);
  }
}

export const modSourceManager = new ModSourceManager();
