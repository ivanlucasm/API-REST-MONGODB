import express from "express";
import routerLivro from "./livrosRoutes.js";
import routerAutor from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de Node"});
  });

  app.use(
    express.json(),
    routerLivro,
    routerAutor
  );
};

export default routes;