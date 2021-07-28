import StashKu from '@appku/stashku';
import LogMiddleware from './log-middleware.js';
import jest from 'jest-mock';

const SUPPORTED_SEVERITIES = ['debug', 'info', 'warn', 'error'];
const cloneMiddleware = () => Object.assign({}, LogMiddleware);

describe('~callback', () => {
    it('only supports the "log" state.', () => {
        expect(LogMiddleware.states).toEqual(['log']);
    });
    describe('~callback', () => {
        it('is called from stashku.', async () => {
            let stash = new StashKu();
            let mw = cloneMiddleware();
            mw.callback = jest.fn(mw.callback);
            stash.use(mw);
            for (let severity of SUPPORTED_SEVERITIES) {
                await stash.middlerun('log', severity, ['message', 123]);
                expect(mw.callback).toHaveBeenCalled();
                expect(mw.callback).toHaveBeenCalledWith(stash, stash.engine, severity, ['message', 123]);
            }
        });
        it('sets logger configurations from stashku', async () => {
            let stash = new StashKu({
                '@appku/stashku-log': {
                    console: {
                        enabled: false,
                        unique: 123
                    },
                    file: {
                        enabled: false,
                        unique: 'hello'
                    }
                }
            });
            let mw = cloneMiddleware();
            mw.callback = jest.fn(mw.callback);
            stash.use(mw);            
            await stash.middlerun('log', 'debug', ['message', 123]);
            expect(mw.config.console.enabled).toBe(false);
            expect(mw.config.console.unique).toBe(123);
            expect(mw.config.file.enabled).toBe(false);
            expect(mw.config.file.unique).toBe('hello');
        });
    });
});