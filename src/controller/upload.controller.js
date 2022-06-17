const { saveAvatar } = require("../service/file.service")
const { updateUserAvatar } = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class UploadController {
    async saveAvatar(ctx, next) {
        try {
            const { filename, mimetype, size } = ctx.req.file
            await saveAvatar(filename, mimetype, size, 4);
            await updateUserAvatar(4, `${APP_HOST}:${APP_PORT}/user/4/avatar`)
            ctx.body = "头像上传成功";
            await next();
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = new UploadController();