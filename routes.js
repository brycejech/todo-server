'use strict';

const router  = require('express').Router(),
      Models  = require('./Models'),
      slugify = require('./lib/slugify');

const { ToDoListService }     = require('./services'),
      { sendError, notFound } = require('./lib/http-helper');

router.get('/', (req, res, next) => {
    return res.json({ message: 'ToDo Application Server' });
});

router.get('/healthcheck', (req, res, next) => {
    return res.json({ message: 'OK' });
});

/*
    -------------------
    List Related Routes
    -------------------
*/

// Get all lists
router.get('/lists', async (req, res, next) => {
    try{
        return res.json(await ToDoListService.getAllLists());
    }
    catch(e){ return sendError(res, e) }
});

// Get list by ID
router.get('/lists/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const list = await Models.ToDoList.get({ id });

        return list ? res.json(list) : notFound(res);
    }
    catch(e){ return sendError(res, e) }
});

router.post('/lists', async (req, res, next) => {
    const { title, description, meta } = req.body;

    if(!title){
        return res.status(400).json({
            message: 'Title is required'
        });
    }

    try{
        const list = await Models.ToDoList.create({ title, description, meta });

        return res.status(201).json(list);
    }
    catch(e){ return sendError(res, e) }
});

router.put('/lists/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const list = await Models.ToDoList.get({ id });

        if(!list){ return notFound(res) }

        const allowedProps = [ 'title', 'description', 'meta' ];

        allowedProps.forEach(prop => {
            if(req.body.hasOwnProperty(prop)){
                if(prop === 'meta'){
                    if(typeof req.body.meta !== 'string'){
                        try{
                            list.meta = JSON.stringify(req.body.meta);
                        }
                        catch(e){
                            list.meta = req.body.meta;
                        }
                    }
                }
                else{
                    list[prop] = req.body[prop];
                }
            }
        });

        const updated = await list.save();
        if(updated){
            return res.json(updated);
        }

        return sendError(res, new Error('List not updated'));
    }
    catch(e){ return sendError(res, e) }
});

router.delete('/lists/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const list = await Models.ToDoList.get({ id });

        if(!list){ return notFound(res) }

        return res.json({ delted: await list.delete() });
    }
    catch(e){ return sendError(res, e) }
});

// Delete a list
router.delete('/lists/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const list = await Models.ToDoList.get({ id });

        if(!list){ return notFound(res) }

        return res.json({ success: await list.delete() });
    }
    catch(e){ return sendError(res, e) }
});


/*
    -------------------
    Item Related Routes
    -------------------
*/

// Get all items
router.get('/items', async (req, res, next) => {
    try{
        return res.json(await Models.ToDoItem.getAll());
    }
    catch(e){ return sendError(res, e) }
});

// Get item by ID
router.get('/items/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const item = await Models.ToDoItem.get({ id });

        if(!item){ return notFound(res) }

        return res.json(item);
    }
    catch(e){ return sendError(res, e) }
});

router.post('/items', async (req, res, next) => {
    const { title, list, description, meta } = req.body;

    if(!(list && title)){
        return res.status(400).json({
            message: 'Title and List are required'
        });
    }

    try{
        const item = await Models.ToDoItem.create({ title, list, description, meta });

        return res.status(201).json(item);
    }
    catch(e){ return sendError(res, e) }
});

router.put('/items/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const item = await Models.ToDoItem.get({ id });

        if(!item){ return notFound(res) }

        // Only allow certain props to be set by user
        const allowedProps = [
            'title', 'description', 'complete', 'due', 'meta'
        ];
        allowedProps.forEach(prop => {
            if(req.body.hasOwnProperty(prop)){
                item[prop] = req.body[prop];
            }
        });

        const updated = await item.save();
        if(updated){
            return res.json(updated);
        }

        return sendError(res, new Error('Item not updated'));
    }
    catch(e){ return sendError(res, e) }
});

router.delete('/items/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const item = await Models.ToDoItem.get({ id });

        if(!item){ return notFound(res) }

        return res.json({ success: await item.delete() });
    }
    catch(e){ return sendError(res, e) }
});


module.exports = router;
