import { Router } from "express";
import customer from "../controller/customer.controller";
const customerRouter = Router();

// ROUTER
customerRouter.patch("/upAddressAllCustomers", customer.upAddressAllCustomers);
customerRouter.patch(
  "/upEmailsForHorrorRentalsInOct2022",
  customer.upEmailsForHorrorRentalsInOct2022
);

export default customerRouter;
