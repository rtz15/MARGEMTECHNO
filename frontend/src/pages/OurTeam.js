import { useState } from 'react';

import '../styles/OurTeam.css';

const team = [
  {
    nome: "Martinho Basso",
    funcao: "FOUNDER",
    imagem: "./team/Marte.jpg",
    backInfo: (
      <>
        <p><a href="https://instagram.com/martinho_basso" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Hernâni Mourão",
    funcao: "FOUNDER & DJ (Hernas)",
    imagem: "./team/Hernas.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/hernas1" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/hernas._" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Matilde Gine",
    funcao: "COFOUNDER, DESIGN TEAM",
    imagem: "./team/Gine.jpg",
    backInfo: (
      <>
        <p><a href="https://instagram.com/matilde_ginsantos" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Lourenço Magalhães",
    funcao: "COFOUNDER",
    imagem: "./team/lori.jpg",
    backInfo: (
      <>
        <p><a href="https://instagram.com/lourencomagalhaes_" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Gabriel Ribeiro",
    funcao: "COFOUNDER & DESIGN TEAM",
    imagem: "./team/gabriel.jpg",
    backInfo: (
      <>
        <p><a href="https://instagram.com/gabrielp.ribeiro" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Gonçalo Taia",
    funcao: "COFOUNDER & DJ (Dewon)",
    imagem: "./team/GonçaloTaia.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/user-274639386" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/dewon._" target="_blank" rel="noreferrer">Instagram</a></p>
        <p><a href="https://linktr.ee/Querias" target="_blank" rel="noreferrer">Linktree</a></p>
      </>
    ),
  },
  {
    nome: "Henrique Reynaud",
    funcao: "COFOUNDER & DJ (Jobels)",
    imagem: "./team/henrique.jpg",
    backInfo: (
      <>
        <p><a href="https://soundcloud.com/henrique-sm-reynaud" target="_blank" rel="noreferrer">SoundCloud</a></p>
        <p><a href="https://instagram.com/henrique.reynaud" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
  },
  {
    nome: "Tiago Pereira",
    funcao: "IT & DESIGN TEAM",
    imagem: "./team/tiago.jpeg",
    backInfo: (
      <>
        <p><a href="https://instagram.com/tiaago15" target="_blank" rel="noreferrer">Instagram</a></p>
      </>
    ),
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
