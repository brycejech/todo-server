
INSERT INTO todo_list
(uuid, title, slug, description, meta, created)

VALUES
($1, $2, $3, $4, $5, now() at time zone 'utc')

RETURNING *;
