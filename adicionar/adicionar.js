document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("nome").value.trim();
  const precoValor = document.getElementById("preco").value;
  const ratingValor = document.getElementById("avaliacao").value;
  const price = parseFloat(precoValor);
  const rating = parseFloat(ratingValor);
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("categorias").value.trim();
  const description = document.getElementById("descricao").value.trim();

  // Validações
  if (name === "" || image === "" || category === "" || description === "") {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (isNaN(price) || price < 0) {
    alert("Preço inválido. Digite um número maior ou igual a 0.");
    return;
  }

  if (isNaN(rating) || rating < 0 || rating > 5) {
    alert("Nota inválida. Digite uma nota entre 0 e 5.");
    return;
  }

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
