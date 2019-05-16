'use strict';

const db   = require('../db'),
      uuid = require('uuid/v4');

const slugify = require('../lib/slugify');

function ToDoList(o){
    this.id          = o.id;
    this.uuid        = o.uuid;
    this.title       = o.title;
    this.slug        = o.slug;
    this.description = o.description;
    this.created     = o.created;
    this.modified    = o.modified;
    this.items       = [];

    try{
        this.meta = JSON.parse(o.meta);
    }
    catch(e){
        console.log('Failed to parse meta as JSON');
        this.meta = o.meta;
    }

    return this;
}

ToDoList.prototype.save = async function saveToDoList(){
    const params = [
        this.id, this.title, slugify(this.title), this.description, this.meta
    ];

    try{
        const updated = await db.q('todo-list-update', params);

        return new ToDoList(updated);

        // this.id          = updated.id;
        // this.uuid        = updated.uuid;
        // this.title       = updated.title;
        // this.slug        = updated.slug;
        // this.description = updated.description;
        // this.meta        = updated.meta;
        // this.created     = updated.created;
        // this.modified    = updated.modified;
        //
        // return this;
    }
    catch(e){
        return false;
    }
}

ToDoList.prototype.delete = async function deleteToDoList(){
    try{
        const deleted = await db.q('todo-list-delete', [ this.id ]);

        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

ToDoList.create = async function createToDoList(o){
    if(!o.title){
        throw new Error('ToDo List must have a title');
    }

    const params = [
        uuid(), o.title, slugify(o.title), o.description, o.meta
    ];

    try{
        const result = await db.q('todo-list-create', params);

        return new ToDoList(result);
    }
    catch(e){ throw e }
}

ToDoList.getAll = async function getAllToDoLists(){
    try{
        const results = await db.q('todo-list-get-all');

        if(results.length){
            return results.map(list => new ToDoList(list));
        }
        return [];
    }
    catch(e){ throw e }
}

ToDoList.get = function getToDoLists(filter){
    if(filter.hasOwnProperty('id')){
        return ToDoList.getById(filter.id);
    }
    if(filter.hasOwnProperty('uuid')){
        return ToDoList.getByUuid(filter.uuid);
    }
    return Promise.resolve();
}

ToDoList.getById = async function getToDoListById(id){
    try{
        const result = await db.q('todo-list-get-by-id', [ id ]);

        return new ToDoList(result);
    }
    catch(e){ throw e }
}

ToDoList.getByUuid = async function getToDoListByUuid(uuid){
    try{
        const result = await db.q('todo-list-get-by-uuid', [ uuid ]);

        return new ToDoList(result);
    }
    catch(e){ throw e }
}

module.exports = ToDoList;
