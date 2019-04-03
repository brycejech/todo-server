
INSERT INTO todo_list
(uuid, title, slug, description, created)

VALUES
($1, $2, $3, $4, now() at time zone 'utc')

RETURNING *;
