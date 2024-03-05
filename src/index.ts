import App from '@/App';
import { AppConfig } from '@/libs/types';
import dotenv from 'dotenv';

dotenv.config();
const config: AppConfig = {
  watchDir: process.env.WATCH_DIR || '',
  watchDirList: process.env.WATCH_DIR_LIST?.split(',') || [],
  extensions: process.env.EXTENSIONS?.split(',') || [],
};

const app = new App(config);

app.init();
app.start();

// If sigint or sigterm is received, stop the app
// process.on('SIGINT', () => {
//   app.stop();
// });
