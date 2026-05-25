const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "private")));

// Configuração da sessão
app.use(session({
    secret: "meu-segredo",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure:false,
        maxAge: 60 * 60 * 1000 // 1 hora
    }
}));

app.use(authRoutes);


app.listen(9090, function () {
    console.log("http://localhost:9090");
});