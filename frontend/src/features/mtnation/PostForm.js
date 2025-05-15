import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/PostForm.css';

// Função auxiliar para obter o token CSRF dos cookies
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

// Faz um pedido GET para garantir que o cookie csrftoken é definido
const getCSRFToken = async () => {
  await axiosInstance.get('/users/csrf/', { withCredentials: true });
};

function PostForm({ onPostCreated }) {
  const [conteudo, setConteudo] = useState('');
  const [ficheiro, setFicheiro] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tipoFicheiro, setTipoFicheiro] = useState(null); // 'imagem' ou 'video'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('conteudo', conteudo);
    if (ficheiro && tipoFicheiro) {
      formData.append(tipoFicheiro, ficheiro); // 'imagem' ou 'video'
    }

    try {
      await getCSRFToken();

      const res = await axiosInstance.post('/posts/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      onPostCreated(res.data);
      setConteudo('');
      setFicheiro(null);
      setPreview(null);
      setTipoFicheiro(null);
    } catch (err) {
      alert('Error creating post.');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Only videos or images are allowed.');
      return;
    }

    setFicheiro(file);
    setPreview(URL.createObjectURL(file));
    setTipoFicheiro(isImage ? 'imagem' : 'video');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write something..."
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        required
      />

      <div className="post-actions">
        <label htmlFor="ficheiro" className="custom-file-button">
          Select file
        </label>
        <input
          id="ficheiro"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button type="submit" className="publish-button">Publish</button>
      </div>

      {ficheiro && (
        <span className="file-name">{ficheiro.name}</span>
      )}

      {preview && tipoFicheiro === 'imagem' && (
        <img src={preview} alt="Preview" className="post-image" />
      )}

      {preview && tipoFicheiro === 'video' && (
        <video controls className="post-image">
          <source src={preview} type="video/mp4" />
          Your browser doesn't support video.
        </video>
      )}
    </form>
  );
}

export default PostForm;
