
UPDATE
    todo_item

SET
    title       = $2,
    slug        = $3,
    description = $4,
    complete    = $5,
    list        = $6,
    due         = $7,
    meta        = $8,
    modified    = now() at time zone 'utc'

    completed_on =
        CASE
            WHEN $5 IS TRUE AND completed_on IS NULL     THEN now() at time zone 'utc'
            WHEN $5 IS TRUE AND completed_on IS NOT NULL THEN completed_on
            ELSE NULL
        END,

WHERE
    id = $1

RETURNING *;
