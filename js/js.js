function buscarProduto() {
    const input = document.querySelector('.buscar');
    const termo = input.value.trim();

    if (!termo) return alert("Digite algo para buscar!");

    fetch('http://localhost:8080/produtos')
        .then(res => res.json())
        .then(produtos => {
            const ul = document.getElementById('listaProdutos');
            ul.innerHTML = '';

            const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo.toLowerCase()));

            if (filtrados.length === 0) {
                ul.innerHTML = '<li>Nenhum produto encontrado</li>';
            } else {
                filtrados.forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = `${p.nome} - R$ ${p.preco}`;
                    ul.appendChild(li);
                });
            }
        });
}