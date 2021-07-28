
const SUPPORTED_SEVERITIES = ['debug', 'info', 'warn', 'error'];

export default class LogUtility {

    /**
     * Returns a ISO8601 timestamp as a string.
     * @param {Boolean} [local] - If `true`, output a local timestamp, instead of UTC.
     * @returns {String}
     * @private
     */
    static timestamp(local) {
        let ts = new Date();
        if (local) {
            let tzo = ts.getTimezoneOffset() * -1;
            return ts.getFullYear()
                + '-' + (ts.getMonth() + 1).toString().padStart(2, '0')
                + '-' + (ts.getDate()).toString().padStart(2, '0')
                + 'T' + (ts.getHours()).toString().padStart(2, '0')
                + ':' + (ts.getMinutes()).toString().padStart(2, '0')
                + ':' + (ts.getSeconds()).toString().padStart(2, '0')
                + '.' + String((ts.getMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                + (tzo < 0 ? '-' : '+')
                + (Math.abs(tzo) / 60).toFixed(0).padStart(2, '0') + ':'
                + (Math.abs(tzo) % 60).toString().padStart(2, '0');
        } else {
            return ts.getUTCFullYear()
                + '-' + (ts.getUTCMonth() + 1).toString().padStart(2, '0')
                + '-' + (ts.getUTCDate()).toString().padStart(2, '0')
                + 'T' + (ts.getUTCHours()).toString().padStart(2, '0')
                + ':' + (ts.getUTCMinutes()).toString().padStart(2, '0')
                + ':' + (ts.getUTCSeconds()).toString().padStart(2, '0')
                + '.' + String((ts.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                + 'Z';
        }
    }

    /**
     * Converts a severity (name) to a sortable number indicating the index in order of importance with all
     * severities.
     * @param {String} severity - The severity name.
     * @returns {Number}
     */
    static severity(severity) {
        return SUPPORTED_SEVERITIES.indexOf(severity);
    }

}