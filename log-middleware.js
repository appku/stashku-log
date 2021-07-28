import StashKu, { BaseStorageEngine } from '@appku/stashku';
import ConsoleLogger from './console-logger.js';

const SUPPORTED_SEVERITIES = ['debug', 'info', 'warn', 'error'];

/**
 * @typedef LogMiddlewareConfiguration
 * @property {ConsoleLoggerConfiguration} console
 * @property {FileLoggerConfiguration} file
 */

/**
 * @module
 * Middlware that provides logging capabilities.
 */
const LogMiddleware = {
    /**
     * @type {String}
     */
    name: '@appku/stashku-log',

    /** 
     * @type {Array}
     * @readonly
     */
    states: ['log'],

    /**
     * @type {LogMiddlewareConfiguration}
     */
    config: null,

    /**
     * @type {Array}
     */
    loggers: null,

    /**
     * Returns the loggers of the middleware, constructing the object if necessary (lazy-load).
     * 
     * We lazy load the loggers in case other initialization code is present to set environmental variables.
     * @returns {Array}
     * @private
     */
    getLoggers() {
        if (!this.loggers) {
            this.loggers = {
                console: new ConsoleLogger()
            };
        }
        return this.loggers;
    },

    /**
     * The middleware callback handler that is called from StashKu.
     * @param {StashKu} stashKu - The `StashKu` instance making the call.
     * @param {BaseStorageEngine} engine - The currently active storage engine.
     * @param {String} severity - The severity of the log call, either "debug", "info", "warn", or "error".
     * @param {Array} args - The arguments containing information to log.
     */
    async callback(stashKu, engine, severity, args) {
        //ensure configuration is set from StashKu, and each logger is configured.
        if (stashKu.config['@appku/stashku-log']) {
            this.config = stashKu.config['@appku/stashku-log'];
            let loggers = this.getLoggers();
            for (let key in loggers) {
                loggers[key].config = Object.assign(loggers[key].config, this.config[key]);
            }
        }
        //make the appropriate call.
        if (SUPPORTED_SEVERITIES.indexOf(severity) >= 0) {
            this[severity](...args);
        }
    },

    /**
     * Writes a "debug" severity log message.
     * @param  {...any} args - The arguments with information to be logged.
     */
    async debug(...args) {
        let loggers = this.getLoggers();
        for (let key in loggers) {
            loggers[key].debug(...args);
        }
    },

    /**
     * Writes a "info" severity log message.
     * @param  {...any} args - The arguments with information to be logged.
     */
    async info(...args) {
        let loggers = this.getLoggers();
        for (let key in loggers) {
            loggers[key].info(...args);
        }
    },

    /**
     * Writes a "warn" severity log message.
     * @param  {...any} args - The arguments with information to be logged.
     */
    async warn(...args) {
        let loggers = this.getLoggers();
        for (let key in loggers) {
            loggers[key].warn(...args);
        }
    },

    /**
     * Writes a "error" severity log message.
     * @param  {...any} args - The arguments with information to be logged.
     */
    async error(...args) {
        let loggers = this.getLoggers();
        for (let key in loggers) {
            loggers[key].error(...args);
        }
    }
};

export default LogMiddleware;