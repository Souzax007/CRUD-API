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

module.exports = { 
    login, 
    logout 
};