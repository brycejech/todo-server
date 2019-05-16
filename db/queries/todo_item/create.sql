
INSERT INTO todo_item
(uuid, title, slug, description, list, meta, created)

VALUES
($1, $2, $3, $4, $5, $6, now() at time zone 'utc')

RETURNING *;
