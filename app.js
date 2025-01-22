//Inizializziamo
const express = require("express");
const app = express();
const port = 3000;
//Import
const posts = require("./data/posts")
const handleError = require("./middleware/handleError")
const postsRouter = require("./routers/posts")
const tagsRouter = require("./routers/tags")
const cors = require("cors")

//bodyParser
app.use(express.json())
//static for imgs - cartella di default del nostro server
app.use(express.static("public"));
//Diamo permesso a questo indirizzo di richiedere i dati - chiamiamo cors come funzione con parametro
app.use(cors({
    origin: "http://localhost:5173/"   
}))

//Comunichiamo esistenza rotte
app.use("/posts", postsRouter);
app.use("/tags",tagsRouter)

app.get("/", (req, res)=>{
    // ciao();
    res.json("Hello");
})

app.use(handleError)

app.listen(port, ()=>{
    console.log("Il server e'partito");
})


