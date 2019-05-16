
DROP TABLE IF EXISTS todo_item CASCADE;

CREATE TABLE todo_item(
    id          serial       NOT NULL PRIMARY KEY,
    uuid        char(36)     NOT NULL UNIQUE,
    list        int          NOT NULL REFERENCES todo_list(id),
    title       varchar(128) NOT NULL,
    slug        varchar(128) NOT NULL,
    description text,
    meta        text,
    complete    boolean      NOT NULL DEFAULT FALSE,

    completed_on timestamp with time zone,
    due          timestamp with time zone,
    created      timestamp with time zone DEFAULT (now() at time zone 'utc'),
    modified     timestamp with time zone
);
