import LogMiddleware from './log-middleware.js';
import LogUtility from './log-utility.js';

describe('.severity', () => {
    it('returns the proper ordered index of severity.', () => {
        let severities = ['debug', 'info', 'warn', 'error'];
        for (let x = 0; x < severities.length; x++) {
            expect(LogUtility.severity(severities[x])).toBe(x);
        }
    });
});