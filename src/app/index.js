const koa = require("koa")
const bodyParser = require("koa-bodyparser")
const userRouter = require("../router/user.router")
const loginRouter = require("../router/login.router")
const fileRouter = require("../router/file.router")
const errorHandler = require("./error-handler")
const cors = require("koa-cors")


const koaInstance = new koa()

koaInstance.use(cors())
koaInstance.use(bodyParser({
    enableTypes: ["json", "form", "text"],
    formLimit: "20mb",
}))
koaInstance.use(userRouter.routes())
koaInstance.use(loginRouter.routes())
koaInstance.use(fileRouter.routes())
koaInstance.use(userRouter.allowedMethods())

koaInstance.on("error", (err, ctx) => {
    errorHandler(err, ctx)
})

module.exports = koaInstance