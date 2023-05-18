import { Router } from "express";
const authRouter = Router();

import { signIn, getAuth, putUser } from "../controllers/authController";

authRouter.post("/signin", signIn);
authRouter.get("/", getAuth);
authRouter.put("/", putUser);

export default authRouter;
