import dotenv from "dotenv";
dotenv.config();
console.log("여기는 배포");
module.exports = {
  db: {
    host: "localhost",
    user: "test_local",
    password: "test_local",
    post: 3306,
    database: process.env.DATABASE,
    debug: true,
    multipleStatements: true
  }
};
