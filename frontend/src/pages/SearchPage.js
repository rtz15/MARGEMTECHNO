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
        const res = await axios.get(`http://localhost:8000/api/eventos/?q=${query}`);
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
          placeholder="Pesquisar eventos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <div className="search-results">
        {resultados.map(ev => (
          <a
            href={ev.link}
            target="_blank"
            rel="noopener noreferrer"
            className="search-card"
            key={ev.id}
          >
            {ev.imagem && (
              <img
                src={`http://localhost:8000${ev.imagem}`}
                alt={ev.titulo}
              />
            )}
            <div className="search-info">
              <h3>{ev.titulo}</h3>
              <p className="event-date">{new Date(ev.data).toLocaleDateString('pt-PT')}</p>
              {ev.localizacao && <p className="event-local">{ev.localizacao}</p>}
              {ev.descricao && <p className="event-descricao">{ev.descricao}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;