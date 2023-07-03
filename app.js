const express = require("express");

const app = express();

const contatos = ["Thiago","Camila","Maria Thaís"]

app.get("/", (req,res) => {
    return res.json(contatos);
});

app.get("/contato/:id", (req,res) =>{
    const {id}= req.params;
    return res.json({
        nome: contatos[id]
    })
});

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000");
});