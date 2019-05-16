
DROP TABLE IF EXISTS todo_list CASCADE;

CREATE TABLE todo_list(
    id          serial       NOT NULL PRIMARY KEY,
    uuid        char(36)     NOT NULL UNIQUE,
    title       varchar(128) NOT NULL,
    slug        varchar(128) NOT NULL,
    description text,
    meta        text,

    created  timestamp with time zone DEFAULT (now() at time zone 'utc'),
    modified timestamp with time zone
);
