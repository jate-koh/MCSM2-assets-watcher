import { LoggerType } from '@/Logger';
import { AssetListPath } from '@/libs/constant';
import fs from 'fs';

type AssetLists = {
  [key: string]: string;
};

export type ScribeResponse = {
  success: boolean;
  filename: string;
  assetId: string;
  assetName: string;
  error?: Error;
};

export class Scribe {
  private path: string;
  private extension: string;
  private logger: LoggerType;
  private assetLists: AssetLists = {};

  public constructor(
    logger: LoggerType,
    extension: string = 'dds',
    readPath: string = AssetListPath(),
  ) {
    this.path = readPath;
    this.logger = logger;
    this.extension = extension;
  }

  public async init(): Promise<void | Error> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          this.logger.error('Error reading asset list file: %s', this.path);
          reject(err as Error);
        }

        // For each line in the file, add it to the asset list
        // Format of each line: [<asset id 1>, <asset id 2>, ...] <asset name>
        try {
          data.split('\n').forEach((line) => {
            // If the line has # or is empty, skip it
            if (line.includes('#') || line.trim() === '') {
              return;
            }

            const [idsString, name] = line.split(']');
            const ids = idsString
              .replace('[', '')
              .split(',')
              .map((id) => id.trim());
            // console.log('id', ids, 'name', name);

            ids.forEach((id) => {
              this.assetLists[id] = name.trim();
            });
          });
        } catch (error) {
          this.logger.error('Error parsing asset list file: %s', this.path, error as Error);
          reject(error as Error);
        }
        resolve();
      });
    });
  }

  public async find(filename: string): Promise<ScribeResponse> {
    return new Promise((resolve, reject) => {
      // Cut off the extension from the filename
      const fileId = filename.split('.').slice(0, -1).join('.');

      // Find the asset name from the asset list
      const assetName = this.assetLists[fileId];
      if (assetName) {
        resolve({
          success: true,
          filename: filename,
          assetId: fileId,
          assetName: assetName,
        });
      } else {
        reject({
          success: false,
          filename: filename,
          assetId: '',
          assetName: '',
          error: new Error('Asset not found'),
        });
      }
    });
  }

  public view(): void {
    this.logger.info('Asset list: %o', this.assetLists);
  }
}
