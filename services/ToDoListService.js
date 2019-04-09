'use strict';

const { ToDoItem, ToDoList } = require('../Models');

async function getAllLists(){
    try{
        const lists = await ToDoList.getAll(),
              items = await ToDoItem.getAll();

        const _getList = makeCache();

        items.forEach(item => {
            const list = _getList(lists, item.list);

            if(!list) return;

            list.items = list.items || [];
            list.items.push(item);
        });
        
        return lists;
    }
    catch(e){ throw e }
}

// List ID cache
function makeCache(){
    const cache = {};

    return function _getList(lists, id){
        if(cache[`_${ id }`]) return cache[`_${ id }`];

        const list = lists.filter(item => item.id === id)[0];

        return cache[`_${ id }`] = list;
    }
}

module.exports = {
    getAllLists
}
