
function atualizarQuery(chave, valor) {
  const params = new URLSearchParams(window.location.search);
  params.set(chave, valor);
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}


function pesquisar() {
  const campo = document.getElementById("campoBusca");
  if (!campo) return;

  const termo = campo.value.trim();
  if (!termo) {
    alert("Digite algo para buscar");
    return;
  }

  atualizarQuery("busca", termo);


  const url = `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(termo)}`;
  console.log("HTTP GET enviado para:", url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Dados GET recebidos:", data);
      const resultado = document.getElementById("resultado");
      if (resultado) {
        resultado.innerHTML = data.length > 0
          ? data.map(item => `<p>${item.title}</p>`).join("")
          : "<p>Nenhum resultado encontrado.</p>";
      }
    })
    .catch(err => console.error("Erro:", err));
}


function enviarPUT() {
  const usuario = {
    notificacoesEmail: document.getElementById("notificacoesEmail")?.checked,
    notificacoesApp: document.getElementById("notificacoesApp")?.checked,
    tema: document.getElementById("tema")?.value
  };

  fetch("https://jsonplaceholder.typicode.com/posts/1", { // URL válida para PUT
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  })
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => console.log("PUT enviado:", data))
  .catch(err => console.error("Erro no PUT:", err));
}


document.getElementById("btnBuscar")?.addEventListener("click", pesquisar);
document.getElementById("btnSalvar")?.addEventListener("click", enviarPUT);


const termoQuery = new URLSearchParams(window.location.search).get("busca");
if (termoQuery) {
  const campo = document.getElementById("campoBusca");
  if (campo) campo.value = termoQuery;
  pesquisar(); 
}