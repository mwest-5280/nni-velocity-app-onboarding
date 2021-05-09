import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

enum LogLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

interface LogMessage {
  applicationName: string;
  logLevel: string;
  category: string;
  message: {};
}

@Injectable({
  providedIn: 'root',
})
export class Logger {
  private envLevel = LogLevel[environment.loggerLevel];
  private appName = 'agent-portal';
  private loggingUrl = `${environment.apiUrl}/loggingapi/logging/log`;

  constructor(private http: HttpClient) {}

  trace(message: string | {}, category = '') {
    this.postLog(LogLevel.TRACE, message, category);
  }

  debug(message: string | {}, category = '') {
    this.postLog(LogLevel.DEBUG, message, category);
  }

  info(message: string | {}, category = '') {
    this.postLog(LogLevel.INFO, message, category);
  }

  warn(message: string | {}, category = '') {
    this.postLog(LogLevel.WARN, message, category);
  }

  error(message: string | {}, category = '') {
    this.postLog(LogLevel.ERROR, message, category);
  }

  fatal(message: string | {}, category = '') {
    this.postLog(LogLevel.FATAL, message, category);
  }

  private isLevelEnabled(level: LogLevel) {
    return level >= this.envLevel;
  }

  private get isConsoleEnabled() {
    return this.envLevel <= LogLevel.DEBUG;
  }

  private logToConsole(level: LogLevel, message) {
    switch (level) {
      case LogLevel.TRACE:
      case LogLevel.DEBUG:
        // tslint:disable-next-line:no-console
        console.debug(message);
        break;
      case LogLevel.INFO:
        // tslint:disable-next-line:no-console
        console.info(message);
        break;
      case LogLevel.WARN:
        console.warn(message);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(message);
    }
  }

  private postLog(level: LogLevel, message: string | {}, category: string) {
    if (this.isLevelEnabled(level)) {
      if (this.isConsoleEnabled) {
        this.logToConsole(level, message);
      }

      const logMessage = {
        applicationName: this.appName,
        logLevel: LogLevel[level],
        category,
        message: typeof message === 'string' ? { message } : message,
      };

      this.http.post<LogMessage>(this.loggingUrl, logMessage).subscribe(
        () => {
          // Nothing really to do on success
        },
        (error) => {
          this.logToConsole(LogLevel.ERROR, error);
        }
      );
    }
  }
}
