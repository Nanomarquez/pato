const { Auths } = require("../database/db");
import generateToken from "../utils/generateToken";

export const getAuth = async (req: any, res: any, next: any) => {
  const tokenUser = req.user;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    const authInstance = await Auths.findOne({
      where: { id: tokenUser.id },
    });
    return res.status(200).json({ auth: authInstance });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      status: 402,
      message: "Faltan datos",
    });
  }
  try {
    const authInstance = await Auths.findOne({ where: { email } });
    if (!authInstance) {
      return next({
        status: 401,
        message: "Usuario no encontrado",
      });
    }
    const validatePassword = await authInstance.comparePassword(password);
    if (!validatePassword) {
      return next({
        status: 401,
        message: "Contraseña incorrecta",
      });
    }
    const jwToken = generateToken(authInstance.id);
    return res.status(200).json({
      auth: authInstance,
      token: jwToken?.token,
    });
  } catch (error) {
    next(error);
  }
};

export const putUser = async (req: any, res: any, next: any) => {
  const tokenUser = req.user;

  const { email, password , newEmail,newPassword } = req.body;
  if (!tokenUser) {
    return next({
      status: 401,
      message: "No estas autorizado",
    });
  }
  try {
    const authInstance = await Auths.findOne({ where: { email } });
    if (!authInstance) {
      return next({
        status: 404,
        message: "Email no encontrado",
      });
    }
    console.log( await authInstance.comparePassword(password))
    if(!await authInstance.comparePassword(password)){
      return next({
        status:401,
        message: "Contraseña incorrecta"
      })
    }
    await authInstance.update({
      email: newEmail ? newEmail : email,
      password: newPassword ? newPassword : password,
    });
    return res.status(200).send({
      auth: authInstance,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

