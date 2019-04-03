
UPDATE
    todo_list

SET
    title = $2,
    slug  = $3,
    
    modified = now() at time zone 'utc'

WHERE
    id=$1

RETURNING *;
