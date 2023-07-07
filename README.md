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

//Cria uma rota do tipo put para editar um contato no array
//req.body para receber os dados do corpo da página
app.put("/contatos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;
    return res.json(contatos);
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});


#Como criar o delete na API


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

//Cria uma rota do tipo delete para apagar um contato no array
app.delete("/contatos/:id",(req,res)=>{
    const {id} = req.params;
    contatos.splice(id,1);
    return res.json(contatos)
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

#Como validar requisição com Middlewares
const express = require("express");

const app = express();

app.use(express.json());

const contatos = ["Thiago", "Camila", "Maria Thaís"];

//Exemplo para entenfimento de como funciona o middlewares
/* app.use((req,res,next) => {
    console.log("Acessou o Middlewares!");
    next()
}); */

//Esse middlewares verifica se a posição nome está sendo passada corretamente.
function valContato(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        });
    }
   return next()
};


//Esse middlewares verifica se a posição id existe na lista de contatos
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