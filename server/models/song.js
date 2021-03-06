const db = require('../db');
const ExpressError = require('../helpers/ExpressError');
const { v4: uuidv4 } = require('uuid');

class Song {
	/** Creates song in DB - if song already exists, returns existing entry
     * 
     * @songData {OBJ} - id, artist, song, album_name, album_url, img_url, lyrics  
     */
	static async create({ id = null, artist, song, album_name = null, album_url = null, img_url = null, lyrics }) {
		if (!id) id = uuidv4();

		const duplicateSong = await db.query(
			`SELECT * 
        FROM songs 
        WHERE id = $1`,
			[ id ]
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

	/** Get song by id
	 * 
	 * @id {str} - song id 
	 */
	static async getById(id) {
		const result = await db.query(
			`SELECT *
         FROM songs
         WHERE id = $1`,
			[ id ]
		);

		const songData = result.rows[0];

		if (!songData) throw new ExpressError('Song not found', 404);

		return songData;
	}
}

module.exports = Song;
