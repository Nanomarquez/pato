import { Router } from "express";
const proveedoresRouter = Router();

import {
  getAll,
  postProveedor,
  getOne,
  putProveedor,
  deleteProveedor,
  precioProveedor,
} from "../controllers/proveedoresController";

proveedoresRouter.post("/", postProveedor);
proveedoresRouter.post("/precio", precioProveedor);
proveedoresRouter.get("/all", getAll);
proveedoresRouter.get("/:id", getOne);
proveedoresRouter.put("/:id", putProveedor);
proveedoresRouter.delete("/:id", deleteProveedor);

export default proveedoresRouter;
