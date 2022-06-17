const router = require("koa-router");
const { avatarHandler, resizePhoto } = require("../middleware/file.middleware")
const { verifyAuth } = require("../middleware/auth.middleware")
const fileRouter = new router({ prefix: "/upload" });
const { saveAvatar } = require("../controller/upload.controller")

fileRouter.post("/avatar", verifyAuth, avatarHandler, resizePhoto, saveAvatar)


module.exports = fileRouter;