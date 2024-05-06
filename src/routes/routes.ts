import { Router } from "express";
import { DEFAULT_MAX_VERSION } from "tls";
import { userRoutes } from "../modules/user/user.routes";

const router = Router();

router.use("/users", userRoutes);

export default router;
