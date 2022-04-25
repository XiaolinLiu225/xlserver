const jimp = require('jimp')
const path = require('path')
const multer = require("koa-multer")

const { AVATAR_PATH } = require("../constant/file-path")
const avatarUpload = multer({ dest: AVATAR_PATH })
const avatarHandler = avatarUpload.single("avatar")

const resizePhoto = async(ctx, next) => {
    try {
        const file = ctx.req.file
        const destPath = path.join(file.destination, file.filename)
        jimp.read(file.path).then(image => {
            image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, jimp.AUTO).write(`${destPath}-common`)
            image.resize(320, jimp.AUTO).write(`${destPath}-small`)
        })
        await next()

    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    avatarHandler,
    resizePhoto
}