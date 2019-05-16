
SELECT
    id,
    uuid,
    title,
    slug,
    description,
    meta,
    created,
    modified

FROM
    todo_list

WHERE
    uuid=$1
;
