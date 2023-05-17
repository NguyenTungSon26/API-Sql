import actorRouter from "./router/actor.router";
import filmRouter from "./router/film.router";
import customerRouter from "./router/customer.router";

const router = require("express").Router();

// MAIN ROUTER
router.use("/actor", actorRouter);
router.use("/film", filmRouter);
router.use("/customer", customerRouter);

export default router;
