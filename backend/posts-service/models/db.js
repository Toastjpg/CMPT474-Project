const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// })

// TODO: Figure out proper connection when connecting to Cloud SQL
const pool = new Pool({
  host: "db",
  user: "postgres",
  password: "root",
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT
});

const helpers = {
  setup_tables: async () => {
    const q = `
      CREATE TABLE if NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT,
        content TEXT,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    const res = await pool.query(q);
  },

  get_all_posts: async () => {
    const q = "SELECT * FROM posts";
    const res = await pool.query(q);
    console.log(res.rows);
    return res.rows;
  },

  get_post_by_id: async (id) => {
    const q = `
      SELECT * FROM posts
      WHERE id = $1
    `;
    const res = await pool.query(q, [id]);
    return res.rows[0];
  },

  create_post: async (obj) => {
    const q = `
      INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *
    `;
    const res = await pool.query(q, [obj.title, obj.content]);
    const new_obj = res.rows[0];
    return new_obj;
  },

  delete_post: async (id) => {
    const q = "DELETE FROM posts WHERE id = $1";
    const res = await pool.query(q, [id]);
    return res.rowCount;
  },

  update_post: async (id, obj) => {
    const q = `
      UPDATE posts SET title = $1, content = $2 WHERE id = $3
    `;
    const r1 = await pool.query(q, [obj.title, obj.content, id]);
    return r1.rowCount;
  },
};

module.exports = { helpers };
