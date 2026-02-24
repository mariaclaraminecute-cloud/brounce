const btn = document.querySelector(".tamanho-btn");
const opcoes = document.querySelector(".tamanho-opcoes");

btn.addEventListener("click", () => {
  opcoes.style.display = opcoes.style.display === "block" ? "none" : "block";
});


document.addEventListener("click", (e) => {
  if (!btn.contains(e.target) && !opcoes.contains(e.target)) {
    opcoes.style.display = "none";
  }
});