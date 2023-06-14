import NaoEncontrado from "../Erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
class livroController{

  static listarLivros =  async (req, res, next) => {
    try{
      const buscaLivros = livros.find();
      
      req.resultado = buscaLivros;

      next();
     
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

  //   static listaLivroPorEditora = async (req, res, next) =>{
  //     try{
  //       const editora = req.query.editora;
  //       const resultadoLivro = await livros.find({"editora": editora});
  //       res.status(200).send(resultadoLivro);
  //     }catch(erro){
  //       next(erro);
  //     }
  //   };
  // }

  static listarLivroPorFiltro = async (req, res, next) =>{
    try{
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const livrosResultado = livros
          .find(busca)
          .populate("autor", "nome");
          
        req.resultado = livrosResultado;
        
        next();
      }else{
        res.status(200).send([]);
      }      
    }catch(erro){
      next(erro);
    }
  };
}

async function processaBusca(parametros){
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  //Greater Than or Equal = Maior ou Igual que
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //Lesss Than or Equal = Menor ou Igual que
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(nomeAutor){
    const autor = await autores.findOne({ nome: nomeAutor });

    if(autor!==null){
      busca.autor = autor._id;
    }else{
      busca= null;
    }


  }

  return busca;
}
export default livroController;