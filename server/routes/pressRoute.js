import express from "express";
import db from "../db";

const pressRoute = express.Router();

pressRoute.get("/main", async (req, res) => {
  const sql =
    "select * from press group by media_link order by reg_date DESC limit 4";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        con.release();
        return res.send(rows);
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default pressRoute;
