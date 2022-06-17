const router = require("koa-router");

const { verifyUser, md5Password } = require("../middleware/user.middleware")
const { create, getUserInfo, getUserAvatar } = require("../controller/user.controller")


const userRouter = new router({ prefix: "/user" })

userRouter.post("/", verifyUser, md5Password, create)
userRouter.get("/:id", getUserInfo)
userRouter.get("/:id/avatar", getUserAvatar)


module.exports = userRouter