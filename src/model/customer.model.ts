import { pool } from "../database";

interface ICustomer {
  address: string;
  last_name: string;
}

export class Customer {
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

  // 4.4: error Write a SQL query to update the email address of all customers who have rented a film from the 'Horror' category in the month of October 2022, setting the new email address to be a combination of their current email address and the string 'horrorlover'.
  //   -- Viết truy vấn SQL để cập nhật địa chỉ email của tất cả khách hàng đã thuê phim từ danh mục 'Kinh dị' vào tháng 10 năm 2022, đặt địa chỉ email mới là sự kết hợp giữa địa chỉ email hiện tại của họ và chuỗi 'kinh dị' .

  // UPDATE
  async upEmailsForHorrorRentalsInOct2022(rate: string) {
    try {
      const sql = `UPDATE customer
        SET email = CONCAT(email, ?)
        WHERE customer_id IN (
        SELECT rental.customer_id
        FROM rental
        JOIN inventory ON rental.inventory_id = inventory.inventory_id
        JOIN film ON inventory.film_id = film.film_id
        JOIN film_category ON film.film_id = film_category.film_id
        JOIN category ON film_category.category_id = category.category_id
        WHERE category.name = 'Horror'
        AND MONTH(rental.return_date) = 5
        AND YEAR(rental.return_date) = 2005
        );`;
      return await this.query(sql, [rate]);
    } catch (error) {
      throw error;
    }
  }

  // SELECT
  getEmailsForHorrorRentalsInOct2022() {
    const sql = `SELECT email
    FROM customer
    WHERE customer_id IN (
    SELECT rental.customer_id
    FROM rental
    JOIN inventory ON rental.inventory_id = inventory.inventory_id
    JOIN film ON inventory.film_id = film.film_id
    JOIN film_category ON film.film_id = film_category.film_id
    JOIN category ON film_category.category_id = category.category_id
    WHERE category.name = 'Horror'
    AND MONTH(rental.return_date) = 5
    AND YEAR(rental.return_date) = 2005
    );`;
    return this.query(sql);
  }

  // 4.8: Write a SQL query to update the address of all customers who live in the same city as another customer with the same last name, setting the new address to be the concatenation of their current address and the string 'samecity'.
  // Viết truy vấn SQL để cập nhật địa chỉ của tất cả các khách hàng sống trong cùng thành phố với một khách hàng khác có cùng họ, đặt địa chỉ mới là phần nối của địa chỉ hiện tại của họ và chuỗi 'samecity'.

  // UPDATE
  async upAddressAllCustomers(rate: string) {
    try {
      const sql = `UPDATE customer c
    JOIN address ad ON ad.address_id = c.address_id
    JOIN city ci ON ci.city_id = ad.city_id
    JOIN country co ON co.country_id = ci.country_id
    SET ad.address = CONCAT(ad.address, ?)
    WHERE c.last_name = c.last_name and ci.city = ci.city;`;
      return await this.query(sql, [rate]);
    } catch (error) {
      throw error;
    }
  }

  // SELECT
  getAddressAllCustomers() {
    const sql = `SELECT c.first_name, c.last_name, address.address
    from address
    JOIN customer c ON c.address_id = address.address_id
    JOIN city ci ON ci.city_id = address.city_id
    WHERE c.last_name = c.last_name and ci.city = ci.city;`;
    return this.query(sql);
  }
}
