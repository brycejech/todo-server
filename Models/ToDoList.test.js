'use strict';

const { ToDoList } = require('./');
const db = require('../db');

afterAll(() => db.disconnect());

describe('ToDoItem model should fetch data', () => {

    test('It should get all ToDo lists', async () => {
        const items = await ToDoList.getAll();

        items.forEach(item => {
            expect(item instanceof ToDoList).toBe(true);
        });
    });

    test('It should get a single list by id', async () => {
        const lists = await ToDoList.getAll(),
              first = lists[0];

        const list = await ToDoList.get({ id: first.id });

        expect(list instanceof ToDoList).toBe(true);
        expect(list.id).toBe(first.id);
        expect(list.uuid).toBe(first.uuid);
    });

    test('It should get a single list by uuid', async () => {
        const lists = await ToDoList.getAll(),
              first = lists[0];

        const list = await ToDoList.get({ uuid: first.uuid });

        expect(list instanceof ToDoList).toBe(true);
        expect(list.id).toBe(first.id);
        expect(list.uuid).toBe(first.uuid);
    });

});
