import express from "express";
import db from "../db";
import upload from "../middlewares/upload";

const boardRoute = express.Router();

boardRoute.get("/:type/:page", async (req, res) => {
  const sql = "CALL spt_GetBoard(?,?,?)";
  const type = req.params.type;
  const page = req.params.page - 1;
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, page, 10], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift();
        console.log(result);
        con.release();
        return res.json(result);
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});
boardRoute.get("/detail/:type/:list", async (req, res) => {
  const sql = "CALL spt_GetBoardDetail(?, ?)";
  const type = req.params.type;
  const list = req.params.list;
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift();
        console.log(result);
        con.release();
        return res.json(result);
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});
boardRoute.post("/write", async (req, res) => {
  const { type, title, contents } = req.body;
  const sql =
    "CALL spt_InsertBoard(?, ?, ?,@last_insert_id); SELECT @last_insert_id as last_insert_id;";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, title, contents], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift()
          .shift();
        console.log(Object.assign(result, { success: true }));
        return res.json(Object.assign(result, { success: true }));
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
boardRoute.post("/update", async (req, res) => {
  const { type, list, title, contents } = req.body;
  const sql =
    "CALL spt_UpdateBoard(?, ?, ?,?,@return); SELECT @return as _return";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, list, title, contents], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift()
          .shift();
        console.log(Object.assign(result, { success: true }));
        return res.json(Object.assign(result, { success: true }));
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
boardRoute.delete("/delete/:type/:list", async (req, res) => {
  const { type, list } = req.params;
  const sql = "CALL spt_RemoveBoard(?, ?, @return); SELECT @return as _return";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift()
          .shift();
        console.log(Object.assign(result, { success: true }));
        return res.json(Object.assign(result, { success: true }));
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
boardRoute.post("/upload", async (req, res) => {
  upload(req, res, error => {
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    return res.json({ success: true, files: res.req.files });
  });
});
boardRoute.post("/sql/upload", async (req, res) => {
  const sql =
    "CALL spt_InsertBoardFile(?,?,?,@return); SELECT @return as _return";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [2, "file", "original_filename"], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift()
          .shift();
        console.log(Object.assign(result, { success: true }));
        return res.json(Object.assign(result, { success: true }));
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default boardRoute;
