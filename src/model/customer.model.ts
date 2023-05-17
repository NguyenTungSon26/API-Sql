import { pool } from "../database";

interface ICustomer {
  address: string;
  email: string;
}

export class Customer {
  // query nhận vào sql và params. sql là string chứa câu lệnh SQL, params là một mảng chứa giá trị tham số cho câu lệnh SQL đó (nếu có).
  async query(sql: string, params?: Array<string | number>) {
    try {
      // promisePool để connect đến dbs thông qua pool được tạo ra từ file dbs.
      const promisePool = pool.promise();
      // gọi hàm query trên promisePool để query SQL và return result. Đối số 2 của query được truyền vào một array chứa các value parameter của câu lệnh SQL (nếu có), dùng spread syntax
      const [rows] = await promisePool.query(sql, [...(params || [])]);
      // Nếu success, result query là một mảng các obj, mỗi obj tương ứng với 1 bản ghi trong result query. Nếu error, hàm sẽ in ra lỗi và throw error.
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // 4.4: error Write a SQL query to update the email address of all customers who have rented a film from the 'Horror' category in the month of May 2005, setting the new email address to be a combination of their current email address and the string 'horrorlover'.
  //   -- Viết truy vấn SQL để cập nhật địa chỉ email của tất cả khách hàng đã thuê phim từ danh mục 'Kinh dị' vào tháng 5 năm 2005, đặt địa chỉ email mới là sự kết hợp giữa địa chỉ email hiện tại của họ và chuỗi 'kinh dị' .

  // UPDATE
  async upEmailsForHorrorRentalsInMay2005(email: string) {
    try {
      const sql = `UPDATE customer c
        SET email = CONCAT(email, ?)
        WHERE customer_id IN (
          SELECT r.customer_id
          FROM rental r
          JOIN inventory i ON r.inventory_id = i.inventory_id
          JOIN film f ON i.film_id = f.film_id
          JOIN film_category fc ON f.film_id = fc.film_id
          JOIN category c ON fc.category_id = c.category_id
          WHERE c.name = 'Horror'
          AND MONTH(r.return_date) = 5
          AND YEAR(r.return_date) = 2005);`;
      return await this.query(sql, [email]);
    } catch (error) {
      throw error;
    }
  }

  // SELECT
  getEmailsForHorrorRentalsInMay2005() {
    const sql = `SELECT email
    FROM customer c
    WHERE customer_id IN (
      SELECT r.customer_id
      FROM rental r
      JOIN inventory i ON r.inventory_id = i.inventory_id
      JOIN film f ON i.film_id = f.film_id
      JOIN film_category fc ON f.film_id = fc.film_id
      JOIN category c ON fc.category_id = c.category_id
      WHERE c.name = 'Horror'
      AND MONTH(r.return_date) = 5
      AND YEAR(r.return_date) = 2005);`;
    return this.query(sql);
  }

  // 4.8: Write a SQL query to update the address of all customers who live in the same city as another customer with the same last name, setting the new address to be the concatenation of their current address and the string 'samecity'.
  // Viết truy vấn SQL để cập nhật địa chỉ của tất cả các khách hàng sống trong cùng thành phố với một khách hàng khác có cùng họ, đặt địa chỉ mới là phần nối của địa chỉ hiện tại của họ và chuỗi 'samecity'.

  // UPDATE
  async upAddressAllCustomers(address: string) {
    try {
      const sql = `
      UPDATE customer c
      JOIN address ad ON ad.address_id = c.address_id
      JOIN city ci ON ci.city_id = ad.city_id
      JOIN country co ON co.country_id = ci.country_id
      SET ad.address = CONCAT(ad.address, ?)
      WHERE c.last_name = c.last_name and ci.city = ci.city;`;
      return await this.query(sql, [address]);
    } catch (error) {
      throw error;
    }
  }

  // SELECT
  getAddressAllCustomers() {
    const sql = `
    SELECT c.first_name, c.last_name, ad.address
    from address ad
    JOIN customer c ON c.address_id = ad.address_id
    JOIN city ci ON ci.city_id = ad.city_id
    WHERE c.last_name = c.last_name and ci.city = ci.city;`;
    return this.query(sql);
  }
}
