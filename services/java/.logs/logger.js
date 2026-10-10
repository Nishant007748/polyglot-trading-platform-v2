// Auto-generated logger helper for polyglot services
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LOG_LEVELS = {
  error: 4,
  warn: 3,
  info: 2,
  debug: 1
};

export class Logger {
  constructor(serviceName = 'unknown') {
    this.serviceName = serviceName;
    this.logsDir = __dirname;
  }
  
  log(level, message, data = {}) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: level.toLowerCase(),
        service: this.serviceName,
        message: String(message),
        data
      };
      
      const dateStr = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.logsDir, `${dateStr}.log`);
      const logLine = JSON.stringify(logEntry) + '\n';
      
      fs.appendFileSync(logFile, logLine);
    } catch (e) {
      console.error('Failed to write log:', e.message);
    }
  }
  
  error(message, data) { this.log('error', message, data); }
  warn(message, data) { this.log('warn', message, data); }
  info(message, data) { this.log('info', message, data); }
  debug(message, data) { this.log('debug', message, data); }
}
