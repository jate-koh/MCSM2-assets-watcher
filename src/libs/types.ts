export type AppConfig = {
  watchDir: string;
  watchDirList?: string[];
  extensions: string[];
};

export enum WatchEvent {
  CHANGE = 'change',
  RENAME = 'rename',
  ERROR = 'error',
}

export type WatchResponse = {
  event: WatchEvent;
  filename: string;
  directory: string;
  error?: Error;
};
