const router = require("express").Router();
const userRoute = require("./userRoute");
const gameRoute = require("./gameRoute")

// When User goes to "/api/posts", use routes defined in postsRoute.js
router.use("/user", userRoute);
router.use("/game", gameRoute)

module.exports = router;
