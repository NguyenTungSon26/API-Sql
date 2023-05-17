import { NextFunction, Request, Response } from "express";
import { Film } from "../model/film.model";

// 4.1:
const upFilmRentalRates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // do test postman viết ở body
    const id = req.body.id;
    const film = new Film();
    await film.upFilmRentalRates(Number(id));
    const data = await film.getFilmRentalRates();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// 4.2
const upRentalDuration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalDuration(Number(id));
    const data = await film.getRentalDuration();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// 4.3
const upRentalRateOfAllFilmsTheAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalRateOfAllFilmsTheAction(Number(id));
    const data = await film.getRentalRateOfAllFilmsTheAction();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// 4.5
const upRentalRateOfAllFilmsRentedByMoreThan10Customers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalRateOfAllFilmsRentedByMoreThan10Customers(Number(id));
    const data =
      await film.getRentalRateOfAllFilmsRentedByMoreThan10Customers();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// 4.6
const upRentalRatesForPG13MoviesWithLengthOver2Hours = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalRatesForPG13MoviesWithLengthOver2Hours(Number(id));
    const data = await film.getRentalRatesForPG13MoviesWithLengthOver2Hours();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

// 4.9
const upRentalRatesComedyTheYear2006OrLater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalRatesComedyTheYear2006OrLater(Number(id));
    const data = await film.getRentalRatesComedyTheYear2006OrLater();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};
// 4.10
const upRentalRateForRatingGFilmLength1Hour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const film = new Film();
    await film.upRentalRateForRatingGFilmLength1Hour(Number(id));
    const data = await film.getRentalRateForRatingGFilmLength1Hour();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

export default {
  upFilmRentalRates,
  upRentalDuration,
  upRentalRateOfAllFilmsTheAction,
  upRentalRateOfAllFilmsRentedByMoreThan10Customers,
  upRentalRatesForPG13MoviesWithLengthOver2Hours,
  upRentalRatesComedyTheYear2006OrLater,
  upRentalRateForRatingGFilmLength1Hour,
};
