import { NextFunction, Request, Response } from "express";
import { Customer } from "../model/customer.model";

// 4.4:
const upEmailsForHorrorRentalsInMay2005 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const customer = new Customer();
    await customer.upEmailsForHorrorRentalsInMay2005(String(id));
    const data = await customer.getEmailsForHorrorRentalsInMay2005();
    res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error?.sqlMessage || "Server error!" });
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
    const customer = new Customer();
    await customer.upAddressAllCustomers(String(id));
    const data = await customer.getAddressAllCustomers();
    res.status(200).json(data);
  } catch (error:any) {
    return res
      .status(500)
      .json({ error: error?.sqlMessage || "Server error!" });
  }
};

export default {
  upAddressAllCustomers,
  upEmailsForHorrorRentalsInMay2005
};
