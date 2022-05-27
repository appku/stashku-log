import StashKu, { Filter } from '../node_modules/@appku/stashku/stashku.js';
import Log from '../log-middleware.js';

(async () => {
    let stash = new StashKu({
        '@appku/stashku-log': {
            console: {
                enabled: true,
                severity: null,
                colors: true,
                timestamp: true,
                local: true
            }
        }
    });
    stash.use(Log);
    stash.log.debug('Look ma! A debug message.');
    stash.log.info('Look ma! An info message.');
    stash.log.warn('Look ma! A warn message.');
    stash.log.error('Look ma! An error message.');
    let res = await stash.post(r => r
        .to('Contacts')
        .objects(
            { FirstName: 'John', LastName: 'Gilicutty', Title: 'Horseman' },
            { FirstName: 'Breen', LastName: 'Kolka', Title: 'Gerbil' },
            { FirstName: 'Kibble', LastName: 'Yipple', Title: 'Programmer' }
        )
    );
    stash.log.info(res);
})();