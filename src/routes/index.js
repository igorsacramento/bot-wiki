import express from "express";
import controllers from "../controllers/indexController.js";

const router = express.Router();

router.get("/", controllers.get);

router.post("/", controllers.post);
export default router;
