"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const package_json_1 = __importDefault(require("../../package.json"));
const authRouter_1 = __importDefault(require("./authRouter"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const categoriesRouter_1 = __importDefault(require("./categoriesRouter"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => res.json({ name: package_json_1.default.name, version: package_json_1.default.version }));
router.use("/auth", authRouter_1.default);
router.use("/products", productsRouter_1.default);
router.use("/categories", categoriesRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map