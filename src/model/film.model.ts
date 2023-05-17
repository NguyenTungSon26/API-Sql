import { pool } from "../database";

interface IFilm {
  first_name: string;
  last_name: string;
}

export class Film {
  async query(sql: string, params?: Array<string | number>) {
    try {
      const promisePool = pool.promise();
      const [rows] = await promisePool.query(sql, [...(params || [])]);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //4.1: Write a SQL query to update the rental rate of all films in the database sakila that have been rented more than 100 times, setting the new rental rate to be 10% higher than the current rate -> Viết truy vấn SQL để cập nhật giá thuê của tất cả các phim trong cơ sở dữ liệu sakila đã được thuê hơn 100 lần,

  // UPDATE
  upFilmRentalRates(rate: number) {
    console.log(rate);
    const sql = `UPDATE film 
    SET rental_rate = rental_rate * ?
    WHERE film_id IN (
      SELECT inventory.film_id 
      FROM rental
      JOIN inventory ON rental.inventory_id = inventory.inventory_id
      GROUP BY inventory.film_id 
      HAVING COUNT(*) > 10
    );`;
    return this.query(sql, [rate]);
  }

  // SELECT
  getFilmRentalRates() {
    const sql = `SELECT film_id, title, rental_rate 
    FROM film 
    WHERE film_id IN (
      SELECT inventory.film_id 
      FROM rental
      JOIN inventory ON rental.inventory_id = inventory.inventory_id
      GROUP BY inventory.film_id 
      HAVING COUNT(*) > 10
    ) 
    ORDER BY film_id;`;
    return this.query(sql);
  }

  // 4.2: Write a SQL query to update the rental duration of all films in the database sakila that have been rented more than 5 times, setting the new duration to be 5% longer than the current duration.
  // Viết truy vấn SQL để cập nhật thời lượng thuê của tất cả các phim trong cơ sở dữ liệu đã được thuê hơn 5 lần, đặt thời lượng mới dài hơn 5% so với thời lượng hiện tại.

  // UPDATE
  upRentalDuration(rentalDuration: number) {
    const sql = `
    UPDATE film
    SET rental_duration = ROUND(rental_duration * ?)
    WHERE film_id IN (
    SELECT film_id
    FROM rental
    GROUP BY film_id
    HAVING COUNT(rental_id) > 5
    );`;
    return this.query(sql, [rentalDuration]);
  }
  getRentalDuration() {
    const sql = `
    SELECT film_id, rental_duration
FROM film
WHERE film_id IN
(SELECT film_id
FROM rental
GROUP BY film_id
HAVING COUNT(rental_id) > 5);`;
    return this.query(sql);
  }

  // 4.3: Write a SQL query to update the rental rate of all films in the 'Action' category that were released before the year 2005, setting the new rate to be 20% higher than the current rate.
  // Viết truy vấn SQL để cập nhật giá thuê của tất cả các phim trong danh mục 'Hành động' được phát hành trước năm 2005, đặt giá mới cao hơn 20% so với giá hiện tại.

  upRentalRateOfAllFilmsTheAction(rentalRate: number) {
    const sql = `
    UPDATE film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
SET f.rental_rate = round(f.rental_rate * ?, 2)
WHERE c.name = 'Action' AND f.release_year < 2007;`;
    return this.query(sql, [rentalRate]);
  }

  getRentalRateOfAllFilmsTheAction() {
    const sql = `
    SELECT f.film_id, f.title, f.rental_rate, f.release_year
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Action' AND f.release_year < 2007;`;
    return this.query(sql);
  }

  // 4.5: Write a SQL query to update the rental rate of all films in the database that have been rented by more than 10 customers, setting the new rate to be 5% higher than the current rate, but not higher than $4.00.
  // Viết truy vấn SQL để cập nhật giá thuê của tất cả các phim trong cơ sở dữ liệu đã được hơn 10 khách hàng thuê, đặt giá mới cao hơn 5% so với giá hiện tại, nhưng không cao hơn $4,00.

  upRentalRateOfAllFilmsRentedByMoreThan10Customers(rentalRate: number) {
    const sql = `
    UPDATE film
  SET rental_rate = LEAST(rental_rate * ?, 4.00)
  WHERE film_id IN (
  SELECT inventory.film_id
  FROM rental
  JOIN inventory ON rental.inventory_id = inventory.inventory_id
  GROUP BY inventory.film_id
  HAVING COUNT(DISTINCT rental.customer_id) > 10
  );`;
    return this.query(sql, [rentalRate]);
  }

  getRentalRateOfAllFilmsRentedByMoreThan10Customers() {
    const sql = `
    SELECT rental_rate
  FROM film
  WHERE film_id IN (
  SELECT inventory.film_id
  FROM rental
  JOIN inventory ON rental.inventory_id = inventory.inventory_id
  GROUP BY inventory.film_id
  HAVING COUNT(DISTINCT rental.customer_id) > 10
  );`;
    return this.query(sql);
  }

  // 4.6: Write a SQL query to update the rental rate of all films in the database sakila that have a rating of 'PG-13' and a length of more than 2 hours, setting the new rate to be $3.50.
  // Viết truy vấn SQL để cập nhật giá thuê của tất cả các phim trong cơ sở dữ liệu sakila có xếp hạng 'PG-13' và thời lượng hơn 2 giờ, đặt giá mới là $3,50.
  upRentalRatesForPG13MoviesWithLengthOver2Hours(rentalRate: number) {
    const sql = `
    UPDATE film
SET rental_rate = ?
WHERE rating = 'PG-13' AND length > 120;`;
    return this.query(sql, [rentalRate]);
  }

  getRentalRatesForPG13MoviesWithLengthOver2Hours() {
    const sql = `
    SELECT rental_rate
from film
where rating = 'PG-13' AND length >120`;
    return this.query(sql);
  }

  // 4.9: Write a SQL query to the database sakila update the rental rate of all films in the 'Comedy' category that were released in the year 2007 or later, setting the new rate to be 15% lower than the current rate.
  // Viết truy vấn SQL tới cơ sở dữ liệu sakila cập nhật tỷ lệ cho thuê của tất cả các phim trong danh mục 'Hài kịch' được phát hành vào năm 2007 trở đi,đặt tỷ lệ mới thấp hơn 15% so với tỷ lệ hiện tại.

  upRentalRatesComedyTheYear2006OrLater(rentalRate: number) {
    const sql = `
    UPDATE film
SET rental_rate = rental_rate * ?
WHERE film_id IN (
SELECT fc.film_id
FROM film_category fc
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Comedy'
) AND release_year >= 2006;`;
    return this.query(sql, [rentalRate]);
  }

  getRentalRatesComedyTheYear2006OrLater() {
    const sql = `
    SELECT film_id, title, release_year, rental_rate
FROM film
WHERE film_id IN (
SELECT fc.film_id
FROM film_category fc
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Comedy'
) AND release_year >= 2006;`;
    return this.query(sql);
  }

  // 4.10: Write a SQL query to update the rental rate of all films in the database sakila that have a rating of 'G' and a length of less than 1 hour, setting the new rate to be $1.50.
  // Viết truy vấn SQL để cập nhật giá thuê của tất cả các phim trong cơ sở dữ liệu sakila có xếp hạng 'G' và thời lượng dưới 1 giờ, đặt giá mới là $1,50.

  upRentalRateForRatingGFilmLength1Hour(rentalRate: number) {
    const sql = `
  UPDATE film
SET rental_rate = ?
WHERE rating = 'G' AND length < 60;`;
    return this.query(sql, [rentalRate]);
  }

  getRentalRateForRatingGFilmLength1Hour() {
    const sql = `
  SELECT title, rental_rate
FROM film
WHERE rating = 'G' AND length < 60`;
    return this.query(sql);
  }
}
