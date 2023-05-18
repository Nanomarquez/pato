"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsRouter = (0, express_1.Router)();
const productsController_1 = require("../controllers/productsController");
productsRouter.post("/", productsController_1.postProduct);
productsRouter.get("/all", productsController_1.getAll);
productsRouter.get("/category/:categoriesId", productsController_1.getAllByCategory);
productsRouter.get("/:id", productsController_1.getOne);
productsRouter.put("/:id", productsController_1.putProduct);
productsRouter.put("/stock/:id", productsController_1.putStockProduct);
productsRouter.delete("/:id", productsController_1.deleteProduct);
exports.default = productsRouter;
//# sourceMappingURL=productsRouter.js.map