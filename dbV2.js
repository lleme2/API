const { MongoClient } = require("mongodb");
const uri = "mongodb://mongo:kLE9591apUXPdGLyayMu@containers-us-west-44.railway.app:7658/";
const client = new MongoClient(uri);
require("dotenv").config();
const database = client.db('test');
const user = database.collection('users');



const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;


app.get('/', async (req,res) => {
  res.send("deu certo")
})

app.post('/signin', async (req, res) => {
    console.log(req.body);
    const dados = req.body;
    try {
        await client.connect();
        const query = {
          email: dados.email,
          senha: dados.password,
          cargo: dados.cargo,
          nome:  dados.nome
        }; 
        await user.insertOne(query);
        //console.log(user);
      } catch(e){
        console.log(e);
      }
      res.send('Sucessfull sign in!');
      
      
  //res.send('Hello World!')
});

app.post('/login', async (req, res) => {
    const dados = req.body;
    const ver_email = await user.findOne({email: dados.email});
      if(!ver_email){
        console.log("\nUsuario nao encontrado!")
      }
      else{
        console.log("\nEMAIL CORRETO")
        const ver_pass = await bcrypt.compare(dados.password, ver_email.senha);

        if(!ver_pass){
        console.log("\nSenha invalida!");
        }
        else{
        console.log("\nSENHA CORRETA, USUARIO LOGADO");
        }
       const token = jwt.sign({email: dados.email},process.env.SECRET);
       res.json({accessToken: token});
    }
});

// axios.post("localhdasda/auth/aluno")

app.post('/auth/aluno', async (req,res) => {

})

app.listen(process.env.PORT , () => {
  console.log(`Example app listening on port ${port}`)
});


// 
//
//