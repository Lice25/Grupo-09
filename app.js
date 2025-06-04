const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () =>nav.classList.toggle("active"));

fetch('index.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbar').innerHTML = html;
    })
    .catch(error => console.error("Erro ao carregar a navbar:", error));