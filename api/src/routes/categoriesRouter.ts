import { Router } from "express";
const categoriesRouter = Router();

import { getAll, 
  postCategory, getOne,putCategory,deleteCategory
 } from "../controllers/categoriesController";

categoriesRouter.post("/", postCategory);
categoriesRouter.get("/all", getAll);
categoriesRouter.get("/:id", getOne);
categoriesRouter.put("/:id", putCategory);
categoriesRouter.delete("/:id", deleteCategory);

export default categoriesRouter;
