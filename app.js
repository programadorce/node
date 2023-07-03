const express = require("express");

const app = express();

app.get("/", (req,res) => {
    res.send("Olá Mundo!")
});

app.get("/contato/:id", (req,res) =>{
    const {id}= req.params;
    const {status} = req.query;
    return res.json({
        id,
        nome: "Thiago",
        status
    })
});

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000");
});