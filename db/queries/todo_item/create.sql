
INSERT INTO todo_item
(uuid, title, slug, list, created)

VALUES
($1, $2, $3, $4, now() at time zone 'utc')

RETURNING *;
