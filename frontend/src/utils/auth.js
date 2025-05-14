// frontend/src/utils/auth.js

// Nome da chave usada no localStorage
const TOKEN_KEY = 'authToken';

// Guardar token após login
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Ler token (para usar nos headers)
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remover token (logout)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Verifica se o utilizador está autenticado
export const isAuthenticated = () => {
  return !!getToken();
};
