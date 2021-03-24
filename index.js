const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const nodemailer = require("nodemailer")

//Body-Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Configurando express para enchergar os arquivos estatícos
app.use(express.static(path.join(__dirname, "public")))

//Rotas
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

//Config Nodemailer
const {
    USER,
    PASS
} = process.env
const config = {
    host: 'smtp.umbler.com',
    port: 587,
    auth: {
        user: USER,
        pass: PASS,
    }
}
const transporter = nodemailer.createTransport(config)


//Router E-mail
app.post("/send", (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const text = req.body.message

    const message = {
        from: USER,
        to: USER,
        replyTo: email,
        text: "Nome: " + name + "\n\n" +
            "Email: " + email + "\n\n" +
            "telefone: " + phone + "\n\n" +
            "Mensagem: " + text
    }
    transporter.sendMail(message, function (error, info) {

        if (error) {
            return res.sendFile(__dirname + "/views/erroaoenviar.html")
        }
        return res.sendFile(__dirname + "/views/enviado.html")

    })
})

//configurando a porta do servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta: " + 3000)
})