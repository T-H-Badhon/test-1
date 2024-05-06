import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.post("/create-admin", userControllers.createAdmin);

export const userRoutes = router;
