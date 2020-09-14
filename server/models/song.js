const db = require('../db');
const ExpressError = require('../helpers/ExpressError');

class Song {
	static async create({ id = null, artist, song, album_name = null, album_url = null, img_url = null, lyrics }) {
		const duplicateSong = await db.query(
			`SELECT * 
        FROM songs 
        WHERE lyrics = $1`,
			[ lyrics ]
		);

		if (duplicateSong.rows[0]) return duplicateSong.rows[0];

		const result = await db.query(
			`INSERT INTO songs (id, artist, song, album_name, album_url, img_url, lyrics)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
                `,
			[ id, artist, song, album_name, album_url, img_url, lyrics ]
		);
		const newSong = result.rows[0];
		return newSong;
	}
}
