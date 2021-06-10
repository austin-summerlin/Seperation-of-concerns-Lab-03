const pool = require('pool');

class Order {
  id;
  quantityOfItems;

  constructor(row) {
    this.id = row.id;
    this.quantityOfItems = row.quantity_of_items;
  }
  static async insert(quantityOfItems) {
    const { rows } = await pool.query(
      `INSERT INTO orders(quantity_of_items) 
      VALUES($1) 
      RETURNING *
      `,
      [quantityOfItems]
    );
    return new Order(rows[0]);
  }
  static async update(quantityOfItems, id) {
    const { rows } = await pool.query(
      `UPDATE orders
      SET (quantity_of_items) = $1
      WHERE ID = $2
      RETURNING *
      `,
      [quantityOfItems, id]
    );
    return new Order(rows[0]);
  }
  static async select() {
    const { rows } = await pool.query(
      `SELECT *
      FROM orders
      `);
    return new Order(rows);
  }
  static async selectId(id) {
    const { rows } = await pool.query(
      `SELECT id, quantity
      FROM orders
      WHERE id = $1
      `,
      [id]);
    return new Order(rows[0] || null);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM orders
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Order(rows[0]);
  }
}

module.exports = Order;

