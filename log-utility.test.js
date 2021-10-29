import LogUtility from './log-utility.js';

describe('.timestamp', () => {
    it('returns a ISO8601 UTC timestamp by default.', () => {
        expect(LogUtility.timestamp()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/);
    });
    it('returns a ISO8601 local timestamp by default.', () => {
        expect(LogUtility.timestamp(true)).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+-\d{2}(?::\d{2})$/);
    });
});

describe('.severity', () => {
    it('returns the proper ordered index of severity.', () => {
        let severities = ['debug', 'info', 'warn', 'error'];
        for (let x = 0; x < severities.length; x++) {
            expect(LogUtility.severity(severities[x])).toBe(x);
        }
    });
});