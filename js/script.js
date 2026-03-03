
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Produto adicionado ao carrinho:", produto);

  const url = "https://jsonplaceholder.typicode.com/posts";
  console.log("HTTP POST Adicionar Produto enviado para:", url);
  console.log("Body enviado:", produto);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  })
    .then(res => res.json())
    .then(data => console.log("Resposta do POST Adicionar:", data))
    .catch(err => console.error("Erro no POST Adicionar:", err));

  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  const produto = carrinho.splice(index, 1)[0];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Produto removido do carrinho:", produto);

  const url = `https://jsonplaceholder.typicode.com/posts/${index}`;
  console.log("HTTP DELETE Remover Produto enviado para:", url);
  console.log("Body enviado:", produto);

  fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  })
    .then(res => res.json())
    .then(data => console.log("Resposta do DELETE Remover:", data))
    .catch(err => console.error("Erro no DELETE Remover:", err));

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  if (!lista) return;

  lista.innerHTML = carrinho
    .map(
      (item, index) => `
      <li class="item-carrinho" style="display:flex;align-items:center;margin-bottom:10px;">
        <img src="${item.img}" alt="${item.nome}" width="80" style="margin-right:10px;">
        <div style="flex:1;">
          <span>${item.nome}</span> - <strong>R$ ${item.preco}</strong>
        </div>
        <button onclick='removerDoCarrinho(${index})'>Remover</button>
      </li>
    `
    )
    .join("");

  const total = carrinho.reduce((acc, item) => {
    const precoNum = parseFloat(item.preco.replace(",", "."));
    return acc + (isNaN(precoNum) ? 0 : precoNum);
  }, 0);

  let totalHTML = document.getElementById("totalCarrinho");
  if (!totalHTML) {
    totalHTML = document.createElement("p");
    totalHTML.id = "totalCarrinho";
    totalHTML.style.fontWeight = "bold";
    totalHTML.style.marginTop = "20px";
    lista.parentElement.appendChild(totalHTML);
  }
  totalHTML.textContent = `Total: R$ ${total.toFixed(2)}`;

  let btnFinalizar = document.getElementById("btnFinalizarCompra");
  if (!btnFinalizar) {
    btnFinalizar = document.createElement("button");
    btnFinalizar.id = "btnFinalizarCompra";
    btnFinalizar.textContent = "Finalizar Compra";
    btnFinalizar.style.marginTop = "10px";
    btnFinalizar.style.padding = "10px 15px";
    btnFinalizar.style.fontWeight = "bold";
    lista.parentElement.appendChild(btnFinalizar);

    btnFinalizar.addEventListener("click", finalizarCompra);
  }
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const url = "https://jsonplaceholder.typicode.com/posts";
  const body = {
    produtos: carrinho,
    total: carrinho.reduce(
      (acc, item) => acc + parseFloat(item.preco.replace(",", ".")),
      0
    )
  };

  console.log("HTTP POST Finalizar Compra enviado para:", url);
  console.log("Body enviado:", body);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Dados recebidos da Finalização:", data);
      alert("Compra finalizada com sucesso!");
      carrinho = [];
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarCarrinho();
    })
    .catch(err => console.error("Erro na Finalização:", err));
}

const categorias = [
  { card: "card-aleatoria", preco: "preco-aleatoria" },
  { card: "card-maquiagem", preco: "preco-maquiagem" },
  { card: "card-roupa", preco: "preco" },
  { card: "card-sapato", preco: "preco-sapato" },
  { card: "card-acessorio", preco: "preco-acessorio" }
];

categorias.forEach(categoria => {
  const botoes = document.querySelectorAll(`.${categoria.card} button`);
  botoes.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const cards = document.querySelectorAll(`.${categoria.card}`);
      const card = cards[index];

      const produto = {
        nome: card.querySelector("h3")?.textContent || "Produto",
        preco: card.querySelector(`.${categoria.preco}`)?.textContent.replace("R$ ", "") || "0,00",
        img: card.querySelector("img")?.src || ""
      };

      adicionarAoCarrinho(produto);
    });
  });
});

function pesquisar() {
  const termo = document.getElementById("campoBusca")?.value;
  if (!termo || termo.trim() === "") {
    alert("Digite algo para buscar");
    return;
  }

  const url = `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(termo)}`;
  console.log("HTTP GET enviado para:", url);

  fetch(url, { method: "GET" })
    .then(res => res.json())
    .then(data => {
      console.log("Dados GET recebidos:", data);
      const resultado = document.getElementById("resultado");
      if (resultado) resultado.innerHTML = data.map(item => `<p>${item.title}</p>`).join("");
    })
    .catch(err => console.error("Erro GET:", err));
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("email")?.value;
  const senha = document.getElementById("senha")?.value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const url = "https://jsonplaceholder.typicode.com/posts";
  console.log("HTTP POST Login enviado para:", url);
  console.log("Body enviado:", { email, senha });

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Dados recebidos do Login:", data);
      alert("Login simulado com sucesso!");
      window.location.href = "index.html";
    })
    .catch(err => console.error("Erro no Login:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  if (formLogin) formLogin.addEventListener("submit", login);

  atualizarCarrinho();
});