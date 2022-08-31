import path from 'path';

const getAppData = (): string => {
  const systemAppData =
    process.env.APPDATA ||
    (process.platform == 'darwin'
      ? process.env.HOME + '/Library/Preferences'
      : process.env.HOME + '/.local/share');
  const appName = 'launcher';

  const appData = path.join(systemAppData, appName).replace(/\\/g, '/');
  return appData;
};

export default getAppData;
