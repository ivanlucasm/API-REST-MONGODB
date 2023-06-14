import NaoEncontrado from "../Erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class livroController{

  static listarLivros =  async (req, res, next) => {
    try{
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };

  static listarLivroById = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livrosResultado !== null){
        res.status(200).json(livrosResultado);
      }else{
        next(new NaoEncontrado("ID do livro não encotrado"));
      }
      
    }catch(erro){
      next(erro);
    }
  };

  static criarLivro = async (req, res, next) => {
    try{
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    }catch(erro){
      next(erro);
    }
    
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResultado !== null){
        res.status(200).send({message: "Livro atualizado com sucesso. "});
      }else{
        next(new NaoEncontrado("ID do livro não encotrado"));
      }
      
    }catch(erro){
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);
      if(livroResultado !== null){
        res.status(200).send({message: `Livro ${id} excluído com sucesso`});
      }else{
        next(new NaoEncontrado("ID do livro não encotrado"));
      }
    }catch(erro){
      next(erro);
    }
  };

  static listaLivroPorEditora = async (req, res, next) =>{
    try{
      const editora = req.query.editora;
      const resultadoLivro = await livros.find({"editora": editora});
      res.status(200).send(resultadoLivro);
    }catch(erro){
      next(erro);
    }
  };
}

export default livroController;