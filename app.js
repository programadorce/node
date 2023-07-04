const express = require("express");

const app = express();

app.use(express.json());

const contatos = ["Thiago", "Camila", "Maria Thaís"];

app.get("/", (req, res) => {
    return res.json(contatos);
});

app.get("/contato/:id", (req, res) => {
    const { id } = req.params;
    return res.json({
        nome: contatos[id]
    })
});

app.post("/contatos", (req, res) => {
    const { nome } = req.body;
    contatos.push(nome);
    return res.json(contatos)
});

app.put("/contatos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;
    return res.json(contatos);
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});