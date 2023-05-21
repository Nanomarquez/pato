import { Sequelize, Dialect } from "sequelize";
import fs from "fs";
import path from "path";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
let port: number | undefined = Number(DB_PORT);
let dialect: Dialect | undefined = "postgres";
const sequelize: any =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
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
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          dialectOptions: {},
        }
      );

const basename = path.basename(__filename);

const modelDefiners: any = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === (process.env.BUILD === undefined ? ".ts" : ".js")
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model: any) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const { Auths, Products, Categories , Proveedores } = sequelize.models;

Products.belongsTo(Categories, {
  foreignKey: "categoriesId",
  onDelete: "CASCADE",
});
Categories.hasMany(Products, {
  foreignKey: "categoriesId",
  as: "products",
});
Products.belongsTo(Proveedores, {
  foreignKey: "proveedoresId",
  onDelete: "CASCADE",
});
Proveedores.hasMany(Products, {
  foreignKey: "proveedoresId",
  as: "products",
});

Products.afterCreate(async (producto, options) => {
  const category = await Categories.findOne({
    where: { id: producto.categoriesId },
  });
  await category.update({ cantidad_productos: category.cantidad_productos + 1 });
  const proveedor = await Proveedores.findOne({
    where: { id: producto.proveedoresId },
  });
  await proveedor.update({ cantidad_productos: proveedor.cantidad_productos + 1 });
  proveedor.save()
});

Products.beforeUpdate(async (producto, options) => {
  const prevCategory = await Categories.findOne({
    where: { id: producto._previousDataValues.categoriesId },
  });
  await prevCategory.update({
    cantidad_productos: prevCategory.cantidad_productos - 1,
  });
  prevCategory.save();
  const prevProveedor = await Proveedores.findOne({
    where: { id: producto._previousDataValues.proveedoresId },
  });
  await prevProveedor.update({
    cantidad_productos: prevProveedor.cantidad_productos - 1,
  });
  prevProveedor.save();
  const category = await Categories.findOne({
    where: { id: producto.categoriesId },
  });
  await category.update({
    cantidad_productos: category.cantidad_productos + 1,
  });
  category.save();
  const proveedor = await Proveedores.findOne({
    where: { id: producto.proveedoresId },
  });
  await proveedor.update({
    cantidad_productos: proveedor.cantidad_productos + 1,
  });
  proveedor.save();
});

Products.afterDestroy(async (producto, options) => {
  const category = await Categories.findOne({
    where: { id: producto.categoriesId },
  });
  await category.update({ cantidad_productos: category.cantidad_productos - 1 });
  category.save()
  const proveedor = await Proveedores.findOne({
    where: { id: producto.proveedoresId },
  });
  await proveedor.update({ cantidad_productos: proveedor.cantidad_productos - 1 });
  proveedor.save()
});

const create = async () => {
  await Auths.create({
    email: "pato@mail.com",
    password: "123456.",
    rol: "Admin",
  });
  const categories = await Categories.bulkCreate([
    { nombre: "Bronze", cantidad_productos: 2 },
    { nombre: "Electricidad", cantidad_productos: 2 },
    { nombre: "Termofusion", cantidad_productos: 2 },
  ]);
  const proveedores = await Proveedores.bulkCreate([
    { nombre: "ABRAFER", cantidad_productos: 2 ,precio_sugerido:30},
    { nombre: "TH", cantidad_productos: 2 ,precio_sugerido:35},
    { nombre: "AWADUCT", cantidad_productos: 2 , precio_sugerido: 40 },
  ]);
  const products = await Products.bulkCreate([
    {
      nombre: "Codo 90",
      medida: "1/2",
      precioCompra: "1000",
      precioVenta: "2000",
      stock: 20,
      categoriesId: categories[0].id,
      proveedoresId: proveedores[0].id,
    },
    {
      nombre: "Codo 90",
      medida: "3/4",
      precioCompra: "1000",
      precioVenta: "2000",
      stock: 50,
      categoriesId: categories[0].id,
      proveedoresId: proveedores[0].id,
    },
    {
      nombre: "TECLA",
      precioCompra: "1000",
      precioVenta: "2000",
      stock: 5,
      categoriesId: categories[1].id,
      proveedoresId: proveedores[1].id,
    },
    {
      nombre: "LUZ",
      precioCompra: "1000",
      precioVenta: "2000",
      categoriesId: categories[1].id,
      proveedoresId: proveedores[1].id,
    },
    {
      nombre: "llave de paso",
      medida: "1/2",
      precioCompra: "1000",
      precioVenta: "2000",
      stock: 24,
      categoriesId: categories[2].id,
      proveedoresId: proveedores[2].id,
    },
    {
      nombre: "llave de paso",
      medida: "3/4",
      precioCompra: "1000",
      precioVenta: "2000",
      stock: 24,
      categoriesId: categories[2].id,
      proveedoresId: proveedores[2].id,
    },
  ]);
};

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
// };

module.exports = {
  create: create,
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
