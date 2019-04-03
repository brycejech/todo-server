
SELECT
    id,
    uuid,
    title,
    slug,
    description,
    complete,
    list,
    due,
    created,
    modified

FROM
    todo_item

WHERE
    id=$1
;
