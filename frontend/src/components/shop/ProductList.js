import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../styles/ProductList.css';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext'; // ← IMPORTANTE
import CartSidebar from './CartSidebar';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // ← IMPORTANTE
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/produtos/')
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  const handleAdd = (produto) => {
    const existe = cartItems.find((item) => item.id === produto.id);
    if (!existe) {
      addToCart(produto);
      setMostrarCarrinho(true);
    }
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">SHOP</h2>
      <div className="product-grid">
        {produtos.map((prod) => (
          <div key={prod.id} className="product-card">
            <img
              src={`http://localhost:8000${prod.imagem}`}
              alt={prod.nome}
              className="product-image"
            />
            <div className="product-info">
              <h3>{prod.nome}</h3>
              <p className="proddesc">{prod.descricao}</p>
              <p className="price">{prod.preco} €</p>
            </div>
            <button
              onClick={() => user ? handleAdd(prod) : alert('Tens de fazer login para comprar!')}
              className="botao-comprar"
              disabled={!user || cartItems.some((item) => item.id === prod.id)}
            >
              {!user
                ? 'Login to Buy'
                : cartItems.some((item) => item.id === prod.id)
                ? 'Added ✓'
                : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {!mostrarCarrinho && user && (
        <button
          className="botao-popup-carrinho"
          onClick={() => setMostrarCarrinho(true)}
        >
          🛒
        </button>
      )}
      <CartSidebar
        isOpen={mostrarCarrinho}
        onClose={() => setMostrarCarrinho(false)}
      />
    </div>
  );
}

export default ProductList;
