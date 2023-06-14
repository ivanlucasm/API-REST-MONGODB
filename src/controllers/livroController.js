import livros from "../models/Livro.js";

class livroController{

  static listarLivros =  async (req, res) => {
    try{
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    }catch(erro){
      res.status(500).json({message: "Erro interno no servidor. "});
    }
  };

  static listarLivroById = async (req, res) => {
    try{
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livrosResultado);
    }catch(erro){
      res.status(400).send({message: `${erro.message} - Falha ao listar livro.`});
    }
  };

  static criarLivro = async (req, res) => {
    try{
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    }catch(erro){
      res.status(500).send({message: `${erro.message} - Falha ao cadastrar livro.`});
    }
    
  };

  static atualizarLivro = async (req, res) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso. "});
    }catch(erro){
      res.status(500).send({message: `${erro.message} - Falha ao atualizar.`});
    }
  };

  static excluirLivro = async (req, res) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: `Livro ${id} excluído com sucesso`});
    }catch(erro){
      res.status(400).send({message: `${erro.message} - Falha ao excluir livro. `});
    }
  };

  static listaLivroPorEditora = async (req, res) =>{
    try{
      const editora = req.query.editora;
      const resultadoLivro = await livros.find({"editora": editora});
      res.status(200).send(resultadoLivro);
    }catch(erro){
      res.status(500).send({message: "Erro interno no servidor."});
    }
  };
}

export default livroController;