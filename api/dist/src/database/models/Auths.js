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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = (sequelize) => {
    const Auths = sequelize.define("auths", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Ingresa un email valido",
                },
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                check: (value) => {
                    // const hasUppercase = /[A-Z]/.test(value);
                    const hasSign = /[@$!%*#?&.]/.test(value);
                    if (!hasSign) {
                        throw new Error("La contraseña debe tener al menos una letra mayúscula y un signo");
                    }
                },
            },
        },
        rol: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "Usuario",
            validate: {
                customValidator: (value) => {
                    const enums = ["Usuario", "Admin"];
                    if (!enums.includes(value)) { // Use Array.includes() to validate.
                        throw new Error('not a valid option');
                    }
                }
            },
        },
        isBanned: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        hooks: {
            beforeCreate: (auth) => __awaiter(void 0, void 0, void 0, function* () {
                const salt = yield bcrypt_1.default.genSalt(10);
                auth.password = yield bcrypt_1.default.hash(auth.password, salt);
            }),
            beforeUpdate: (auth) => __awaiter(void 0, void 0, void 0, function* () {
                if (auth.changed("password")) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    auth.password = yield bcrypt_1.default.hash(auth.password, salt);
                }
            }),
        },
        timestamps: true,
    });
    Auths.prototype.comparePassword = function (candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.password);
            return yield bcrypt_1.default.compare(candidatePassword, this.password);
        });
    };
    return Auths;
};
//# sourceMappingURL=Auths.js.map