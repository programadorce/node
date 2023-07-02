# node
Introdução ao node

Primeiro exemplo com Node.js

Comando para criar package.json

//1 - É preciso preencher
npm init 

//1 - Preencimento é automatico
npm init -y 

//2 - Intalação do modulo para gerenciar rotas
npm install express

Criando uma arquivo app.js

//3 - incluindo o modulo express e atribuindo para uma constante chamada express
const express = require("express");

//4 - O camando acima retorna um função express que foi atribuida a uma constante chamada app

const app = express();

//6 - Cria um rota e utiliza o res para imprimir uma mensagem no navegador
app.get("/",(req,res) => {
    res.send("Olá Mundo");
})

//5 - Executa o servidor, o 3000 é a porta onde o servidor irá rodar, após a vírgula cria um arrow functions
app.listen(8080,()=>{
    console.log("Servidor iniciado na porta 3000!");
});


//6 - Para iniciar o servidor no prompt
node app.js