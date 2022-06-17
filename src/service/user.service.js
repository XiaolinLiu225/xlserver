const connection = require("../app/database")
class UserService {
    async createUser(user) {
        const { name, password } = user;
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]);
        return result;
    }
    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name])
        return result[0];
    }
    async getUserById(id) {
        const statement = `SELECT * FROM user WHERE id = ?;`;
        const result = await connection.execute(statement, [id])
        return result[0][0];
    }
    async updateUserAvatar(id, filename) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const result = await connection.execute(statement, [filename, id]);
        return result;
    }
    async getUserAvatar(id) {
        const statement = `SELECT * FROM avatar  WHERE user_id = ? ORDER BY ID desc LIMIT 1;`;
        const result = await connection.execute(statement, [id])
        console.log(result);
        return result[0][0];
    }
}

module.exports = new UserService();