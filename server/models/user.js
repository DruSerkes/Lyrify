const db = require('../db');
const ExpressError = require('../helpers/ExpressError');
const Song = require('./song');

class User {
	/** Create a user in the DB 
     * 
     * @param {*} spotifyUserData (obj)
     * - contains id, display_name, email, product, href, img_url, access_token, refresh_token
     * @returns {user : {id, display_name, email, product, href, img_url, access_token, refresh_token}}
     */
	static async create({ id, display_name, email, product, href, img_url, access_token, refresh_token }) {
		const result = await db.query(
			`INSERT INTO users (id, display_name, email, product, href, img_url, access_token, refresh_token)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
			[ id, display_name, email, product, href, img_url, access_token, refresh_token ]
		);

		const user = result.rows[0];
		return user;
	}

	/** Get user by refresh token
	 * 
	 * @param {*} access_token (str)
	 */
	static async getByRefreshToken(refresh_token) {
		if (!refresh_token) throw new ExpressError('refresh_token required', 400);
		try {
			const result = await db.query(
				`SELECT * FROM users
				WHERE refresh_token=$1
				`,
				[ refresh_token ]
			);
			const user = result.rows[0];
			return user;
		} catch (e) {
			console.log(e);
			return undefined;
		}
	}

	/** Get user by ID
	 * 
	 * @param {*} id (str)
	 */
	static async getById(id) {
		if (!id) throw new ExpressError('id required', 400);
		const result = await db.query(
			`SELECT * FROM users
			WHERE id=$1
			`,
			[ id ]
		);
		const user = result.rows[0];

		return user;
	}

	/** Update the tokens for a user
	 * 
	 * @id {*} user id 
	 * @access_token {*} new access token
	 * @refresh_token {*} new refresh token 
	 */
	static async updateTokens(id, access_token, refresh_token) {
		if (!id || !access_token || !refresh_token) {
			throw new ExpressError('user id and new access toekn required', 400);
		}
		const result = await db.query(
			`UPDATE users
			SET access_token = ($1),
			refresh_token = ($2)
			WHERE id = $3
			RETURNING access_token, refresh_token
			`,
			[ access_token, refresh_token, id ]
		);
		if (!result.rows.length) throw new ExpressError('User not found', 404);
		return result.rows[0];
	}

	static async getFavorites(id) {
		if (!id) throw new ExpressError('user id required', 400);
		const result = await db.query(
			`SELECT s.id, s.artist, s.song
			FROM songs AS s
			JOIN favorites AS f
			ON s.id = f.song_id
			WHERE f.user_id = $1
			`,
			[ id ]
		);
		const favorites = result.rows;
		return favorites;
	}

	/** Add a favorite song for a user
	 * 
	 * @param {*} user_id 
	 * @param {*} song_id 
	 * @returns song data
	 */
	static async addFavorite(user_id, song_id) {
		if (!user_id || !song_id) throw new ExpressError('Both user_id and song_id required', 400);
		const result = await db.query(
			`INSERT INTO favorites (song_id, user_id)
			VALUES ($1, $2)
			RETURNING *
			`,
			[ song_id, user_id ]
		);
		if (!result.rows[0]) throw new ExpressError('Something went wrong with adding favorite', 500);
		const song = await Song.getById(song_id);
		return song;
	}

	/** Remove a favorite song for a user
	 * 
	 * @param {*} user_id 
	 * @param {*} song_id 
	 * @returns string 'Favorite removed'
	 */
	static async removeFavorite(user_id, song_id) {
		if (!user_id || !song_id) throw new ExpressError('Both user_id and song_id required', 400);
		const result = await db.query(
			`DELETE FROM favorites
			WHERE user_id = $1
			AND song_id = $2
			`,
			[ user_id, song_id ]
		);
		return 'Favorite removed';
	}
}

module.exports = User;
