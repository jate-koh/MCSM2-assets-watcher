import Logger from '@/Logger';
import Monitor from '@/Monitor';
import { Scribe } from '@/Scribe';
import { AppConfig, WatchEvent, WatchResponse } from '@/libs/types';

export class App {
  private config: AppConfig;
  private monitors: Monitor[] = [];
  private scribe: Scribe;

  public constructor(config: AppConfig) {
    this.config = config;
    this.scribe = new Scribe(Logger.child({ module: 'scribe' }));
    Logger.info('Loaded config: %o', this.config);
  }

  public init(): Error | void {
    Logger.info('Initializing instances...');

    Logger.info('Initializing scribe...');
    this.scribe.init().then(() => {
      Logger.info('Scribe initialized');
      // this.scribe.view();
    });

    Logger.info('Initializing monitors...');
    if (this.config.watchDirList && this.config.watchDirList.length > 1) {
      Logger.info('Multiple watch directories detected. Creating multiple monitors...');
      this.monitors = this.config.watchDirList.map(
        (dir) =>
          new Monitor(
            { ...this.config, watchDir: dir },
            Logger.child({ module: dir.toLowerCase() }),
          ),
      );
    } else {
      Logger.info('One watch directory detected. Creating single monitor...');
      this.monitors = [
        new Monitor(this.config, Logger.child({ module: this.config.watchDir.toLowerCase() })),
      ];
    }
    Logger.info('Monitors initialized: %o', this.monitors);
  }

  public start(): void {
    this.monitors.forEach((monitor) => {
      monitor.watch([WatchEvent.CHANGE]);
      monitor.on('change', (event: WatchResponse) => {
        Logger.info('Change detected: %s', event.filename);
        this.scribe
          .find(event.filename)
          .then((response) => {
            Logger.info('Asset found: %o', response);
          })
          .catch(() => {
            Logger.info('Asset not found: %s', event.filename);
          });
      });
    });
  }
}

export default App;
