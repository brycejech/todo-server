
INSERT INTO todo_list
(uuid, title, slug, created)

VALUES
($1, $2, $3, now() at time zone 'utc')

RETURNING *;
