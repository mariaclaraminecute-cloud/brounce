
function atualizarTotal() {
  let total = 0;

  document.querySelectorAll(".item-carrinho").forEach(item => {
    const preco = parseFloat(item.dataset.preco);
    const qtd = parseInt(item.querySelector(".quantidade span").textContent);
    total += preco * qtd;
  });

  document.getElementById("total").textContent = total.toFixed(2);

  atualizarQueryURL();
}

function atualizarQuantidadeServidor(idProduto, quantidade) {
  const dados = { id: idProduto, quantidade: quantidade };
  console.log("PUT → Atualizando:", dados);

  fetch("https://jsonplaceholder.typicode.com/posts/" + idProduto, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
  .then(res => {
    console.log("Status PUT:", res.status);
    return res.json();
  })
  .then(data => console.log("Resposta PUT:", data))
  .catch(err => console.error("Erro PUT:", err));
}

function atualizarQueryURL() {
  const params = new URLSearchParams();
  document.querySelectorAll(".item-carrinho").forEach(item => {
    const nome = item.querySelector(".nome-produto").textContent;
    const preco = item.dataset.preco;
    const qtd = item.querySelector(".quantidade span").textContent;

    params.append("item", `${nome}-${preco}-${qtd}`);
  });

  history.replaceState(null, "", "?" + params.toString());
}

function carregarItensDaURL() {
  const params = new URLSearchParams(window.location.search);
  const itens = params.getAll("item");

  itens.forEach(str => {
    const [nome, preco, qtd] = str.split("-");
    const ul = document.getElementById("listaCarrinho");

    const li = document.createElement("li");
    li.classList.add("item-carrinho");
    li.dataset.preco = preco;

    li.innerHTML = `
      <span class="nome-produto">${nome}</span>
      <div class="quantidade">
        <button>-</button>
        <span>${qtd}</span>
        <button>+</button>
      </div>
      <div class="remover"><button>Remover</button></div>
    `;

    ul.appendChild(li);
  });
}


function configurarBotoesQuantidade() {
  document.querySelectorAll(".quantidade button:last-child").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const span = btn.parentElement.querySelector("span");
      let valor = parseInt(span.textContent) + 1;
      span.textContent = valor;

      atualizarTotal();
      atualizarQuantidadeServidor(index + 1, valor);
    });
  });

  document.querySelectorAll(".quantidade button:first-child").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const span = btn.parentElement.querySelector("span");
      let valor = parseInt(span.textContent);
      if (valor > 1) {
        valor--;
        span.textContent = valor;

        atualizarTotal();
        atualizarQuantidadeServidor(index + 1, valor);
      }
    });
  });
}

function configurarBotoesRemover() {
  document.querySelectorAll(".remover button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".item-carrinho");
      const idProduto = index + 1;

      console.log("DELETE → Produto:", idProduto);

      fetch("https://jsonplaceholder.typicode.com/posts/" + idProduto, {
        method: "DELETE"
      })
      .then(res => {
        console.log("Status DELETE:", res.status);
        if (res.ok) {
          item.remove();
          atualizarTotal();
        }
      })
      .catch(err => console.error("Erro DELETE:", err));
    });
  });
}


carregarItensDaURL();
atualizarTotal();
configurarBotoesQuantidade();
configurarBotoesRemover();