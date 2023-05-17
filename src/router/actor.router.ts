import { Router } from "express";
import actor from "../controller/actor.controller";
const actorRouter = Router();

// ROUTER
actorRouter.get("/getAllActorsName", actor.getAllActorsName);
actorRouter.get(
  "/getActorsWithMoreThan20Films",
  actor.getActorsWithMoreThan20Films
);
actorRouter.get("/getActorsByCategory", actor.getActorsByCategory);
actorRouter.get(
  "/getActorsWithRRatingButNotGRatingMovies",
  actor.getActorsWithRRatingButNotGRatingMovies
);
actorRouter.get(
  "/getRatedActorsLongerThan2hrsNotInGRatedFilms",
  actor.getRatedActorsLongerThan2hrsNotInGRatedFilms
);
actorRouter.get(
  "/getActorsInLongPG13AndShortR",
  actor.getActorsInLongPG13AndShortR
);
actorRouter.get("/:id/name", actor.getNameOneControl);
actorRouter.patch("/:id/name", actor.updateNameController);

export default actorRouter;
