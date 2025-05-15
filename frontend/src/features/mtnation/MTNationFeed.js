import { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import PostCard from './PostCard';
import PostForm from './PostForm';
import '../../styles/MTNationFeed.css';
import { AuthContext } from '../../context/AuthContext';

function MTNationFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get('/posts/');
        setPosts(res.data.filter(p => p));
      } catch (error) {
        console.error('Erro ao carregar feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="no-posts">A carregar...</p>;

  return (
    <div className="mtnation-feed">
      <h2>MTNATION - COMMUNITY FEED </h2>
      <PostForm onPostCreated={(novoPost) => setPosts(prev => [novoPost, ...prev])} />
      {posts.length === 0 ? (
        <p className="no-posts">Ainda não há posts!</p>
      ) : (
        posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={user}
            onDelete={(id) => setPosts(prev => prev.filter(p => p.id !== id))}
          />
        ))
      )}
    </div>
  );
}

export default MTNationFeed;
