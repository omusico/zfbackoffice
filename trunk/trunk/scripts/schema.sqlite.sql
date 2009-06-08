CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (40) NOT NULL,
    email VARCHAR(50) NOT NULL DEFAULT '',
    created DATETIME NOT NULL
);

CREATE INDEX "user_id" ON "user" ("id");



CREATE TABLE guestbook (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(32) NOT NULL DEFAULT 'noemail@test.com',
    comment TEXT NULL,
    created DATETIME NOT NULL
);

CREATE INDEX "guestbook_id" ON "guestbook" ("id");

