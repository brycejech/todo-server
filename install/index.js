'use strict';

const db         = require('../db'),
      queries = require('./queries');

queries.forEach(q => db.queries.push(q));

const installQueries = [
    'to-do-list',
    'to-do'
];

(async () => {
    let last = Promise.resolve();
    for(let i = 0, len = installQueries.length; i < len; i++){
        await last;

        try {
            console.log(`Running query "${ installQueries[i] }"`);
            last = await db.q(installQueries[i], []);
        } catch (e) {
            console.log(`Error running install query "${ installQueries[i] }"`);
            console.log(e);
        }
    }
    await last;

    db.disconnect();
    console.log('Installation complete');
})();
