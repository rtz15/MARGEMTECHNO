import { useState } from 'react';

import '../styles/OurTeam.css';

const team = [
  {
    nome: "Martinho Basso",
    funcao: "FOUNDER",
    imagem: "./team/Marte.jpg",
  },
  {
    nome: "Hernâni Mourão",
    funcao: "FOUNDER & DJ (Hernas)",
    imagem: "./team/Hernas.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/hernasdj" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/hernas.dj" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Matilde Gine",
    funcao: "COFOUNDER, DESIGN TEAM",
    imagem: "/team/Gine.jpg",
  },
  {
    nome: "Lourenço Magalhães",
    funcao: "COFOUNDER",
    imagem: "/team/lourenco.jpg",
  },
  {
    nome: "Gabriel Ribeiro",
    funcao: "COFOUNDER & DESIGN TEAM",
    imagem: "/images/gabriel.jpg",
  },
  {
    nome: "Gonçalo Taia",
    funcao: "COFOUNDER & DJ (Dewon)",
    imagem: "/images/goncalo.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/dewon" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/dewon.dj" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Henrique Reynaud",
    funcao: "COFOUNDER & DJ (Jobels)",
    imagem: "/images/henrique.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/jobels" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/jobels.dj" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Tiago Pereira",
    funcao: "IT & DESIGN TEAM",
    imagem: "/team/tiago.jpg",
  },
];

export default function OurTeam() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="event-list-wrapper">
      <h2 className="event-list-title">OUR TEAM</h2>
      <div className="team-grid">
        {team.map((pessoa, index) => (
          <div
            key={index}
            className={`team-card ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={pessoa.imagem} alt={pessoa.nome} className="card-image" />
                <div className="card-info">
                  <h3>{pessoa.nome}</h3>
                  <p>{pessoa.funcao}</p>
                </div>
              </div>
              <div className="card-back">
                {pessoa.backInfo || <p>No additional info.</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
