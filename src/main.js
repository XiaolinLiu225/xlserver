const koaInstance = require("./app")
const config = require("./app/config")

koaInstance.listen(config.APP_PORT, () => {
    console.log(`Server is listening on port ${config.APP_PORT}`)
})