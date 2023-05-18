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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
let port = Number(DB_PORT);
let dialect = "postgres";
const sequelize = process.env.NODE_ENV === "production"
    ? new sequelize_1.Sequelize({
        database: DB_NAME,
        dialect,
        host: DB_HOST,
        port,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {},
    })
    : new sequelize_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        dialectOptions: {},
    });
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs_1.default.readdirSync(path_1.default.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === (process.env.BUILD === undefined ? ".ts" : ".js"))
    .forEach((file) => {
    modelDefiners.push(require(path_1.default.join(__dirname, "/models", file)));
});
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const { Auths, Products, Categories } = sequelize.models;
Products.belongsTo(Categories, {
    foreignKey: "categoriesId",
    onDelete: "CASCADE",
});
Categories.hasMany(Products, {
    foreignKey: "categoriesId",
    as: "products",
});
Products.afterCreate((producto, options) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Categories.findOne({
        where: { id: producto.categoriesId },
    });
    yield category.update({ cantidad_productos: category.cantidad_productos + 1 });
    category.save();
}));
Products.beforeUpdate((producto, options) => __awaiter(void 0, void 0, void 0, function* () {
    const prevCategory = yield Categories.findOne({
        where: { id: producto._previousDataValues.categoriesId },
    });
    yield prevCategory.update({
        cantidad_productos: prevCategory.cantidad_productos - 1,
    });
    prevCategory.save();
    const category = yield Categories.findOne({
        where: { id: producto.categoriesId },
    });
    yield category.update({
        cantidad_productos: category.cantidad_productos + 1,
    });
    category.save();
}));
Products.afterDestroy((producto, options) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Categories.findOne({
        where: { id: producto.categoriesId },
    });
    yield category.update({ cantidad_productos: category.cantidad_productos - 1 });
    category.save();
}));
const create = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Auths.create({
        email: "pato@mail.com",
        password: "123456.",
        rol: "Admin",
    });
    const categories = yield Categories.bulkCreate([
        { nombre: "Bronze", cantidad_productos: 2 },
        { nombre: "Electricidad", cantidad_productos: 2 },
        { nombre: "Termofusion", cantidad_productos: 2 },
    ]);
    const products = yield Products.bulkCreate([
        {
            nombre: "Codo 90",
            medida: "1/2",
            precioCompra: "1000",
            precioVenta: "2000",
            stock: 20,
            categoriesId: categories[0].id,
        },
        {
            nombre: "Codo 90",
            medida: "3/4",
            precioCompra: "1000",
            precioVenta: "2000",
            stock: 50,
            categoriesId: categories[0].id,
        },
        {
            nombre: "TECLA",
            precioCompra: "1000",
            precioVenta: "2000",
            stock: 5,
            categoriesId: categories[1].id,
        },
        {
            nombre: "LUZ",
            precioCompra: "1000",
            precioVenta: "2000",
            categoriesId: categories[1].id,
        },
        {
            nombre: "llave de paso",
            medida: "1/2",
            precioCompra: "1000",
            precioVenta: "2000",
            stock: 24,
            categoriesId: categories[2].id,
        },
        {
            nombre: "llave de paso",
            medida: "3/4",
            precioCompra: "1000",
            precioVenta: "2000",
            stock: 24,
            categoriesId: categories[2].id,
        },
    ]);
});
// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
// };
module.exports = Object.assign(Object.assign({ create: create }, sequelize.models), { conn: sequelize });
//# sourceMappingURL=db.js.map