//Roberto Antunes Souza
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

// Criação do contexto
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

// Verificar autenticação ao carregar o componente
useEffect(() => {
const checkAuth = async () => {
console.log("Verificando autenticação inicial...");

const autenticado = authService.isAuthenticated();

console.log("authService.isAuthenticated():", autenticado);

if (autenticado) {
setIsAuthenticated(true);

// Buscar dados do usuário logado
const userData = await authService.getUserData();

console.log("Usuário carregado no início:", userData);

if (userData) {
setUser(userData);
}
}

setLoading(false);
};

checkAuth();
}, []);

// Função para login com API real
const login = async (cpf, senha) => {
try {
setLoading(true);

console.log("Tentando login com CPF:", cpf);
console.log("Senha recebida:", senha);

// chama o service de autenticação para fazer o login
const result = await authService.login(cpf, senha);

console.log("Resultado do authService.login:", result);

if (result.success) {
console.log("Login retornou success true");

setIsAuthenticated(true);

// Buscar dados do usuário após login
const userData = await authService.getUserData();

console.log("Dados do usuário após login:", userData);

setUser(userData);

console.log("Navegando para /home");

navigate("/home");

return true;
} else {
console.log("Login retornou success false");
console.log("Erro retornado:", result.error);

// Emite evento para SnackbarGlobal
window.dispatchEvent(new CustomEvent('showSnackbar', {
detail: { message: result.error, severity: 'error' }
}));

return false;
}
} catch (error) {
console.error('Erro no login:', error);

if (error.response) {
console.error("Status HTTP:", error.response.status);
console.error("Dados do erro:", error.response.data);
console.error("Headers:", error.response.headers);
} else if (error.request) {
console.error("Request enviada, mas sem resposta:", error.request);
} else {
console.error("Erro ao configurar request:", error.message);
}

window.dispatchEvent(new CustomEvent('showSnackbar', {
detail: { message: 'Erro ao conectar com o servidor', severity: 'error' }
}));

return false;
} finally {
setLoading(false);
}
};

// Função para logout
const logout = () => {
authService.logout();
setIsAuthenticated(false);
setUser(null);
navigate("/");
};

// Objeto com os valores e funções do contexto
const value = {
isAuthenticated,
user,
loading,
login,
logout,
isTokenExpiringSoon: authService.isTokenExpiringSoon(),
};

return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);