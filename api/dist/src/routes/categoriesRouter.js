"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesRouter = (0, express_1.Router)();
const categoriesController_1 = require("../controllers/categoriesController");
categoriesRouter.post("/", categoriesController_1.postCategory);
categoriesRouter.get("/all", categoriesController_1.getAll);
categoriesRouter.get("/:id", categoriesController_1.getOne);
categoriesRouter.put("/:id", categoriesController_1.putCategory);
categoriesRouter.delete("/:id", categoriesController_1.deleteCategory);
exports.default = categoriesRouter;
//# sourceMappingURL=categoriesRouter.js.map