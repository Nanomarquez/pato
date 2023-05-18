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
exports.requireAdmin = exports.requireAuth = exports.authenticate = void 0;
const { Auths } = require('../database/db');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decodedToken);
            }
        });
    });
};
const authenticate = (secret) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization: token } = req.headers;
    if (!token) {
        return next();
    }
    try {
        const decodedToken = yield verifyToken(token, secret);
        const ifUserExists = yield Auths.findByPk(decodedToken.uid);
        if (!ifUserExists) {
            return next({
                statusCode: 404,
                message: 'El token brindado no es de un usuario registrado',
            });
        }
        req.user = ifUserExists;
        return next();
    }
    catch (err) {
        return next({
            statusCode: 403,
            message: 'Sesión vencida. Vuelve a iniciar sesion por favor.',
        });
    }
});
exports.authenticate = authenticate;
const isAuthenticated = (req) => !!req.user;
const isAdmin = (req) => req.user && req.user.rol === 'Admin';
const requireAuth = (req, res, next) => !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
    })
    : next();
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
    })
    : !isAdmin(req)
        ? next({
            statusCode: 401,
            message: 'Necesitas permisos de Administrador.',
        })
        : next();
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map