'use strict';

const db   = require('../db'),
      uuid = require('uuid/v4');

const slugify = require('../lib/slugify');

function ToDoList(o){
    this.id       = o.id;
    this.uuid     = o.uuid;
    this.title    = o.title;
    this.slug     = o.slug;
    this.created  = o.created;
    this.modified = o.modified;

    return this;
}

ToDoList.create = async function createToDoList(o){
    if(!o.title){
        throw new Error('ToDo List must have a title');
    }

    const params = [
        uuid(), o.title, slugify(o.title)
    ];

    try{
        const result = await db.q('todo-list-create', params);

        return new ToDoList(result);
    }
    catch(e){ throw e }
}

module.exports = ToDoList;
