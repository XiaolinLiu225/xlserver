const service = require("../service/user.service")
const errType = require("../constant/error_type")
const handlePassword = require("../utils/handle-password")


const md5Password = async(ctx, next) => {
    const { password } = ctx.request.body
    if (password) {
        ctx.request.body.password = handlePassword(password)
    }
    await next()
}
const verifyUser = async(ctx, next) => {
    //获取用户名和密码
    const { name, password } = ctx.request.body
    console.log(ctx.request.body);
    //判断用户名和密码是否符合规范
    if (!name || !password) {
        const err = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", err, ctx)
    }

    //判断用户名是否已经在数据库中存在
    const result = await service.getUserByName(name)
        //调用next函数执行下一个中间件
    if (result.length > 0) {
        const err = new Error(errType.USER_ALREADY_EXIST)
        return ctx.app.emit("error", err, ctx)
    } else {

        await next()
    }




}


module.exports = {
    verifyUser,
    md5Password
}