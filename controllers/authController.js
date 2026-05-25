const fs = require("fs").promises;

async function login(req, res) {
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

            //armazenar o usuário na sessão
            req.session.user = {
                name: usuario.nome,
                email: usuario.email
            };

            return res.json({
                success: true,
                message: "Login OK",
                Location: "/main"
            });
        } else {
            return res.json({
                success: false,
                message: name === "" || email === "" || password === "" ? "Preencha todos os campos" : "Credenciais inválidas"
            });
        };
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    }
}

function logout(req, res) {
     req.session.destroy(() => {
        res.json({ 
            success: true, 
            message: "Session destroyed",
            Location: "/login"
        });
    });
}

function registrar(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: "Preencha todos os campos"
        });
    }

    fs.readFile("db/usuarios.json", "utf-8")
        .then(data => {
            const users = JSON.parse(data);

            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return res.json({
                    success: false,
                    message: "Email já registrado"
                });
            }

            const newUser = { nome: name, email, password };
            users.push(newUser);

            return fs.writeFile("db/usuarios.json", JSON.stringify(users, null, 2));
        })
        .then(() => {
            res.json({
                success: true,
                message: "Registro bem-sucedido",
                Location: "/login"
            });
        })
}
module.exports = { 
    login, 
    logout,
    registrar
};