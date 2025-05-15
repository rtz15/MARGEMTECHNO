import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/EventList.css';

function EventList() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/eventos/')
      .then((res) => setEventos(res.data))
      .catch((err) => console.error("Erro ao carregar eventos:", err));
  }, []);

  return (
    <div className="event-list-wrapper">
      <h2 className="event-list-title">UPCOMING EVENTS</h2>
      <div className="event-grid">
        {eventos.map((evento) => (
          <a
            key={evento.id}
            href={evento.link}
            target="_blank"
            rel="noopener noreferrer"
            className="event-card"
          >
            {evento.imagem && (
              <img
                src={`http://localhost:8000${evento.imagem}`}
                alt={evento.titulo}
                className="event-image"
              />
            )}
            <div className="event-info">
              <h3>{evento.titulo}</h3>
              {evento.data && (
                <p className="event-date">
                  {new Date(evento.data).toLocaleDateString('pt-PT')}
                </p>
              )}
              {evento.descricao && (
                <p className="event-location">{evento.descricao}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default EventList;