'use strict';

const fs   = require('fs'),
      path = require('path');

const files = [
    {
        name: 'to-do-list',
        file: 'to-do-list.sql'
    },
    {
        name: 'to-do',
        file: 'to-do.sql'
    }
];

const queries = files.reduce((acc, f) => {
    try{
        f.sql = fs.readFileSync(path.resolve(__dirname, f.file), 'utf8');
        acc.push(f);
    }
    catch(e){
        console.log(`Error loading install query "${ f.name }"`);
    }

    return acc;
}, []);

module.exports = queries;
