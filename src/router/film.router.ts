import { Router } from "express";
import film from "../controller/film.controller";
const filmRouter = Router();

// ROUTER
filmRouter.patch("/upRentalDuration", film.upRentalDuration);
filmRouter.patch("/upFilmRentalRates", film.upFilmRentalRates);
filmRouter.patch(
  "/upRentalRateOfAllFilmsTheAction",
  film.upRentalRateOfAllFilmsTheAction
);
filmRouter.patch(
  "/upRentalRateOfAllFilmsRentedByMoreThan10Customers",
  film.upRentalRateOfAllFilmsRentedByMoreThan10Customers
);
filmRouter.patch(
  "/upRentalRatesForPG13MoviesWithLengthOver2Hours",
  film.upRentalRatesForPG13MoviesWithLengthOver2Hours
);
filmRouter.patch(
  "/upRentalRatesComedyTheYear2006OrLater",
  film.upRentalRatesComedyTheYear2006OrLater
);
filmRouter.patch(
  "/upRentalRateForRatingGFilmLength1Hour",
  film.upRentalRateForRatingGFilmLength1Hour
);
export default filmRouter;
