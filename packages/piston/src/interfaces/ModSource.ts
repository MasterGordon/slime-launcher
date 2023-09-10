export interface ModSourceMod {
  id: string;
  body: string;
}
export interface ModSource {
  id: string;
  getFilterOptions(): string[];
  getMod(id: string): Promise<ModSourceMod>;
}
