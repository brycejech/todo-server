
DROP TABLE IF EXISTS todo_list CASCADE;

CREATE TABLE todo_list(
    id    serial       NOT NULL PRIMARY KEY,
    uuid  char(36)     NOT NULL UNIQUE,
    title varchar(128) NOT NULL UNIQUE,
    slug  varchar(128) NOT NULL UNIQUE,

    created  timestamp with time zone DEFAULT (now() at time zone 'utc'),
    modified timestamp with time zone
);
