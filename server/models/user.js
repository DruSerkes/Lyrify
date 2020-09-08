const db = require('../db');
const ExpressError = require('../helpers/ExpressError');

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

	/** Get user by access token
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
}

module.exports = User;
