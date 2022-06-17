const crypto = require("crypto")

const handlePassword = (password) => {
    const result = crypto.createHash("md5").update(password).digest("hex")
    return result
}

module.exports = handlePassword