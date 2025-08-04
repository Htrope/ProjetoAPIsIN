document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("ID do produto não encontrado.");
    return;
  }

  const nome = document.getElementById("nome");
  const preco = document.getElementById("preco");
  const image = document.getElementById("image");
  const categorias = document.getElementById("categorias");
  const descricao = document.getElementById("descricao");
  const avaliacao = document.getElementById("avaliacao");

  try {
    const resposta = await fetch(`http://localhost:3000/products/${id}`);
    const produto = await resposta.json();

    nome.value = produto.name;
    preco.value = produto.price;
    image.value = produto.image;
    categorias.value = produto.category;
    descricao.value = produto.description;
    avaliacao.value = produto.rating;
  } catch (erro) {
    console.error("Erro ao carregar o produto:", erro);
    alert("Erro ao carregar o produto.");
  }

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      name: nome.value,
      price: parseFloat(preco.value),
      image: image.value,
      category: categorias.value,
      description: descricao.value,
      rating: parseFloat(avaliacao.value),
      inStock: true // ou false, se quiser permitir editar isso também
    };

    try {
      const resposta = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      });

      if (resposta.ok) {
        alert("Produto atualizado com sucesso!");
        window.location.href = "index.html"; // ou lista de produtos
      } else {
        throw new Error("Erro na atualização");
      }
    } catch (erro) {
      console.error("Erro ao atualizar o produto:", erro);
      alert("Erro ao atualizar o produto.");
    }
  });
});
