"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//JWT Token Generate
const generateToken = (uid) => {
    const secret = process.env.JWT_SECRET;
    const expTime = process.env.JWT_EXPTIME;
    try {
        const token = jsonwebtoken_1.default.sign({ uid }, secret, { expiresIn: expTime });
        return { token: token, expiresIn: expTime };
    }
    catch (error) {
        return error.message;
    }
};
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map