import express from "express";

const mailRoute = express.Router();

mailRoute.get("/send");

export default mailRoute;
