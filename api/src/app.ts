import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes/index";
import http from "http";
import { authenticate } from "../src/middlewares/auth";

const app: any = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true, limit: "300mb" }));
app.use(bodyParser.json({ limit: "300mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // agregamos la cabecera Authorization
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(authenticate(process.env.JWT_SECRET));
app.use("/", router);
app.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ status, message });
});

export { server };
