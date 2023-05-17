import { NextFunction, Request, Response } from "express";
import { Actor } from "../model/actor.model";

const getAllActorsName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getAllActorsName();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const getActorsWithMoreThan20Films = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getActorsWithMoreThan20Films();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const getActorsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getActorsByCategory();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const getActorsWithRRatingButNotGRatingMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getActorsWithRRatingButNotGRatingMovies();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const getRatedActorsLongerThan2hrsNotInGRatedFilms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getRatedActorsLongerThan2hrsNotInGRatedFilms();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const getActorsInLongPG13AndShortR = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const data = await actor.getActorsInLongPG13AndShortR();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// Example

const getNameOneControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actor = new Actor();
    const id = req.params.id;

    const data = await actor.getNameById(Number(id));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

const updateNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const actor = new Actor();
    const data = await actor.updateNameOne(Number(id), name);
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  getAllActorsName,
  getActorsWithMoreThan20Films,
  getActorsByCategory,
  getActorsWithRRatingButNotGRatingMovies,
  getRatedActorsLongerThan2hrsNotInGRatedFilms,
  getActorsInLongPG13AndShortR,
  getNameOneControl,
  updateNameController
};
