import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  const Categories = sequelize.define("categories", 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_productos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  );

  return Categories;
};
