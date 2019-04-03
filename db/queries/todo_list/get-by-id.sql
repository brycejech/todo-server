
SELECT
    id,
    uuid,
    title,
    slug,
    description,
    created,
    modified

FROM
    todo_list

WHERE
    id=$1
;
