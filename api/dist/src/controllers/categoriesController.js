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
exports.deleteCategory = exports.putCategory = exports.getOne = exports.postCategory = exports.getAll = void 0;
const { Categories } = require("../database/db");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    try {
        const category = yield Categories.findAll();
        res.send(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const postCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { nombre } = req.body;
    try {
        const instanceCategory = yield Categories.findOne({
            where: {
                nombre,
            },
        });
        if (instanceCategory) {
            next({
                status: 401,
                message: "Categoria ya existente"
            });
        }
        const newCategory = yield Categories.create({
            nombre
        });
        res.send(newCategory);
    }
    catch (error) {
        next(error);
    }
});
exports.postCategory = postCategory;
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
        let category = yield Categories.findOne({
            where: {
                id
            }
        });
        if (!category) {
            next({
                status: 401,
                message: "Categoria inexistente"
            });
        }
        res.send(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getOne = getOne;
const putCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        let category = yield Categories.findOne({
            where: {
                id
            }
        });
        if (!category) {
            next({
                status: 401,
                message: "Categoria inexistente"
            });
        }
        yield category.update({
            nombre
        });
        category.save();
        res.send(category);
    }
    catch (error) {
        next(error);
    }
});
exports.putCategory = putCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    const { id } = req.params;
    try {
        let category = yield Categories.findOne({ where: { id } });
        if (!category) {
            next({
                status: 401,
                message: "Categoria inexistente"
            });
        }
        yield category.destroy();
        res.send({ message: "Categoria eliminado" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoriesController.js.map