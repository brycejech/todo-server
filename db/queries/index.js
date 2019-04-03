'use strict';

const fs   = require('fs'),
      path = require('path');

const files = [
    // ToDo Items
    {
        name: 'todo-item-create',
        file: 'todo_item/create.sql',
        firstRow: true
    },
    {
        name: 'todo-item-get-all',
        file: 'todo_item/get-all.sql'
    },
    {
        name: 'todo-item-get-by-list',
        file: 'todo_item/get-by-list.sql'
    },
    {
        name: 'todo-item-get-by-uuid',
        file: 'todo_item/get-by-uuid.sql',
        firstRow: true
    },
    {
        name: 'todo-item-get-by-id',
        file: 'todo_item/get-by-id.sql',
        firstRow: true
    },
    {
        name: 'todo-item-delete',
        file: 'todo_item/delete.sql'
    },
    {
        name: 'todo-item-update',
        file: 'todo_item/update.sql',
        firstRow: true
    },
    // ToDo Lists
    {
        name: 'todo-list-create',
        file: 'todo_list/create.sql',
        firstRow: true
    },
    {
        name: 'todo-list-get-all',
        file: 'todo_list/get-all.sql'
    },
    {
        name: 'todo-list-get-by-id',
        file: 'todo_list/get-by-id.sql',
        firstRow: true
    },
    {
        name: 'todo-list-get-by-uuid',
        file: 'todo_list/get-by-uuid.sql',
        firstRow: true
    },
    {
        name: 'todo-list-delete',
        file: 'todo_list/delete.sql'
    },
    {
        name: 'todo-list-update',
        file: 'todo_list/update.sql',
        firstRow: true
    }
];

const queries = files.reduce((acc, f) => {
    try{
        f.sql = fs.readFileSync(path.resolve(__dirname, f.file), 'utf8');
        acc.push(f);
    }
    catch(e){
        console.log(`Error loading query file "${ f.file }"`);
    }

    return acc;
}, []);

module.exports = queries;
