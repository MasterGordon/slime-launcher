import getAppData from '../utils/get-app-data';
import path from 'path';
import fs from 'fs-extra';
import type {Account} from './Account';

const getAccountsFilePath = (): string => {
  const appData = getAppData();
  return path.join(appData, 'accounts.json');
};

export const getAccounts = async (): Promise<Account[]> => {
  const filePath = getAccountsFilePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = await fs.readJson(filePath);

  return data as Account[];
};

export const addAccount = async (account: Account): Promise<void> => {
  const accounts = await getAccounts();
  const filePath = getAccountsFilePath();
  accounts.push(account);
  await fs.writeJson(filePath, accounts);
};

export const removeAccount = async (uuid: string): Promise<void> => {
  const accounts = await getAccounts();
  const filePath = getAccountsFilePath();
  const newAccounts = accounts.filter(account => account.uuid !== uuid);
  await fs.writeJson(filePath, newAccounts);
};
