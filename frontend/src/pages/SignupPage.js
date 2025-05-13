import { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPage.css';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResultados([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/search/?q=${query}`);
        setResultados(res.data);
      } catch (err) {
        console.error('Erro na pesquisa:', err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-page">
      <h2>What are you looking for?</h2>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Pesquisar eventos e produtos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <div className="search-results">
        {resultados.map(item => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="search-card"
            key={`${item.tipo}-${item.id}`}
          >
            {item.imagem && (
              <img
                src={`http://localhost:8000${item.imagem}`}
                alt={item.titulo}
              />
            )}
            <div className="search-info">
              <h3>{item.titulo}</h3>
              <p className="item-descricao">{item.descricao}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
