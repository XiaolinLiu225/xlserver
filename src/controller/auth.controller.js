const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../app/config")

class AuthController {
    async login(ctx, next) {
        const { name, password, userid } = ctx.user
        const token = jwt.sign({ name, password }, PRIVATE_KEY, {
            expiresIn: 60 * 60,
            algorithm: "RS256"
        })
        ctx.header.authorization = token

        //向外暴露authorization属性
        ctx.set("Authorization", token)
        ctx.set("Access-Control-Expose-Headers", "Authorization")

        ctx.body = {
            userid,
            name,
            password,
            token
        }
        await next()
    }
    async success(ctx, next) {
        ctx.body = "授权成功"
    }
}


module.exports = new AuthController()