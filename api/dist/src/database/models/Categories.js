"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const Categories = sequelize.define("categories", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        cantidad_productos: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
    return Categories;
};
//# sourceMappingURL=Categories.js.map