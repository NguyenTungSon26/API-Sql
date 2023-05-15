import { NextFunction, Request, Response } from "express";
import { Actor } from "../model/actor.model";

const query1 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const actor = new Actor();
    const data = await actor.getName();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

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
export default { query1, getNameOneControl, updateNameController };
