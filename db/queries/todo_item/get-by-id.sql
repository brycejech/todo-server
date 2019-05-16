
SELECT
    id,
    uuid,
    title,
    slug,
    description,
    meta,
    complete,
    completed_on,
    list,
    due,
    created,
    modified

FROM
    todo_item

WHERE
    id=$1
;
