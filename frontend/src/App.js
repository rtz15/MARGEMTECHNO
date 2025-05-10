import React, { useEffect, useState } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/produtos/")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} — €{produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
