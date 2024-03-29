import NaoEncontrado from "../Erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class autorController{

  static listarAutor =  async (req, res, next) => {
    try{
      const autoresResultado =  autores.find();
      req.resultado = autoresResultado;
      next();
    }catch(erro){
      // eslint-disable-next-line no-undef
      next(erro);
    }
    
  };

  static listarAutorById = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null){
        res.status(200).send(autorResultado);
      }else{
        next(new NaoEncontrado("Id do autor não localizado. "));
      }
    }catch(erro){
      next(erro);
    }
  };

  static criarAutor = async (req, res, next) => {
    try{
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    }catch(erro){
      next(erro);
    }   
  };

  static atualizarAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(autorResultado !== null){
        res.status(200).send({message: "Autor atualizado com sucesso. "});
      }else{
        next(new NaoEncontrado("ID do Autor não localizado!"));
      }
      
    }catch(erro){
      next(erro);
    }
    
  };

  static excluirAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndDelete(id);
      if(autorResultado !== null){
        res.status(200).send({message: `Autor ${id} excluído com sucesso`});
      }else{
        next(new NaoEncontrado("ID do autor não localizado. "));
      }
      
    }catch(erro){
      next(erro);
    }
  };
}



export default autorController;