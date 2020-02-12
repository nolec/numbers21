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
pressRoute.get("/:page", async (req, res) => {
  const page = parseInt(req.params.page) * 7 + parseInt(req.params.page);
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(
        `CALL spt_GetArticlesAdmin(?,?,@total_row_count); SELECT @total_row_count AS total_row_count;`,
        [0, page],
        (err, rows, fields) => {
          if (err) {
            con.release();
            throw err;
          }
          const result = rows.filter(
            (row, i) => row.constructor.name !== "OkPacket"
          );
          con.release();
          return res.json(result);
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default pressRoute;
