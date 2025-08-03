async function carregarProdutos() {
  try {
    const resposta = await fetch('products.json');
    const data = await resposta.json();
    const produtos = data.products;

    const container = document.getElementById('produtos');
    container.innerHTML = '';

    produtos.slice(0, 5).forEach(produto => {
      const card = document.createElement('div');
      card.classList.add('card-produto');

     card.innerHTML = `
  <div class="imagem-produto">
    <img src="camisa.jpg" alt="${produto.name}">

    <a href="excluirProduto.html?id=${produto.id}">
      <img src="FrameLixeira.png" alt="Excluir" class="lixeira" />
    </a>

    <a href="editarProduto.html?id=${produto.id}">
      <img src="FrameLapis.png" alt="Editar" class="btnEditar" />
    </a>
  </div>

  <div class="info-produto">
    <h3>${produto.name}</h3>
    <p>${produto.description || 'Sem descrição'}</p>
    <p class="preco">R$ ${Number(produto.price).toFixed(2)}</p>
  </div>
`;




      container.appendChild(card);
    });

  } catch (erro) {
    console.error('Erro ao carregar os produtos:', erro);
  }
}

carregarProdutos();
