import { NextFunction, Request, Response } from "express";
import { Customer } from "../model/customer.model";

// 4.4:
const upEmailsForHorrorRentalsInOct2022 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Customer();
    await film.upEmailsForHorrorRentalsInOct2022(String(id));
    const data = await film.getEmailsForHorrorRentalsInOct2022();
    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      // .json({ error: error?.sqlMessage || "Server error!" });
  }
};
// 4.8:
const upAddressAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Customer();
    await film.upAddressAllCustomers(String(id));
    const data = await film.getAddressAllCustomers();
    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      // .json({ error: error?.sqlMessage || "Server error!" });
  }
};

export default {
  upAddressAllCustomers,
  upEmailsForHorrorRentalsInOct2022
};
