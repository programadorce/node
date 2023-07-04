# node
Introdução ao node

Primeiro exemplo com Node.js

Comando para criar package.json

# 1 - É preciso preencher
npm init 

# 1 - Preencimento é automatico
npm init -y 

# 2 - Intalação do modulo para gerenciar rotas
npm install express

# Criando uma arquivo app.js

# 3 - incluindo o modulo express e atribuindo para uma constante chamada express
const express = require("express");

# 4 - O camando acima retorna um função express que foi atribuida a uma constante chamada app

const app = express();

# 6 - Cria um rota e utiliza o res para imprimir uma mensagem no navegador
app.get("/",(req,res) => {
    res.send("Olá Mundo");
})

# 7 - Cria uma rota para página de contato
app.get("/contato", (req,res) =>{
    res.end("Página de contato!")
})

# 5 - Executa o servidor, o 3000 é a porta onde o servidor irá rodar, após a vírgula cria um arrow functions
app.listen(8080,()=>{
    console.log("Servidor iniciado na porta 3000!");
});


# 6 - Para iniciar o servidor no prompt
node app.js

# Como usar o Nodemon

# 1 - Instalação do Nodemon apenas em ambiente de desenvolvimento
npm install -D nodemon

# 2 - Para iniciar o servidor
nodemon app.js

# Como instalar todas as dependências do projeto

# 1 - Comando para instalar as dependências do projeto
npm install 

# O que é Rest API
GET - Listar 
POST - Criar
PUT - Criar ou editar
DELETE - Remover

# Retornando dados em json
# No passo 7 do Primeiro exemplo com Node.js faz a seguinte alteração
# :id recebe o parametro da url e a constante id recebe o valor através do req.params e nome do paramentro usado na rota nesse exemplo o id
# Pela a rota também podemos receber variável, para isso usamos req.query e nome da variável enviado na rota. obs descontrução
app.get("/contato/:id", (req,res) =>{
    const {id} = req.params;
    const {status} = req.query;
    return res.json({
        id,
        nome: "Thiago",
        status
    })
});

# Como usar o Insomnia

const express = require("express");

const app = express();

#cria um array de contatos
const contatos = ["Thiago","Camila","Maria Thaís"]

#Alteração para retornar o array de contatos criado acima
app.get("/", (req,res) => {
    return res.json(contatos);
});

#Alteração para imprimir o valor de acordo com a posição no array contatos
app.get("/contato/:id", (req,res) =>{
    const {id}= req.params;
    return res.json({
        nome: contatos[id]
    })
});

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000");
});


# Como criar o post na API

const express = require("express");

const app = express();

//Função para poder receber dados em Json
app.use(express.json());

const contatos = ["Thiago","Camila","Maria Thaís"];

app.get("/", (req,res) => {
    return res.json(contatos);
});

app.get("/contato/:id", (req,res) =>{
    const {id}= req.params;
    return res.json({
        nome: contatos[id]
    })
});

//Cria uma rota do tipo post para cadastrar um novo contati no array
//req.body para receber os dados do corpo da página
app.post("/contatos",(req,res) =>{
    const {nome} = req.body;

    contatos.push(nome);

    return res.json(contatos)
})

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000");
});


#Como criar o put na API
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
