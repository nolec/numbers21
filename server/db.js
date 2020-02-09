import mysql from "mysql";
import config from "./config/key";

const db = mysql.createPool(config.db);

export default db;
