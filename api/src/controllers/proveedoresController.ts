const { Proveedores, Products } = require("../database/db");

export const getAll = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    const category = await Proveedores.findAll();
    res.send(category);
  } catch (error) {
    next(error);
  }
};
export const precioProveedor = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { id, aumentar } = req.body;
  try {
    const products = await Products.findAll({
      where: {
        proveedoresId: id,
      },
    });
    products.forEach(async (product: any) => {
      let productInstance = await Products.findOne({
        where: { id: product.id },
      });
      await productInstance.update({
        precioCompra:
          (productInstance.precioCompra * aumentar) / 100 +
          productInstance.precioCompra,
      });
      productInstance.save();
    });
    // await products.upgrade({
    //   precioCompra: (products.precioCompra * aumentar / 100) + products.precioCompra
    // })
    // products.save()
    res.send({ message: "Productos actualizados" });
  } catch (error) {
    next(error);
  }
};
export const postProveedor = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre , precio_sugerido } = req.body;
  try {
    const instanceProveedor = await Proveedores.findOne({
      where: {
        nombre,
      },
    });
    if (instanceProveedor) {
      next({
        status: 401,
        message: "Proveedor ya existente",
      });
    }
    const newProveedor = await instanceProveedor.create({
      nombre,
      precio_sugerido
    });
    res.send(newProveedor);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { id } = req.params;

  try {
    let proveedor = await Proveedores.findOne({
      where: {
        id,
      },
    });
    if (!proveedor) {
      next({
        status: 401,
        message: "Proveedor inexistente",
      });
    }
    res.send(proveedor);
  } catch (error) {
    next(error);
  }
};

export const putProveedor = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre, precio_sugerido } = req.body;
  const { id } = req.params;

  try {
    let proveedor = await Proveedores.findOne({
      where: {
        id,
      },
    });
    if (!proveedor) {
      next({
        status: 401,
        message: "Proveedor inexistente",
      });
    }
    await proveedor.update({
      nombre,
      precio_sugerido,
    });
    proveedor.save();
    res.send(proveedor);
  } catch (error) {
    next(error);
  }
};

export const deleteProveedor = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { id } = req.params;
  try {
    let proveedor = await Proveedores.findOne({ where: { id } });
    if (!proveedor) {
      next({
        status: 401,
        message: "Proveedor inexistente",
      });
    }
    await proveedor.destroy();
    res.send({ message: "Proveedor eliminado" });
  } catch (error) {
    next(error);
  }
};
