
const botaoMenu = document.querySelector("#btn-menu");
const menu = document.querySelector(".main-nav");

let cliques = 0;


console.log(botaoMenu);
console.log(menu);

botaoMenu.addEventListener("click", function () {
    cliques++;
console.log("Quantidade de cliques: " + cliques);

// Abre e fecha o menu e conta os cliques
  menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
        botaoMenu.textContent = "✕ Fechar";
    } else {
        botaoMenu.textContent = "☰ Menu";
    }
});

// Ativa e desativa o modo escuro
const botaoTema = document.querySelector("#btn-tema");

if (botaoTema) {
    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("escuro");
    });
}

// Fecha o menu ao clicar em um link
const links = menu.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("ativo");
        botaoMenu.textContent = "☰ Menu";
    });
});
