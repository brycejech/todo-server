
SELECT
    id,
    uuid,
    title,
    slug,
    created,
    modified

FROM
    todo_list

WHERE
    id=$1
;
