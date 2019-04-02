'use strict';

const { ToDoItem, ToDoList } = require('./');
const db = require('../db');

afterAll(() => db.disconnect());

describe('ToDoItem model should fetch data', () => {

    test('It should getAll ToDo items', async () => {
        const items = await ToDoItem.getAll();

        items.forEach(item => {
            expect(item instanceof ToDoItem).toBe(true);
        });
    });

    test('It should get a single item by id', async () => {
        const items = await ToDoItem.getAll(),
              first = items[0];

        const item = await ToDoItem.get({ id: first.id });

        expect(item instanceof ToDoItem).toBe(true);
        expect(item.id).toBe(first.id);
    });

    test('It should get a single item by uuid', async () => {
        const items = await ToDoItem.getAll(),
              first = items[0];

        const item = await ToDoItem.get({ uuid: first.uuid });

        expect(item instanceof ToDoItem).toBe(true);
        expect(item.guid).toBe(first.guid);
    });

    test('It sould get an item by list id', async () => {
        const items = await ToDoItem.getAll(),
              first = items[0];

        const listItems = await ToDoItem.getByList(first.list);

        const found = listItems.filter(item => item.id === first.id)[0];

        expect(found.id).toBe(first.id);
        expect(found.uuid).toBe(first.uuid);
        expect(found.list).toBe(first.list);
    });

});
