const {Auths} = require('../database/db')
import jwt from 'jsonwebtoken'

const verifyToken = (token:any, secret:any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err:any, decodedToken:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

export const authenticate = (secret:any) => async (req:any, res:any, next:any) => {
  const { authorization:token } = req.headers;
  if (!token) {
    return next();
  }

  try {
    const decodedToken = await verifyToken(token, secret) as any;
    const ifUserExists = await Auths.findByPk(decodedToken.uid);
    if (!ifUserExists) {
      return next({
        statusCode: 404,
        message: 'El token brindado no es de un usuario registrado',
      });
    }
    req.user = ifUserExists;
    return next();
  } catch (err) {
    return next({
      statusCode: 403,
      message: 'Sesión vencida. Vuelve a iniciar sesion por favor.',
    });
  }
};

const isAuthenticated = (req:any) => !!req.user;
const isAdmin = (req:any) => req.user && req.user.rol === 'Admin';

export const requireAuth = (req:any, res:any, next:any) =>
  !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
      })
    : next();

export const requireAdmin = (req:any, res:any, next:any) =>
  !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
      })
    : !isAdmin(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas permisos de Administrador.',
      })
    : next();

