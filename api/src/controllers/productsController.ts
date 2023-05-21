const { Products, Categories , Proveedores} = require("../database/db");

export const getAll = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    const products = await Products.findAll({include:[
      {
        model:Proveedores,
        attributes:['precio_sugerido']
      }
    ]});
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const getAllByCategory = async (req, res, next) => {
  const tokenUser = req.user;
  const { categoriesId } = req.params;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  console.log(categoriesId);
  try {
    if (categoriesId) {
      let category = await Categories.findOne({ where: { id: categoriesId } });
      if (!category) {
        next({
          status: 401,
          message: "Categoria inexistente",
        });
      }
      let productsByCategory = await Products.findAll({
        where: { categoriesId },
      });
      res.send(productsByCategory);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllByProveedor = async (req, res, next) => {
  const tokenUser = req.user;
  const { proveedoresId } = req.params;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    if (proveedoresId) {
      let proveedor = await Proveedores.findOne({ where: { id: proveedoresId } });
      if (!proveedor) {
        next({
          status: 401,
          message: "Proveedor inexistente",
        });
      }
      let productsByProveedor = await Products.findAll({
        where: { proveedoresId },
      });
      res.send(productsByProveedor);
    }
  } catch (error) {
    next(error);
  }
};

export const postProduct = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre, medida, precioCompra,precioVenta, stock, imagen, categoriesId,proveedoresId } = req.body;
  try {
    if (medida) {
      const instanceProduct = await Products.findOne({
        where: {
          nombre,
          medida,
        },
      });
      if (instanceProduct) {
        next({
          status: 401,
          message: "Producto ya existente",
        });
      }
    }
    const newProduct = await Products.create({
      nombre,
      medida,
      precioCompra,
      precioVenta,
      stock,
      imagen,
      categoriesId,
      proveedoresId
    });
    res.send(newProduct);
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
    let product = await Products.findOne({
      where: {
        id,
      },
    });
    
    console.log(await product.getCategory())
    if (!product) {
      next({
        status: 401,
        message: "Producto inexistente",
      });
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const putProduct = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre, medida, precioCompra,precioVenta, stock, imagen, categoriesId , proveedoresId} = req.body;
  const { id } = req.params;
  console.log(req.body)
  try {
    let product = await Products.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      next({
        status: 401,
        message: "Producto inexistente",
      });
    }
    await product.update({
      nombre,
      medida,
      precioCompra,
      precioVenta,
      stock,
      imagen,
      categoriesId,
      proveedoresId
    });
    product.save();
    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const putStockProduct = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { stock } = req.body;
  const { id } = req.params;

  try {
    let product = await Products.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      next({
        status: 401,
        message: "Producto inexistente",
      });
    }
    let prevStock = product.stock
    await product.update({
      stock : prevStock - stock
    });
    product.save();
    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { id } = req.params;
  try {
    let product = await Products.findOne({ where: { id } });
    if (!product) {
      next({
        status: 401,
        message: "Producto inexistente",
      });
    }
    await product.destroy();
    res.send({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
};
