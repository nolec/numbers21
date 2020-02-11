import dotenv from "dotenv";
dotenv.config();
console.log("여기는 개발");
module.exports = {
  db: {
    host: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    post: 3306,
    database: process.env.DATABASE,
    // debug: true,
    multipleStatements: true
  }
};
