const fs = require('fs')
const { AVATAR_PATH } = require("../constant/file-path")
const service = require('../service/user.service');

class UserController {
    async create(ctx, next) {
        //获取用户请求传递过来的参数
        const user = ctx.request.body
            // 查询数据
        const result = await service.createUser(user)
            // 返回结果
        ctx.body = result
    }
    async getUserInfo(ctx, next) {
        const id = ctx.params.id
        const result = await service.getUserById(id)
        ctx.body = result
    }
    async getUserAvatar(ctx, next) {
        try {
            const id = ctx.params.id
            const size = ctx.query.size || '';
            ctx.response.set('Content-Type', 'image/jpeg')
            const result = await service.getUserAvatar(id)
            switch (size) {
                case 'large':
                    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}-large`)
                    break;
                case 'common':
                    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}-common`)
                    break;
                case 'small':
                    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}-small`)
                    break;
                default:
                    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController()