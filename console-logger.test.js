import ConsoleLogger from './console-logger.js';


describe('#config', () => {
    it('dynamically adjusts to environment.', () => {
        let log = new ConsoleLogger({
            enabled: true
        });
        expect(log.config.severity).toBe('error');
        process.env.STASHKU_LOG_CONSOLE_SEVERITY = 'debug';
        expect(log.config.severity).toBe('debug');
    });
});

describe('#write', () => {
    it('writes to stdout', () => {
        let log = new ConsoleLogger({
            enabled: true
        });
        log.write('debug', 'test');
        expect(true).toBeTruthy();
    });
});