import express from "express";
import livroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routerLivro = express.Router();

routerLivro
  .get("/livros", livroController.listarLivros, paginar)
  .get("/livros/busca", livroController.listarLivroPorFiltro, paginar)
  .get("/livros/:id", livroController.listarLivroById)
  .post("/livros", livroController.criarLivro)
  .put("/livros/:id", livroController.atualizarLivro)
  .delete("/livros/:id", livroController.excluirLivro);

export default routerLivro;



