import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartSidebar.css';

function CartSidebar({ isOpen, onClose }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cartItems
    .reduce((sum, item) => sum + item.preco * item.quantidade, 0)
    .toFixed(2);

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3 className="cart-title">Cart</h3>
        <button onClick={onClose} className="fechar-carrinho">X</button>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Empty Cart</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="item-carrinho">
                <div className="carrinho-topo">
                  <img
                    src={`http://localhost:8000${item.imagem}`}
                    alt={item.nome}
                    className="imagem-miniatura"
                  />
                  <span className="item-nome">{item.nome}</span>
                </div>

                <div className="quantidade-controle">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <span className="item-preco">{item.preco} €</span>
                <span className="item-subtotal">
                  Subtotal: {(item.preco * item.quantidade).toFixed(2)} €
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="cart-footer">
        <a href="/shop/checkout" className="botao-finalizar">
          Finish Purchase
        </a>
        <div className="cart-total">
          Total: {total} €
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
