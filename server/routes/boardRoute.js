import express, { response } from "express";
import db from "../db";
import multer from "multer";
import path from "path";
import dateFormat from "dateformat";
import { ipConfirm } from "../middlewares/ipConfirm";

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file, "---destination---", req.files);
    callback(null, "");
  },
  filename: (req, file, callback) => {
    console.log(file, "---filename---");
    const date = dateFormat(new Date(), "yyyymmddHHMMssl");
    callback(null, `${date}${path.extname(file.originalname)}`);
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
boardRoute.get("/detail/:type/:list", ipConfirm, async (req, res) => {
  const type = req.params.type;
  const list = req.params.list;
  const sql = `CALL spt_GetBoardDetail(?, ?);`;
  try {
    if (req.body.ip) {
      console.log("여기는 오케이", req.body.reqIp);
    }
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
boardRoute.post("/sql/upload/:list", async (req, res) => {
  const { list } = req.params;
  const sql =
    "CALL spt_InsertBoardFile(?,?,?,@return); SELECT @return as _return";
  const { filename, originalname } = req.body;
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [list, filename, originalname], (err, rows, fields) => {
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
boardRoute.get("/download/file/:list", async (req, res) => {
  const { list } = req.params;
  const sql = "CALL spt_GetBoardFile(?)";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        con.release();
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift();
        // result.map(r =>
        //   fs.readdir(
        //     path.join(__dirname, "../uploads"),
        //     { encoding: "utf8", flag: "r" },
        //     (err, data) => {
        //       if (err) {
        //         throw err;
        //       }
        //       console.log(data);
        //       data.filter(d => d === r.filename && uploadData.push(d));
        //     }
        //   )
        // );
        // console.log("Loaded", uploadData);

        return res.status(200).json(result);
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
boardRoute.delete("/delete/update/file/:list", async (req, res) => {
  const { list } = req.params;
  const sql = "CALL spt_RemoveBoardFile(?,@return); SELECT @return as _return ";
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, [list], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        con.release();
        const result = rows
          .filter((row, i) => row.constructor.name !== "OkPacket")
          .shift()
          .shift();
        return res.status(200).json(result);
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default boardRoute;
