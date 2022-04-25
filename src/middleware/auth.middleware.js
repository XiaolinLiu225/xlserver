const jwt = require("jsonwebtoken")

const md5 = require("../utils/handle-password")
const service = require("../service/user.service")
const errType = require("../constant/error_type")
const { PUBLIC_KEY } = require("../app/config")

const authPwd = async(ctx, next) => {
    const { name, password } = ctx.request.body
    if (!name || !password) {
        const err = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", err, ctx)
    }
    const result = await service.getUserByName(name)
    const user = result[0]
    const userid = user.id
    if (!user) {
        const err = new Error(errType.USER_DOSE_NOT_EXIST)
        return ctx.app.emit("error", err, ctx)
    } else {
        if (md5(password) === user.password) {
            ctx.user = { name, password, userid }
            await next()
        } else {
            const err = new Error(errType.PASSWORD_IS_WRONG)
            return ctx.app.emit("error", err, ctx)
        }

    }
}

const verifyAuth = async(ctx, next) => {
    console.log(ctx.header);
    const authorization = ctx.header.authorization
    if (!authorization) {
        const err = new Error(errType.AUTH_IS_REQUIRED)
        return ctx.app.emit("error", err, ctx)
    }
    try {
        const result = jwt.verify(authorization, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })

        ctx.user = result
        await next()
    } catch (error) {
        console.log(error.message);
        ctx.body = {
            code: 1001,
            msg: "授权已失效，请重新登录"
        }
    }

}

module.exports = {
    authPwd,
    verifyAuth
}