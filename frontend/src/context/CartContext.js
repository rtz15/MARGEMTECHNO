import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (produto) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
  setCartItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === productId
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0) // remove se quantidade for 0
  );
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
