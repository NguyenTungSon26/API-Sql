import { Router } from "express";
import customer from "../controller/customer.controller";
const customerRouter = Router();

// ROUTER
customerRouter.patch("/upAddressAllCustomers", customer.upAddressAllCustomers);
customerRouter.patch(
  "/upEmailsForHorrorRentalsInMay2005",
  customer.upEmailsForHorrorRentalsInMay2005
);

export default customerRouter;
