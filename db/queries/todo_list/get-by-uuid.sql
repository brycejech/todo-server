
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
    uuid=$1
;
