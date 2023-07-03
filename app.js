const express = require("express");

const app = express();

app.get("/", (req,res) => {
    res.send("Olá Mundo!")
});

app.get("/contato", (req,res) =>{
    res.end("Pagina de Contato!")
});

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000");
});