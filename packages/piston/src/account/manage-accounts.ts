import getAppData from "../utils/get-app-data";
import path from "path";
import fs from "fs-extra";
import type { Account } from "./Account";
import { Authenticator } from "minecraft-launcher-core";
import { Auth } from "msmc";
import axios from "axios";

const getAccountsFilePath = (): string => {
  const appData = getAppData();
  return path.join(appData, "accounts.json");
};

export const getAccounts = async (): Promise<{
  accounts: Account[];
  activeAccount?: string;
}> => {
  const filePath = getAccountsFilePath();
  if (!fs.existsSync(filePath)) {
    return { accounts: [] };
  }
  const data = await fs.readJson(filePath);

  return data;
};

const addAccount = async (account: Account): Promise<void> => {
  const accounts = await getAccounts();
  const filePath = getAccountsFilePath();
  accounts.accounts.push(account);
  await fs.writeJson(filePath, accounts);
};

export const removeAccount = async (uuid: string): Promise<void> => {
  const accounts = await getAccounts();
  const filePath = getAccountsFilePath();
  accounts.accounts = accounts.accounts.filter(
    (account) => account.uuid !== uuid
  );
  await fs.writeJson(filePath, accounts);
};

export const addOfflineAccount = async (username: string) => {
  const account = await Authenticator.getAuth(username);
  const uuid = await axios
    .get("https://api.mojang.com/users/profiles/minecraft/" + username)
    .then((res) => res.data.id);
  account.uuid = uuid;
  account.access_token = uuid;
  account.client_token = uuid;
  addAccount(account);
};

export const addMicrosoftAccount = async () => {
  const auth = new Auth("select_account");
  const xboxManager = await auth.launch("raw");
  const token = await xboxManager.getMinecraft();
  const account = token.mclc();
  addAccount(account as Account);
};

export const setActiveAccount = async (uuid: string): Promise<void> => {
  const accounts = await getAccounts();
  const filePath = getAccountsFilePath();
  accounts.activeAccount = uuid;
  await fs.writeJson(filePath, accounts);
};
