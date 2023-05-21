import { Router } from "express";
import pkg from "../../package.json";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import categoriesRouter from "./categoriesRouter";
import proveedoresRouter from "./proveedoresRouter";

const router = Router();

router.get("/", (req, res) =>
  res.json({ name: pkg.name, version: pkg.version })
);

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/proveedores", proveedoresRouter);

export default router;
