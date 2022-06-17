const connection = require("../app/database")
class FileService {
    async saveAvatar(filename, mimetype, size, userid) {
        const statement = `INSERT INTO avatar (filename, mime_type, size,user_id) VALUES (?, ?, ?,?);`
        const result = await connection.execute(statement, [filename, mimetype, size, userid]);
        return result;
    }

}
module.exports = new FileService()