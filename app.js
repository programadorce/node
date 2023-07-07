const express = require("express");

const app = express();

app.use(express.json());

const contatos = ["Thiago", "Camila", "Maria Thaís"];

/* app.use((req,res,next) => {
    console.log("Acessou o Middlewares!");
    next()
}); */

function valContato(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        });
    }
   return next()
};


function valPosContato(req,res,next){
    if(!contatos[req.params.id]){
        return res.status(400).json({
            error: "Contato não encontrado!"
        });
    }

    return next();
}


app.get("/", (req, res) => {
    console.log("Acessou listar contatos!")
    return res.json(contatos);
});

app.get("/contato/:id", valPosContato, (req, res) => {
    const { id } = req.params;
    return res.json({
        nome: contatos[id]
    })
});

app.post("/contatos", valContato, (req, res) => {
    const { nome } = req.body;
    contatos.push(nome);
    return res.json(contatos)
});

app.put("/contatos/:id",valContato,valPosContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;
    return res.json(contatos);
});
 
app.delete("/contatos/:id", valPosContato, (req,res)=>{
    const {id} = req.params;
    contatos.splice(id,1);
    return res.json(contatos)
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});