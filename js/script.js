let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Produto adicionado ao carrinho:", produto);

  atualizarCarrinhoComQuery();
}

function removerDoCarrinho(index) {
  const produto = carrinho.splice(index, 1)[0];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Produto removido do carrinho:", produto);

  atualizarCarrinhoComQuery();
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

  alert("Compra finalizada com sucesso!");
  carrinho = [];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarCarrinhoComQuery(); 
}


function atualizarQueryCarrinho() {
  const params = new URLSearchParams();
  carrinho.forEach(item => {
    params.append("item", `${item.nome}-${item.preco}`);
  });

  history.replaceState(null, "", "?" + params.toString());
}


function atualizarCarrinhoComQuery() {
  atualizarCarrinho();
  atualizarQueryCarrinho();
}


const categorias = [
  { card: "card-aleatoria", preco: "preco-aleatoria" },
  { card: "card-maquiagem", preco: "preco-maquiagem" },
  { card: "card-roupa", preco: "preco-roupa" },
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


document.addEventListener("DOMContentLoaded", () => {
  atualizarCarrinhoComQuery(); 
});