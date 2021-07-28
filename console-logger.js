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
export default class ConsoleLogger {
    constructor(config) {

        /**
         * @type {ConsoleLoggerConfiguration}
         */
        this.config = Object.assign({
            enabled: false,
            severity: null,
            colors: true,
            timestamp: true,
            local: true
        }, config);

        //init
        if (typeof process.env.STASHKU_LOG_CONSOLE_ENABLED !== 'undefined') {
            this.config.enabled = !!process.env.STASHKU_LOG_CONSOLE_ENABLED;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_SEVERITY !== 'undefined') {
            this.config.severity = process.env.STASHKU_LOG_CONSOLE_SEVERITY;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_TIMESTAMP !== 'undefined') {
            this.config.timestamp = !!process.env.STASHKU_LOG_CONSOLE_TIMESTAMP;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_LOCAL !== 'undefined') {
            this.config.local = !!process.env.STASHKU_LOG_CONSOLE_LOCAL;
        }
        if (typeof process.env.STASHKU_LOG_CONSOLE_COLORS !== 'undefined') {
            this.config.colors = !!process.env.STASHKU_LOG_CONSOLE_COLORS;
        }
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