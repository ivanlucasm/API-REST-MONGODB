import express from 'express';
import autorController from '../controllers/autorController.js';

const routerAutor = express.Router();

routerAutor
    .get("/autores", autorController.listarAutor)
    .get("/autores/:id", autorController.listarAutorById)
    .post("/autores", autorController.criarAutor)
    .put("/autores/:id", autorController.atualizarAutor)
    .delete("/autores/:id", autorController.excluirAutor)

    export default routerAutor;
