const errType = require("../constant/error_type")

const errorHandler = (err, ctx) => {
    let status, message
    console.log(err.message, ctx.request.body);
    switch (err.message) {
        case errType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "用户名或密码不能为空";
            break;
        case errType.USER_ALREADY_EXIST:
            status = 409;
            message = "用户名已经存在";
            break;
        case errType.USER_DOSE_NOT_EXIST:
            status = 409;
            message = "用户名不存在";
            break;
        case errType.PASSWORD_IS_WRONG:
            status = 400;
            message = "密码错误";
            break;
        case errType.AUTHORIZATION_IS_EXPIRED:
            status = 400;
            message = "授权过期,请重新登录";
            break;
        default:
            status = 404;
            message = "Not Found";
    }
    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandler;