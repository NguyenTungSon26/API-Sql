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

  getName() {
    const sql = `SELECT first_name,last_name FROM actor`;
    return this.query(sql);
  }

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
