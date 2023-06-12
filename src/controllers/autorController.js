import autores from "../models/Autor.js";

class autorController{

    static listarAutor = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        });
    }

    static listarAutorById = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if(err){
                res.status(400).send({message: `${err.message} - Falha ao listar Autor.`})
            }else{
                res.status(200).json(autores);
            }
        })
    }

    static criarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar Autor.`})
            }else{
                res.status(201).send(autor.toJSON());
            }
        });
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Autor atualizado com sucesso. '});
            }else{
                res.status(500).send({message: `${err.message} - Falha ao atualizar.`});
            }
        });
    }

    static excluirAutor = (req, res) => {

        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Autor ${id} excluído com sucesso`});
            }else{
                res.status(400).send({message: `${err.message} - Falha ao excluir Autor. `});
            }
        })
    }
}



export default autorController;