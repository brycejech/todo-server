
UPDATE
    todo_item

SET
    title       = $2,
    slug        = $3,
    description = $4,
    complete    = $5,
    list        = $6,
    due         = $7,

    modified = now() at time zone 'utc'

WHERE
    id = $1

RETURNING *;
