"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const Products = sequelize.define("products", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        precioCompra: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        precioVenta: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        medida: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        stock: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true,
        },
        imagen: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
            defaultValue: "https://previews.123rf.com/images/lunaraa/lunaraa2211/lunaraa221100675/194185761-vector-de-icono-de-imagen-para-web-y-aplicaci%C3%B3n-m%C3%B3vil-signo-y-s%C3%ADmbolo-de-la-galer%C3%ADa-de-fotos-icono.jpg",
        },
    });
    return Products;
};
//# sourceMappingURL=Products.js.map