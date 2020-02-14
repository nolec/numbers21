import multer from "multer";
import path from "path";
import dateFormat from "dateformat";

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file, "---destination---", req.files);
    callback(null, "");
  },
  filename: (req, file, callback) => {
    console.log(file, "---filename---");
    const date = dateFormat(new Date(), "yyyymmddHHMMssl");
    callback(null, `${__filename}_${date}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage
}).array("file", 3);

export default upload;
