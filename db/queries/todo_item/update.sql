
UPDATE
    todo_item

SET
    title = $2,
    slug  = $3,
    list  = $4,
    due   = $5,

    modified = now() at time zone 'utc'

WHERE
    id = $1

RETURNING *;
