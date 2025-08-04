document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("nome").value.trim();
  const price = parseFloat(document.getElementById("preco").value);
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("categorias").value.trim();
  const description = document.getElementById("descricao").value.trim();
  const rating = parseFloat(document.getElementById("avaliacao").value);

  
  const novoProduto = {
    name,
    price,
    image,
    category,
    description,
    inStock: true, 
    rating
  };

  try {
    const resposta = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoProduto)
    });

    if (resposta.ok) {
      alert("Produto adicionado com sucesso!");
      window.location.href = "index.html"; 
    } else {

      throw new Error("Erro ao adicionar o produto.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao salvar o produto.");
  }
});
