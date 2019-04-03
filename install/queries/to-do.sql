
DROP TABLE IF EXISTS todo_item CASCADE;

CREATE TABLE todo_item(
    id          serial       NOT NULL PRIMARY KEY,
    uuid        char(36)     NOT NULL UNIQUE,
    title       varchar(128) NOT NULL,
    slug        varchar(128) NOT NULL,
    description text,
    complete    boolean      NOT NULL DEFAULT FALSE,

    list  int          NOT NULL REFERENCES todo_list(id),

    due      timestamp with time zone,
    created  timestamp with time zone DEFAULT (now() at time zone 'utc'),
    modified timestamp with time zone
);
