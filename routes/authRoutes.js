const express = require("express");
const path = require("path");

const router = express.Router();

const auth = require("../middlewares/auth");

const {
    login,
    logout,
    registrar
} = require("../controllers/authController");

router.post("/login", login);

router.get("/logout", logout);

router.post("/registrar", registrar);

//ROTA DE LOGIN
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//ROTA PROTEGIDA
router.get("/main", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "../private/main.html"));
});

//ROTA DE REGISTRO
router.get("/registrar", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/registrar.html"));
});

module.exports = router;