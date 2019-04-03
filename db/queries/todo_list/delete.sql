
WITH tmp AS
(
    DELETE FROM
        todo_item
    WHERE
        list=$1
)

DELETE FROM
    todo_list
WHERE
    id=$1;
