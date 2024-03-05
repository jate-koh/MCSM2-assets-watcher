import path from 'path';

export const LogFile: string = 'app.log';

export const AssetListFile: string = 'assets.txt';

export const AssetListPath = () => {
  return path.join(__dirname, 'list', AssetListFile);
};
