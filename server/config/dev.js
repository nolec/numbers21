import dotenv from "dotenv";
dotenv.config();
console.log("여기는 개발");
module.exports = {
  db: {
    host: "localhost",
    user: "root",
    password: "15324613",
    post: 3306,
    database: "nolec",
    debug: true,
    multipleStatements: true
  }
};
