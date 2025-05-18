import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/SearchPage.css';

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
        const res = await axios.get(`http://localhost:8000/api/search/?q=${query}`);
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
          placeholder="Search events, products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="search-icon"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </div>

      <div className="search-results">
        {resultados.map(item => (
          <Link
            to={item.link || '/shop'} // 👈 usa "to" em vez de "href"
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
              {item.data && <p className="event-date">{new Date(item.data).toLocaleDateString('pt-PT')}</p>}
              {item.localizacao && <p className="event-local">{item.localizacao}</p>}
              {item.descricao && <p className="event-descricao">{item.descricao}</p>}
              {item.tipo === 'produto' && <p className="event-date">Produto</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
