const connection = require("../model/database");

const query1 = (req, res) => {
  const sql = `SELECT first_name,last_name 
  FROM actor`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query2 = (req, res) => {
  const sql = `SELECT title, rental_rate, replacement_cost 
  FROM film;`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query3 = (req, res) => {
  const sql = `SELECT f.title AS "Films", COUNT(r.rental_id) AS "Number of rentals" 
  FROM film f
  JOIN inventory i ON i.film_id = f.film_id
  JOIN rental r ON r.inventory_id = i.inventory_id
  GROUP BY f.title
  ORDER BY COUNT(r.rental_id) DESC
  LIMIT 5;`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query4 = (req, res) => {
  const sql = `SELECT c.name AS "Category", AVG(TIMESTAMPDIFF(DAY, r.rental_date, r.return_date)) AS "Average duration"
  FROM category c
  JOIN film_category fc ON c.category_id = fc.category_id
  JOIN film f ON fc.film_id = f.film_id
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY c.category_id;`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query5 = (req, res) => {
  const sql = `SELECT c.first_name, c.last_name, a.address
  FROM customer c
  JOIN address a ON c.address_id = a.address_id
  JOIN rental r ON r.customer_id = c.customer_id
  WHERE r.rental_date BETWEEN '2005-05-01 00:00:00' AND '2005-05-31 23:59:59';
  `;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query6 = (req, res) => {
  const sql = `SELECT s.store_id, SUM(p.amount) AS revenue
  FROM store s
  JOIN staff st ON st.store_id = s.store_id
  JOIN payment p ON p.staff_id = st.staff_id
  WHERE year(p.payment_date) = 2005
  GROUP BY s.store_id; 
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query7 = (req, res) => {
  const sql = `SELECT s.store_id, SUM(p.amount) AS revenue
  FROM store s
  JOIN staff st ON st.store_id = s.store_id
  JOIN payment p ON p.staff_id = st.staff_id
  WHERE year(p.payment_date) = 2005
  GROUP BY s.store_id; 
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query8 = (req, res) => {
  const sql = `SELECT title
  FROM film
  WHERE rating = 'PG-13'
  AND length > 120; 
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query9 = (req, res) => {
  const sql = `
  SELECT c.first_name, c.last_name, SUM(p.amount) AS total_revenue
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY total_revenue DESC
LIMIT 10;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query10 = (req, res) => {
  const sql = `
  SELECT c.first_name, c.last_name, c.email, a.address, a.phone
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN address a ON a.address_id = c.address_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film_category fc ON i.film_id = fc.film_id
JOIN category cate ON fc.category_id = cate.category_id
GROUP BY c.customer_id
HAVING COUNT(DISTINCT cate.category_id) = (SELECT COUNT(*) FROM category);
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query11 = (req, res) => {
  const sql = `
  SELECT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NULL;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query12 = (req, res) => {
  const sql = `
  SELECT actor.first_name, actor.last_name 
FROM actor 
JOIN film_actor ON actor.actor_id = film_actor.actor_id 
JOIN film_category ON film_actor.film_id = film_category.film_id 
GROUP BY actor.actor_id 
HAVING COUNT(DISTINCT film_category.category_id) = (
  SELECT COUNT(*) FROM category
);
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query13 = (req, res) => {
  const sql = `
  SELECT c.first_name, c.last_name, COUNT(*) as rental_count
FROM customer c
JOIN rental r1 ON c.customer_id = r1.customer_id
JOIN rental r2 ON r1.customer_id = r2.customer_id AND r1.rental_id <> r2.rental_id AND r1.rental_date = r2.rental_date
JOIN inventory i ON r1.inventory_id = i.inventory_id
GROUP BY c.customer_id
HAVING rental_count > 1;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query14 = (req, res) => {
  const sql = `
  SELECT actor.actor_id, actor.first_name, actor.last_name, 
  SUM(payment.amount) AS total_revenue 
FROM 
  actor 
JOIN film_actor ON actor.actor_id = film_actor.actor_id 
JOIN film ON film_actor.film_id = film.film_id 
JOIN inventory ON film.film_id = inventory.film_id 
JOIN rental ON inventory.inventory_id = rental.inventory_id 
JOIN payment ON rental.rental_id = payment.rental_id 
GROUP BY actor.actor_id, actor.first_name, actor.last_name 
ORDER BY total_revenue DESC;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query15 = (req, res) => {
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
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query16 = (req, res) => {
  const sql = `
  SELECT film.title, film.film_id
FROM film
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY film.film_id
HAVING COUNT(DISTINCT rental.customer_id) > 30
   AND COUNT(DISTINCT rental.customer_id) = COUNT(*);
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query17 = (req, res) => {
  const sql = `
  SELECT DISTINCT customer.first_name, customer.last_name
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE NOT EXISTS (
  SELECT *
  FROM category
  WHERE NOT EXISTS (
    SELECT *
    FROM film_category
    JOIN inventory ON film_category.film_id = inventory.film_id
    JOIN rental ON inventory.inventory_id = rental.inventory_id
    WHERE rental.customer_id = customer.customer_id
    AND category.category_id = film_category.category_id
  )
);
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query18 = (req, res) => {
  const sql = `
  SELECT DISTINCT f.title 
FROM film f
  JOIN inventory i ON f.film_id = i.film_id 
  JOIN rental r ON i.inventory_id = r.inventory_id 
  JOIN customer c ON r.customer_id = c.customer_id 
  JOIN film_category fc ON f.film_id = fc.film_id 
  JOIN category ca ON fc.category_id = ca.category_id 
WHERE ca.name = 'Action'  
  AND c.customer_id IN ( 
    SELECT DISTINCT c.customer_id 
    FROM customer c 
      JOIN rental r ON c.customer_id = r.customer_id 
      JOIN inventory i ON r.inventory_id = i.inventory_id 
      JOIN film f ON i.film_id = f.film_id 
      JOIN film_category fc ON f.film_id = fc.film_id
      JOIN category ca ON fc.category_id = ca.category_id
    WHERE ca.name = 'Action' 
  );
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query19 = (req, res) => {
  const sql = `
  SELECT a.actor_id, c.name AS category_name, AVG(DATEDIFF(return_date, rental_date)) AS avg_rental_duration
FROM  actor a 
    JOIN film_actor fa ON a.actor_id = fa.actor_id 
    JOIN film_category fc ON fa.film_id = fc.film_id 
    JOIN category c ON fc.category_id = c.category_id 
    JOIN inventory i ON fc.film_id = i.film_id 
    JOIN rental r ON i.inventory_id = r.inventory_id 
WHERE a.actor_id IN (
        SELECT fa.actor_id
        FROM film_actor fa
        JOIN film_category fc ON fa.film_id = fc.film_id
        GROUP BY fa.actor_id
        HAVING COUNT(DISTINCT fc.category_id) > 0
    )
GROUP BY a.actor_id, c.category_id;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query20 = (req, res) => {
  const sql = `
  SELECT a.first_name, a.last_name
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film  f ON fa.film_id = f.film_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.rating = 'R' AND f.length > 120
AND a.actor_id NOT IN (
SELECT DISTINCT actor.actor_id
FROM actor
JOIN film_actor ON actor.actor_id = film_actor.actor_id
JOIN film ON film_actor.film_id = film.film_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE film.rating = 'G'
);  
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query21 = (req, res) => {
  const sql = `
  SELECT c.first_name,  c.last_name, 
COUNT(*) as number_of_rentals,  
SUM(p.amount) as total_rental_fee 
FROM customer c  
INNER JOIN payment p ON c.customer_id = p.customer_id  
INNER JOIN rental r ON p.rental_id = r.rental_id 
GROUP BY c.customer_id  
HAVING COUNT(*) > 10;  
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query22 = (req, res) => {
  const sql = `
  SELECT CONCAT(c.first_name, ' ', c.last_name) AS full_name, COUNT(*) AS total_rentals, SUM(f.rental_rate) AS total_fees
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category ca ON fc.category_id = ca.category_id
GROUP BY full_name
HAVING total_rentals > 0; 
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query23 = (req, res) => {
  const sql = `
  SELECT f.title, c.first_name, c.last_name, COUNT(*) AS rental_count
FROM rental r
INNER JOIN inventory i ON r.inventory_id = i.inventory_id
INNER JOIN film f ON i.film_id = f.film_id
INNER JOIN customer c ON r.customer_id = c.customer_id

GROUP BY f.title, c.first_name, c.last_name
HAVING rental_count > 1;

SELECT customer_id, inventory_id, rental_date, COUNT(*) as num_rentals
FROM rental
GROUP BY customer_id, inventory_id, rental_date
HAVING COUNT(*) > 0;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query24 = (req, res) => {
  const sql = `
  SELECT CONCAT(A.first_name,' ',A.last_name) as full_name1, CONCAT(B.first_name,' ',B.last_name) as full_name2,
    COUNT(*) as num_movies 
FROM film_actor as fa1 
    JOIN film_actor as fa2 ON fa1.film_id = fa2.film_id 
    JOIN actor as A ON fa1.actor_id = A.actor_id 
    JOIN actor as B ON fa2.actor_id = B.actor_id AND A.first_name != B.first_name AND A.last_name != B.last_name 
GROUP BY full_name1, full_name2 
ORDER BY num_movies DESC;
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query25 = (req, res) => {
  const sql = `
  SELECT c.first_name,c.last_name,
    COUNT(r.rental_id) AS total_rentals,
    COUNT(DISTINCT f.category_id) AS total_categories
FROM customer c
    INNER JOIN rental r ON c.customer_id = r.customer_id
    INNER JOIN inventory i ON r.inventory_id = i.inventory_id
    INNER JOIN film_category f ON i.film_id = f.film_id
WHERE f.category_id IN (
        SELECT category_id 
        FROM category
    )
GROUP BY c.customer_id
HAVING COUNT(DISTINCT f.category_id) = (
        SELECT COUNT(*) 
        FROM category
    )
ORDER BY total_rentals DESC;

  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query26 = (req, res) => {
  const sql = `
  SELECT title
FROM film
WHERE film_id NOT IN (
  SELECT inventory.film_id
  FROM inventory
  JOIN rental ON inventory.inventory_id = rental.inventory_id
  JOIN customer ON rental.customer_id = customer.customer_id
  JOIN film ON inventory.film_id = film.film_id
  WHERE film.rating = 'G'
)
AND film_id IN (
  SELECT inventory.film_id
  FROM inventory
  JOIN rental ON inventory.inventory_id = rental.inventory_id
  GROUP BY inventory.film_id
  HAVING COUNT(*) > 30
);
  `;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query27 = (req, res) => {
  const sql = `
  SELECT DISTINCT customer.first_name, customer.last_name
FROM customer
JOIN rental ON rental.customer_id = customer.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE film.length <= 180 
AND customer.customer_id NOT IN (
    SELECT DISTINCT rental.customer_id
    FROM rental
    JOIN inventory ON rental.inventory_id = inventory.inventory_id
    JOIN film_category ON inventory.film_id = film_category.film_id
    WHERE film_category.category_id NOT IN (
        SELECT DISTINCT film_category.category_id
        FROM rental
        JOIN inventory ON rental.inventory_id = inventory.inventory_id
        JOIN film_category ON inventory.film_id = film_category.film_id
        WHERE rental.customer_id = customer.customer_id
    )
);
`;
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

const query28 = (req, res) => {
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
  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

module.exports = {
  query1,
  query2,
  query3,
  query4,
  query5,
  query6,
  query7,
  query8,
  query9,
  query10,
  query11,
  query12,
  query13,
  query14,
  query15,
  query16,
  query17,
  query18,
  query19,
  query20,
  query21,
  query22,
  query23,
  query24,
  query25,
  query26,
  query27,
  query28,
};
