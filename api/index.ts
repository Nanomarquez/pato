import dotenv from "dotenv";
dotenv.config();
import { server } from "./src/app";
const { conn,create,Auths } = require("./src/database/db");
conn.sync({ force: true }).then(async () => {
  if(await Auths.count() < 1) {
    create()
  }
  server.listen(process.env.PORT, () => {
    console.log(`⇒ listening at port ${process.env.PORT}`);
  });
});

