const db = require('../db');
const ExpressError = require('../helpers/ExpressError');

class User {
	/** Create a user in the DB 
     * 
     * @param {*} spotifyUserData (obj)
     * - container id, display_name, email, product, href, img_url, access_token, refresh_token
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

	/** Get user by access token
	 * 
	 * @param {*} access_token (str)
	 */
	static async getByAccessToken(access_token) {
		if (!access_token) throw new ExpressError('access_token required', 400);
		const result = await db.query(
			`SELECT * FROM users
			WHERE access_token=$1
			`,
			[ access_token ]
		);
		const user = result.rows[0];
		delete user.refresh_token;
		return user;
	}
}

module.exports = User;
