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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = exports.signIn = exports.getAuth = void 0;
const { Auths } = require("../database/db");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const getAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    try {
        const authInstance = yield Auths.findOne({
            where: { id: tokenUser.id },
        });
        return res.status(200).json({ auth: authInstance });
    }
    catch (error) {
        next(error);
    }
});
exports.getAuth = getAuth;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({
            status: 402,
            message: "Faltan datos",
        });
    }
    try {
        const authInstance = yield Auths.findOne({ where: { email } });
        if (!authInstance) {
            return next({
                status: 401,
                message: "Usuario no encontrado",
            });
        }
        const validatePassword = yield authInstance.comparePassword(password);
        if (!validatePassword) {
            return next({
                status: 401,
                message: "Contraseña incorrecta",
            });
        }
        const jwToken = (0, generateToken_1.default)(authInstance.id);
        return res.status(200).json({
            auth: authInstance,
            token: jwToken === null || jwToken === void 0 ? void 0 : jwToken.token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signIn = signIn;
const putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.user;
    const { email, password, newEmail, newPassword } = req.body;
    if (!tokenUser) {
        return next({
            status: 401,
            message: "No estas autorizado",
        });
    }
    try {
        const authInstance = yield Auths.findOne({ where: { email } });
        if (!authInstance) {
            return next({
                status: 404,
                message: "Email no encontrado",
            });
        }
        console.log(yield authInstance.comparePassword(password));
        if (!(yield authInstance.comparePassword(password))) {
            return next({
                status: 401,
                message: "Contraseña incorrecta"
            });
        }
        yield authInstance.update({
            email: newEmail ? newEmail : email,
            password: newPassword ? newPassword : password,
        });
        return res.status(200).send({
            auth: authInstance,
            message: "Usuario actualizado correctamente",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.putUser = putUser;
//# sourceMappingURL=authController.js.map