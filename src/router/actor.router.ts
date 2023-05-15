import { Router } from "express";
import actor from "../controller/actor.controller";
const actorRouter = Router();

actorRouter.get("/name", actor.query1);
actorRouter.get("/:id/name", actor.getNameOneControl);
actorRouter.patch("/:id/name", actor.updateNameController);
export default actorRouter;
