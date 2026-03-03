function enviarPUT() {
  const usuario = {
    notificacoesEmail: document.getElementById("notificacoesEmail")?.checked,
    notificacoesApp: document.getElementById("notificacoesApp")?.checked,
    tema: document.getElementById("tema")?.value
  };

  
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",        
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => console.log("PUT enviado:", data))
  .catch(err => console.error("Erro no PUT:", err));
}

document.getElementById("btnSalvar")?.addEventListener("click", enviarPUT);