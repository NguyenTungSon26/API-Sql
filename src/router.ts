import test from "./controller/actor.controller";
import actorRouter from "./router/actor.router";

const router = require("express").Router();

// Router
router.use('/actor', actorRouter);

export default router;
