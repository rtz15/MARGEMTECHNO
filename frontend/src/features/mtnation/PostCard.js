import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/PostCard.css';

// CSRF token helpers
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

async function getCSRFToken() {
  try {
    await axiosInstance.get('/users/csrf/', { withCredentials: true });
  } catch (err) {
    console.error('Erro ao obter CSRF:', err);
  }
}

function PostCard({ post, currentUser, onDelete }) {
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

  const isOwnerOrAdmin =
    post?.autor === currentUser?.username || currentUser?.is_admin;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [likesRes, comentariosRes] = await Promise.all([
          axiosInstance.get('/likes/user/'),
          axiosInstance.get('/comentarios/')
        ]);

        setIsLiked(likesRes.data.includes(post.id));
        const comentariosDoPost = comentariosRes.data.filter(c => c.post === post.id);
        setComentarios(comentariosDoPost);
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err);
      }
    };

    fetchInitialData();
  }, [post.id]);

  const handleLikeToggle = async () => {
    try {
      await getCSRFToken();
      const res = await axiosInstance.post(
        `/likes/toggle/${post.id}/`,
        {},
        {
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
          withCredentials: true,
        }
      );

      if (res.data.liked !== undefined) {
        setIsLiked(res.data.liked);
        setLikesCount(prev => res.data.liked ? prev + 1 : Math.max(prev - 1, 0));
      }
    } catch (err) {
      alert('You need to sign in to like.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    try {
      await getCSRFToken();
      const res = await axiosInstance.post(
        '/comentarios/',
        {
          conteudo: novoComentario,
          post: post.id,
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
        }
      );

      setComentarios(prev => [...prev, res.data]);
      setNovoComentario('');
    } catch (err) {
      alert('Erro ao adicionar comentário.');
      console.error(err.response?.data || err);
    }
  };

  if (!post) return null;

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-author">{post.autor}</span>
        <span className="post-date">
          {new Date(post.criado_em).toLocaleString('pt-PT')}
        </span>
      </div>

      {post.imagem && (
        <img
          src={`http://localhost:8000${post.imagem}`}
          alt="Imagem do post"
          className="post-image"
        />
      )}

      {post.video && (
        <video controls className="post-image">
          <source src={`http://localhost:8000${post.video}`} type="video/mp4" />
          O teu browser não suporta vídeo.
        </video>
      )}

      <p className="post-content">{post.conteudo}</p>

      <div className="post-footer">
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
        >
          ❤️ {likesCount}
        </button>

        {isOwnerOrAdmin && (
          <button className="delete-btn" onClick={() => onDelete(post.id)}>
            Delete
          </button>
        )}
      </div>

      <div className="comentarios">
        <h4 style={{ textAlign: 'left' }}>Comentários</h4>
        {comentarios.map(com => (
          <div key={com.id} className="comentario">
            <strong>{com.autor}</strong>: {com.conteudo}
          </div>
        ))}

        {currentUser && (
          <form onSubmit={handleCommentSubmit} className="comentario-form">
            <input
              type="text"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Escreve um comentário..."
              required
            />
            <button type="submit">Comentar</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostCard;
