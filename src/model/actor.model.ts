import { pool } from "../database";

interface IActor {
  first_name: string;
  last_name: string;
}

export class Actor {
  async query(sql: string) {
    try {
      const promisePool = pool.promise();
      const [rows] = await promisePool.query(sql);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //   -- 1.1: Write a SQL query to return the first and last names of all actors in the database.
  // -- Viết truy vấn SQL để trả về họ và tên của tất cả các diễn viên trong cơ sở dữ liệu.

  getAllActorsName() {
    const sql = `SELECT first_name,last_name FROM actor`;
    return this.query(sql);
  }

  //   -- 1.7: Write a SQL query to return the names of all actors who have appeared in more than 20 films in the database.
  // -- Viết truy vấn SQL để trả về tên của tất cả các diễn viên đã xuất hiện trong hơn 20 bộ phim trong cơ sở dữ liệu.

  getActorsWithMoreThan20Films() {
    const sql = `SELECT a.first_name, a.last_name, COUNT(*) AS film_count
  FROM actor a
  JOIN film_actor fa ON a.actor_id = fa.actor_id
  GROUP BY a.actor_id
  HAVING COUNT(*) > 20;`;
    return this.query(sql);
  }

  // -- 2.4: Write a SQL query to return the names of all actors who have appeared in at least one film in each category in the database.
  // -- Viết truy vấn SQL để trả về tên của tất cả các diễn viên đã xuất hiện trong ít nhất một bộ phim trong mỗi danh mục trong cơ sở dữ liệu.

  getActorsByCategory() {
    const sql = `SELECT actor.first_name, actor.last_name
    FROM actor
    JOIN film_actor ON actor.actor_id = film_actor.actor_id
    JOIN film_category ON film_actor.film_id = film_category.film_id
    GROUP BY actor.actor_id
    HAVING COUNT(DISTINCT film_category.category_id) = (
    SELECT COUNT(*) FROM category
    );`;
    return this.query(sql);
  }

  // -- 2.7: Write a SQL query to return the names of all actors who have appeared in at least one film with a rating of 'R', but have never appeared in a film with a rating of 'G'.
  // -- Viết một truy vấn SQL để trả về tên của tất cả các diễn viên đã xuất hiện trong ít nhất một bộ phim có xếp hạng 'R', nhưng chưa bao giờ xuất hiện trong một bộ phim có xếp hạng 'G'.

  getActorsWithRRatingButNotGRatingMovies() {
    const sql = `
    SELECT actor.first_name, actor.last_name
  FROM actor
  JOIN film_actor ON actor.actor_id = film_actor.actor_id
  JOIN film ON film_actor.film_id = film.film_id
  WHERE film.rating = 'R'
  AND actor.actor_id NOT IN (
    SELECT actor.actor_id
    FROM actor
    JOIN film_actor ON actor.actor_id = film_actor.actor_id
    JOIN film ON film_actor.film_id = film.film_id
    WHERE film.rating = 'G'
  )
  GROUP BY actor.actor_id, actor.first_name, actor.last_name;
    `;
    return this.query(sql);
  }

  //   -- 3.2: Write a SQL query to database sakila and return the names of all actors who have appeared in a film with a rating of 'R' and a length of more than 2 hours, but have never appeared in a film with a rating of 'G'
  // -- Viết truy vấn SQL tới cơ sở dữ liệu sakila và trả về tên của tất cả các diễn viên đã xuất hiện trong phim có xếp hạng 'R' và thời lượng hơn 2 giờ, nhưng chưa từng xuất hiện trong phim có xếp hạng 'G'

  getRatedActorsLongerThan2hrsNotInGRatedFilms() {
    const sql = `
  SELECT a.first_name, a.last_name
  // FROM actor a
  // JOIN film_actor fa ON a.actor_id = fa.actor_id
  // JOIN film  f ON fa.film_id = f.film_id
  // JOIN film_category fc ON f.film_id = fc.film_id
  // JOIN category c ON fc.category_id = c.category_id
  // WHERE f.rating = 'R' AND f.length > 120
  // AND a.actor_id NOT IN (
  // SELECT DISTINCT actor.actor_id
  // FROM actor
  // JOIN film_actor ON actor.actor_id = film_actor.actor_id
  // JOIN film ON film_actor.film_id = film.film_id
  // JOIN film_category ON film.film_id = film_category.film_id
  // JOIN category ON film_category.category_id = category.category_id
  // WHERE film.rating = 'G'
  // );
    `;
    return this.query(sql);
  }

  //   -- 3.10: Write a SQL query to return the names of all actors who have appeared in a film with a rating of 'PG-13' and a length of more than 2 hours, and have also appeared in a film with a rating of 'R' and a length of less than 90 minutes.
  // -- Viết truy vấn SQL để trả về tên của tất cả các diễn viên đã xuất hiện trong một bộ phim có xếp hạng 'PG-13' và thời lượng hơn 2 giờ, đồng thời cũng đã xuất hiện trong một bộ phim có xếp hạng 'R' và thời lượng dưới 90 phút.

  getActorsInLongPG13AndShortR() {
    const sql = `
    SELECT DISTINCT actor.first_name, actor.last_name
    FROM actor
    INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
    INNER JOIN film ON film.film_id = film_actor.film_id
    WHERE film.rating = 'PG-13' AND film.length > 120
    AND actor.actor_id IN (
      SELECT film_actor.actor_id
      FROM film_actor
      INNER JOIN film ON film.film_id = film_actor.film_id
      WHERE film.rating = 'R' AND film.length < 90
    );
    `;
    return this.query(sql);
  }

  // Example
  getNameById(id: number) {
    const sql = `SELECT first_name,last_name FROM actor Where actor_id = ${id}`;
    return this.query(sql);
  }

  updateNameOne(id: number, newName: string) {
    const sql = `UPDATE actor
    SET first_name = '${newName}'
    WHERE actor_id = ${id};`;
    return this.query(sql);
  }
}
