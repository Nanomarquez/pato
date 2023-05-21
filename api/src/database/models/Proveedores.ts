import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  const Proveedores = sequelize.define("proveedores", 
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
    precio_sugerido:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cantidad_productos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  );

  return Proveedores;
};
