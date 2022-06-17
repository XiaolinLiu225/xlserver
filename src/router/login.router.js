 const router = require("koa-router");
 const { authPwd, verifyAuth } = require("../middleware/auth.middleware");
 const { login } = require("../controller/auth.controller")

 const loginRouter = new router({ prefix: "/login" });
 loginRouter.post("/", authPwd, login)



 module.exports = loginRouter;