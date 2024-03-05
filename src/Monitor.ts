import { LoggerType } from '@/Logger';
import { AppConfig, WatchEvent, WatchResponse } from '@/libs/types';
import { EventEmitter } from 'events';
import fs from 'fs';

export class Monitor extends EventEmitter {
  private directory: string;
  private extensions: string[];
  private logger: LoggerType;

  public constructor(config: AppConfig, logger: LoggerType) {
    super();
    this.directory = config.watchDir;
    this.logger = logger;
    this.extensions = config.extensions;
  }

  public watch(watchEvent: WatchEvent[] = [WatchEvent.CHANGE, WatchEvent.RENAME]): void {
    this.logger.info('Watching directory: %s', this.directory);
    const watcher = fs.watch(this.directory, (event, filename) => {
      if (
        watchEvent.includes(event as WatchEvent) ||
        (filename && this.extensions.some((ext) => filename.endsWith(ext)))
      ) {
        this.emit('change', {
          event: event as WatchEvent,
          filename: filename,
          directory: this.directory,
        } as WatchResponse);
      }
    });

    watcher.on('error', (error) => {
      this.logger.error('Error watching directory: %s', this.directory);
      watcher.close();
      this.emit('error', {
        event: WatchEvent.ERROR,
        filename: '',
        directory: this.directory,
        error: error as Error,
      } as WatchResponse);
    });
  }

  public stop(): void {
    this.logger.info('Stopping monitor for directory: %s', this.directory);
  }
}

export default Monitor;
