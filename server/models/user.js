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
}

module.exports = User;