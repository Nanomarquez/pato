"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
authRouter.post("/signin", authController_1.signIn);
authRouter.get("/", authController_1.getAuth);
authRouter.put("/", authController_1.putUser);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map