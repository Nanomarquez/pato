"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.putStockProduct = exports.putProduct = exports.getOne = exports.postProduct = exports.getAllByCategory = exports.getAll = void 0;
const { Products, Categories } = require("../database/db");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    try {
        const products = yield Products.findAll();
        res.send(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getAllByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    const { categoriesId } = req.params;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    console.log(categoriesId);
    try {
        if (categoriesId) {
            let category = yield Categories.findOne({ where: { id: categoriesId } });
            if (!category) {
                next({
                    status: 401,
                    message: "Categoria inexistente",
                });
            }
            let productsByCategory = yield Products.findAll({
                where: { categoriesId },
            });
            res.send(productsByCategory);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllByCategory = getAllByCategory;
const postProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { nombre, medida, precioCompra, precioVenta, stock, imagen, categoriesId } = req.body;
    try {
        if (medida) {
            const instanceProduct = yield Products.findOne({
                where: {
                    nombre,
                    medida,
                },
            });
            if (instanceProduct) {
                next({
                    status: 401,
                    message: "Producto ya existente",
                });
            }
        }
        const newProduct = yield Products.create({
            nombre,
            medida,
            precioCompra,
            precioVenta,
            stock,
            imagen,
            categoriesId,
        });
        res.send(newProduct);
    }
    catch (error) {
        next(error);
    }
});
exports.postProduct = postProduct;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { id } = req.params;
    try {
        let product = yield Products.findOne({
            where: {
                id,
            },
        });
        console.log(yield product.getCategory());
        if (!product) {
            next({
                status: 401,
                message: "Producto inexistente",
            });
        }
        res.send(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const putProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { nombre, medida, precioCompra, precioVenta, stock, imagen, categoriesId } = req.body;
    const { id } = req.params;
    try {
        let product = yield Products.findOne({
            where: {
                id,
            },
        });
        if (!product) {
            next({
                status: 401,
                message: "Producto inexistente",
            });
        }
        yield product.update({
            nombre,
            medida,
            precioCompra,
            precioVenta,
            stock,
            imagen,
            categoriesId,
        });
        product.save();
        res.send(product);
    }
    catch (error) {
        next(error);
    }
});
exports.putProduct = putProduct;
const putStockProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { stock } = req.body;
    const { id } = req.params;
    try {
        let product = yield Products.findOne({
            where: {
                id,
            },
        });
        if (!product) {
            next({
                status: 401,
                message: "Producto inexistente",
            });
        }
        let prevStock = product.stock;
        yield product.update({
            stock: prevStock - stock
        });
        product.save();
        res.send(product);
    }
    catch (error) {
        next(error);
    }
});
exports.putStockProduct = putStockProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { id } = req.params;
    try {
        let product = yield Products.findOne({ where: { id } });
        if (!product) {
            next({
                status: 401,
                message: "Producto inexistente",
            });
        }
        yield product.destroy();
        res.send({ message: "Producto eliminado" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productsController.js.map