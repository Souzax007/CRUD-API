// Função que será chamada ao pressionar Enter
function clickEnter(event) {
    if (event.key === "Enter") {
        login(); // Chama a função login()
    }
}

// Adiciona os listeners quando o DOM está pronto
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("name").addEventListener("keypress", clickEnter);
    document.getElementById("email").addEventListener("keypress", clickEnter);
    document.getElementById("password").addEventListener("keypress", clickEnter);
});   