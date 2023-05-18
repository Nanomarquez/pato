const { Categories } = require("../database/db");

export const getAll = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    const category = await Categories.findAll();
    res.send(category);
  } catch (error) {
    next(error);
  }
};

export const postCategory = async (req, res, next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre } = req.body;
  try {
    const instanceCategory = await Categories.findOne({
      where: {
        nombre,
      },
    });
    if(instanceCategory){
      next({
        status: 401,
        message: "Categoria ya existente"
      })
    }
    const newCategory = await Categories.create({
      nombre
    })
    res.send(newCategory)
  } catch (error) {
    next(error)
  }
};

export const getOne = async (req,res,next)=>{
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const {id} = req.params

  try {
    let category = await Categories.findOne({
      where:{
        id
      }
    })
    if(!category){
      next({
        status:401,
        message:"Categoria inexistente"
      })
    }
    res.send(category)
  } catch (error) {
    next(error)
  }
}

export const putCategory = async (req,res,next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const { nombre } = req.body;
  const {id} = req.params

  try {
    let category = await Categories.findOne({
      where:{
        id
      }
    })
    if(!category){
      next({
        status:401,
        message:"Categoria inexistente"
      })
    }
    await category.update({
      nombre
    })
    category.save()
    res.send(category)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req,res,next) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  const {id} = req.params
  try {
    let category = await Categories.findOne({where:{id}})
    if(!category){
      next({
        status:401,
        message:"Categoria inexistente"
      })
    }
    await category.destroy()
    res.send({message:"Categoria eliminado"})
  } catch (error) {
    next(error)
  }
}

