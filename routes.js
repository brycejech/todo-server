'use strict';

const router = require('express').Router(),
      Models = require('./Models');

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
        const lists = await Models.ToDoList.getAll();

        return res.json(lists);
    }
    catch(e){
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

// Get list by ID
router.get('/lists/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const list = await Models.ToDoList.get({ id });

        if(!list){
            return res.status(404).json({
                message: 'Not found'
            });
        }

        return res.json(list);
    }
    catch(e){
        return res.status(500).json({
            message: 'Server error'
        });
    }
});


/*
    -------------------
    Item Related Routes
    -------------------
*/

// Get all items
router.get('/items', async (req, res, next) => {
    try{
        const items = await Models.ToDoItem.getAll();

        return res.json(items);
    }
    catch(e){
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

// Get item by ID
router.get('/items/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const item = await Models.ToDoItem.get({ id });

        if(!item){
            return res.status(404).json({
                message: 'Not found'
            });
        }

        return res.json(item);
    }
    catch(e){
        return res.status(500).json({
            message: 'Server error'
        });
    }
});


module.exports = router;
