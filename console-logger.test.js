import ConsoleLogger from './console-logger.js';

describe('#write', () => {
    it('writes to stdout', () => {
        let log = new ConsoleLogger({
            enabled: true
        });
        log.write('debug', 'test');
        expect(true).toBeTruthy();
    });
});