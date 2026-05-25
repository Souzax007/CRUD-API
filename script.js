const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //ler json
        const data = await fs.readFile("db/usuarios.json", "utf-8");

        //converter json para array
        const users = JSON.parse(data);

        const usuario = users.find(user =>
            user.nome === name &&
            user.email === email &&
            user.password === password
        )

        if (usuario) {
            return res.json({
                success: true,
                message: "Login OK",
                Location: "main.html"
            });
        } else {
            return res.json({
                success: false,
                message: "Erro no login"
            });
        };
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    }
    });
    


app.listen(9090, function () {
    console.log("http://localhost:9090");
});