import jwt,{type Secret} from "jsonwebtoken"
//JWT Token Generate
const generateToken = (uid:string) => {
  const secret = process.env.JWT_SECRET as Secret;
  const expTime = process.env.JWT_EXPTIME;
  try {
    const token = jwt.sign({ uid }, secret, { expiresIn: expTime });
    return {token: token, expiresIn: expTime};
  }
  catch (error:any) {
    return error.message
  }
};
export default generateToken;