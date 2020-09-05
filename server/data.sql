\c lyrify

DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS songs
CASCADE;
DROP TABLE IF EXISTS favorites
CASCADE;


CREATE TABLE users
(
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    product TEXT,
    href TEXT,
    img_url TEXT,
    access_token TEXT,
    refresh_token TEXT
);


CREATE TABLE songs
(
    id TEXT PRIMARY KEY ,
    artist TEXT NOT NULL,
    song TEXT NOT NULL,
    album_name TEXT,
    album_url TEXT,
    lyrics TEXT
);

CREATE TABLE favorites
(
    song_id TEXT REFERENCES songs(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE
)