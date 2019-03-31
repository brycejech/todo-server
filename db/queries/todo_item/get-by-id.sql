
SELECT
    id,
    uuid,
    title,
    slug,
    list,
    due,
    created,
    modified

FROM
    todo_item

WHERE
    id=$1
;
