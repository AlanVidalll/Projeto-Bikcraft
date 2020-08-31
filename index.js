const express = require("express")
const app = express()
const path = require("path")
const nodemailer = require("nodemailer")
const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.get("/", ((req, res) => {
    res.sendFile(__dirname + "/views/index.html")
}))
app.get("/sobre", ((req, res) => {
    res.sendFile(__dirname + "/views/sobre.html")
}))
app.get("/produtos", ((req, res) => {
    res.sendFile(__dirname + "/views/produtos.html")
}))
app.get("/portfolio", ((req, res) => {
    res.sendFile(__dirname + "/views/portfolio.html")
}))
app.get("/contato", ((req, res) => {
    res.sendFile(__dirname + "/views/contato.html")
}))

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port)
})