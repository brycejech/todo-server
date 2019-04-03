
INSERT INTO todo_item
(uuid, title, slug, description, list, created)

VALUES
($1, $2, $3, $4, $5, now() at time zone 'utc')

RETURNING *;
