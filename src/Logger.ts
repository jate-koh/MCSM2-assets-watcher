import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  colorizeObjects: true,
  translateTime: 'SYS:standard',
  messageFormat: '{msg}',
  ignore: 'pid,hostname',
  customColors: `error:red,info:blue,debug:green,trace:yellow,warning:orange,notice:blue`,
});

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

export const Logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
      bindings: () => {
        return {};
      },
    },
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  },
  stream,
);

export type LoggerType = typeof Logger;

export default Logger;
