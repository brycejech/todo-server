'use strict';

const db      = require('../db'),
      uuid    = require('uuid/v4'),
      slugify = require('../lib/slugify');

function ToDoItem(o){
    this.id          = o.id;
    this.uuid        = o.uuid;
    this.title       = o.title;
    this.slug        = o.slug;
    this.description = o.description;
    this.complete    = o.complete;
    this.completedOn = o.completed_on;
    this.list        = o.list;
    this.due         = o.due;
    this.created     = o.created;
    this.modified    = o.modified;

    try{
        this.meta = JSON.parse(o.meta);
    }
    catch(e){
        this.meta = o.meta;
    }

    return this;
}

ToDoItem.prototype.save = async function saveToDoItem(){
    const params = [
        this.id, this.title, slugify(this.title), this.description,
        this.complete, this.list, this.due || null, this.meta || null
    ];

    try{
        const updated = await db.query('todo-item-update', params);

        return new ToDoItem(updated);
    }
    catch(e){
        console.log(e);
        return false;
    }
}

ToDoItem.prototype.delete = async function deleteToDoItem(){
    try{
        const deleted = await db.query('todo-item-delete', [ this.id ]);

        return true;
    }
    catch(e){
        return false;
    }
}

ToDoItem.create = async function createToDoItem(o){
    if(!(o.title && o.list)){
        throw new Error('Title and list are required');
    }

    const params = [
        uuid(), o.title, slugify(o.title), o.description, o.list, o.meta
    ];

    try{
        const result = await db.q('todo-item-create', params);

        return new ToDoItem(result);
    }
    catch(e){ throw e }
}

ToDoItem.getAll = async function getAllToDoItems(){
    try{
        const results = await db.q('todo-item-get-all', []),
              items   = results.map(item => new ToDoItem(item));

        return items;
    }
    catch(e){ throw e }
}

ToDoItem.get = function getToDoItems(filter){
    if(filter.hasOwnProperty('list')){
        return ToDoItem.getByList(filter.list);
    }
    if(filter.hasOwnProperty('id')){
        return ToDoItem.getById(filter.id);
    }
    if(filter.hasOwnProperty('uuid')){
        return ToDoItem.getByUuid(filter.uuid);
    }
    return Promise.resolve({});
}

ToDoItem.getByList = async function getToDoItemByList(listId){
    try{
        const results = await db.q('todo-item-get-by-list', [ listId ]),
              items   = results.map(item => new ToDoItem(item));

        return items;
    }
    catch(e){ throw e }
}

ToDoItem.getById = async function getToDoItemById(id){
    try{
        const result = await db.q('todo-item-get-by-id', [ id ]);

        if(result){
            return new ToDoItem(result);
        }
    }
    catch(e){ throw e }
}

ToDoItem.getByUuid = async function getToDoItemByUuid(uuid){
    try{
        const result = await db.q('todo-item-get-by-uuid', [ uuid ]);

        if(result){
            return new ToDoItem(result);
        }
    }
    catch(e){ throw e }
}

module.exports = ToDoItem;
