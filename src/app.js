import express from "express";
import db from "./config/dbConect.js";
import routes from "./routes/index.js";
import mongoose
  from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso.");
});

const app = express();
app.use(express.json());
app.use((req, res, next) =>{
  console.log("Código do novo middleware. ")
  next();
});
routes(app);

app.use(manipuladorDeErros);

export default app;