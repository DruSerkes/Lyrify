\c
lyrify

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS favorites;

CREATE TABLE users
(
    id TEXT PRIMARY KEY
    display_name TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    product TEXT,
    img_url URL,
    accessToken TEXT,
    refreshToken TEXT NOT NULL
);


CREATE TABLE songs
(
    id TEXT PRIMARY KEY,
    artist TEXT NOT NULL,
    song TEXT NOT NULL,
    lyrics TEXT
);

CREATE TABLE favorites
(
    song_id TEXT REFERENCES songs(id),
    user_id TEXT REFERENCES users(id)
)