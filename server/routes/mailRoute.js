import express from "express";
import { mailSender } from "../middlewares/nodeMailer";

const mailRoute = express.Router();

mailRoute.post("/send", async (req, res) => {
  try {
    const post = req.body;
    console.log(post);
    if (Object.keys(post).length > 1) {
      await mailSender.sendGmail(post);
    } else if (Object.keys(post).length === 1) {
      await mailSender.sendJoin(post);
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

export default mailRoute;
