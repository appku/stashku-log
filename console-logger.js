/* eslint-disable no-console */
import chalk from 'chalk';
import LogUtility from './log-utility.js';

/**
 * @typedef ConsoleLoggerConfiguration
 * @property {Boolean} enabled
 * @property {String} severity
 * @property {Boolean} timestamp
 * @property {Boolean} local
 * @property {Boolean} colors
 */

/**
 * Outputs log messages to stdout (console).
 */
class ConsoleLogger {
    constructor(config) {

        Object.defineProperty(this, '_storedConfig', {
            value: {
                enabled: true,
                severity: 'error',
                colors: true,
                timestamp: true,
                local: true
            },
            writable: true,
            enumerable: false
        });
        this.config = config;
    }

    /**
     * @type {ConsoleLoggerConfiguration}
     */
    get config() {
        let effective = {};
        if (typeof process.env.STASHKU_LOG_CONSOLE_ENABLED !== 'undefined') {
            effective.enabled = !!process.env.STASHKU_LOG_CONSOLE_ENABLED;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_SEVERITY !== 'undefined') {
            effective.severity = process.env.STASHKU_LOG_CONSOLE_SEVERITY;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_TIMESTAMP !== 'undefined') {
            effective.timestamp = !!process.env.STASHKU_LOG_CONSOLE_TIMESTAMP;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_LOCAL !== 'undefined') {
            effective.local = !!process.env.STASHKU_LOG_CONSOLE_LOCAL;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_COLORS !== 'undefined') {
            effective.colors = !!process.env.STASHKU_LOG_CONSOLE_COLORS;
        }
        return Object.assign(this._storedConfig, effective);
    }

    /**
     * @param {ConsoleLoggerConfiguration} obj
     */
    set config(obj) {
        this._storedConfig = Object.assign(this._storedConfig, obj);
    }

    async write(severity, ...args) {
        if (this.config && this.config.enabled) {
            if (this.config.severity) {
                //only log if severity at or above configured minimum.
                if (LogUtility.severity(severity) < LogUtility.severity(this.config.severity)) {
                    return;
                }
            }
            let colors = {
                bright: 'greenBright',
                regular: 'green'
            };
            if (severity === 'info') {
                colors.bright = 'whiteBright';
                colors.regular = 'white';
            } else if (severity === 'warn') {
                colors.bright = 'yellowBright';
                colors.regular = 'yellow';
            } else if (severity === 'error') {
                colors.bright = 'redBright';
                colors.regular = 'red';
            }
            let prefix = `[${severity}]`.padEnd(8, ' ');
            if (this.config.colors) {
                prefix = chalk`{${colors.bright} ${prefix}}`;
            }
            if (this.config.timestamp) {
                if (this.config.colors) {
                    prefix += chalk`{${colors.regular} ${LogUtility.timestamp(!!this.config.local)}}`;
                } else {
                    prefix += `${LogUtility.timestamp(!!this.config.local)}`;
                }
            }
            console[severity](prefix, ...args);
        }
    }

    /**
     * Writes a debug-severity log message. This is the lowest severity.
     * @param  {...any} args - Any object values to be logged.
     */
    async debug(...args) {
        this.write('debug', ...args);
    }

    /**
     * Writes an information-severity log message. This is the second-to-lowest severity.
     * @param  {...any} args - Any object values to be logged.
     */
    async info(...args) {
        this.write('info', ...args);
    }

    /**
     * Writes a warning-severity log message. This is the second-to-highest severity.
     * @param  {...any} args - Any object values to be logged.
     */
    async warn(...args) {
        this.write('warn', ...args);
    }

    /**
     * Writes a error-severity log message. This is the highest severity.
     * @param  {...any} args - Any object values to be logged.
     */
    async error(...args) {
        this.write('error', ...args);
    }

}

export default ConsoleLogger;