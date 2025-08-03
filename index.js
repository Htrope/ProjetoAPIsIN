let produtos = [];
let produtosPorPagina = 5;
let paginaAtual = 1;

async function carregarProdutos() {
  try {
    const resposta = await fetch('products.json');
    const data = await resposta.json();
    produtos = data.products;
    criarPaginacao();
    exibirProdutos(paginaAtual);
  } catch (erro) {
    console.error('Erro ao carregar os produtos:', erro);
  }
}

function exibirProdutos(pagina) {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  const inicio = (pagina - 1) * produtosPorPagina;
  const fim = inicio + produtosPorPagina;
  const paginaProdutos = produtos.slice(inicio, fim);

  paginaProdutos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('card-produto');
    card.innerHTML = `
      <div class="imagem-produto">
        <span class="nota-produto">${produto.rating || '5.0'} </span>
        <img src="Star 1.png" alt="" class="star">  
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
}

function criarPaginacao() {
  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);
  const paginacaoContainer = document.getElementById('paginacao-container');
  paginacaoContainer.innerHTML = '';

  const paginacao = document.createElement('div');
  paginacao.id = 'paginacao';
  paginacao.style.display = 'flex';
  paginacao.style.justifyContent = 'center';
  paginacao.style.gap = '10px';
  paginacao.style.margin = '30px 0';

  const anterior = document.createElement('button');
  anterior.innerText = '<';
  anterior.onclick = () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      exibirProdutos(paginaAtual);
      atualizarEstiloBotoes();
    }
  };
  paginacao.appendChild(anterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.innerText = i;
    botao.classList.add('btn-pagina');
    if (i === paginaAtual) botao.classList.add('ativa');
    botao.onclick = () => {
      paginaAtual = i;
      exibirProdutos(paginaAtual);
      atualizarEstiloBotoes();
    };
    paginacao.appendChild(botao);
  }

  const proximo = document.createElement('button');
  proximo.innerText = '>';
  proximo.onclick = () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      exibirProdutos(paginaAtual);
      atualizarEstiloBotoes();
    }
  };
  paginacao.appendChild(proximo);

  paginacaoContainer.appendChild(paginacao);
}

function atualizarEstiloBotoes() {
  document.querySelectorAll('.btn-pagina').forEach((btn, index) => {
    btn.classList.toggle('ativa', index + 1 === paginaAtual);
  });
}

carregarProdutos();
