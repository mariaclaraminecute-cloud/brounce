// Função de pesquisa
function pesquisar() {
  const campo = document.getElementById("campoBusca");
  if (!campo) return;

  const termo = campo.value.trim();
  if (!termo) {
    alert("Digite algo para buscar");
    return;
  }

  // Atualiza URL com ?busca=termo
  const newUrl = `${window.location.pathname}?busca=${encodeURIComponent(termo)}`;
  window.history.replaceState(null, "", newUrl);

  // Envia GET
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

// Preenche input e pesquisa se já houver query na URL
const params = new URLSearchParams(window.location.search);
const termoQuery = params.get("busca");
if (termoQuery) {
  const campo = document.getElementById("campoBusca");
  if (campo) campo.value = termoQuery;
  pesquisar();
}