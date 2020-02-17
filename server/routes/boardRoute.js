import express, { response } from "express";
import db from "../db";
import multer from "multer";
import path from "path";
import fs from "fs";
import dateFormat from "dateformat";

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file, "---destination---", req.files);
    callback(null, "");
  },
  filename: (req, file, callback) => {
    console.log(file, "---filename---");
    const date = dateFormat(new Date(), "yyyymmddHHMMssl");
    callback(
      null,
      `${file.originalname}_${date}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({
  storage: storage
}).array("file", 3);

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
  const type = req.params.type;
  const list = req.params.list;
  const sql = `CALL spt_GetBoardDetail(?, ?);`;
  const sql2 = `CALL spt_GetBoardFile(?);`;
  try {
    db.getConnection((err, con) => {
      let result = [];
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [type, list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        result.push(
          rows.filter((row, i) => row.constructor.name !== "OkPacket").shift()
        );
        console.log(result);
      });
      con.query(sql2, [list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        result.push(
          rows.filter((row, i) => row.constructor.name !== "OkPacket").shift()
        );
        con.release();
        console.log(result);
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
boardRoute.get("/download", async (req, res) => {
  try {
    const file = fs.create;
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default boardRoute;
