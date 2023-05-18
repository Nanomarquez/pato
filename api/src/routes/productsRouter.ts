import { Router } from "express";
const productsRouter = Router();

import { getAll, 
  postProduct, getOne,putProduct,deleteProduct,getAllByCategory,putStockProduct
 } from "../controllers/productsController";

productsRouter.post("/", postProduct);
productsRouter.get("/all", getAll);
productsRouter.get("/category/:categoriesId", getAllByCategory);
productsRouter.get("/:id", getOne);
productsRouter.put("/:id", putProduct);
productsRouter.put("/stock/:id", putStockProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
