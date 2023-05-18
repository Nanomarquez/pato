import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  const Products = sequelize.define("products", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioCompra: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    medida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue:
        "https://previews.123rf.com/images/lunaraa/lunaraa2211/lunaraa221100675/194185761-vector-de-icono-de-imagen-para-web-y-aplicaci%C3%B3n-m%C3%B3vil-signo-y-s%C3%ADmbolo-de-la-galer%C3%ADa-de-fotos-icono.jpg",
    },
  });

  return Products;
};
