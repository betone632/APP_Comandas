import { API_ENDPOINTS } from '../config/apiConfig';
import api from './api';

const { AUTH } = API_ENDPOINTS; // Extrair apenas endpoints utilizados no service

export const authService = {

// Serviços de autenticação

// Login de usuário na API - obter Token de Acesso
// Requisição não protegida, não precisa de token de acesso

login: async (cpf, senha) => {

try {

console.log("=== LOGIN INICIADO ===");
console.log("CPF original:", cpf);
console.log("Senha:", senha);
console.log("Endpoint:", AUTH.LOGIN);

const cpfLimpo = cpf.replace(/\D/g, '');

console.log("CPF limpo:", cpfLimpo);

// executa a requisição de login na API
const response = await api.post(AUTH.LOGIN, {
cpf: cpfLimpo,
senha: senha,
});

console.log("=== RESPONSE LOGIN ===");
console.log(response);

console.log("=== RESPONSE DATA ===");
console.log(response.data);

// Extrai os dados da resposta
const {
access_token,
refresh_token,
token_type,
expires_in,
refresh_expires_in
} = response.data;

console.log("=== TOKENS EXTRAÍDOS ===");
console.log("access_token:", access_token);
console.log("refresh_token:", refresh_token);
console.log("token_type:", token_type);
console.log("expires_in:", expires_in);
console.log("refresh_expires_in:", refresh_expires_in);

// Persistir dados na sessionStorage
sessionStorage.setItem('access_token', access_token);
sessionStorage.setItem('refresh_token', refresh_token);
sessionStorage.setItem('token_type', token_type);
sessionStorage.setItem('expires_in', expires_in);
sessionStorage.setItem('refresh_expires_in', refresh_expires_in);
sessionStorage.setItem('loginRealizado', 'true');

// Calcular tempo de expiração
const now = new Date().getTime();

const expiresAt = now + (expires_in * 1000);
const refreshExpiresAt = now + (refresh_expires_in * 1000);

// cria variáveis de expiração
sessionStorage.setItem('expires_at', expiresAt);
sessionStorage.setItem('refresh_expires_at', refreshExpiresAt);

console.log("=== LOGIN SUCCESS ===");

return {
success: true,
data: response.data,
};

} catch (error) {

console.error("=== ERRO LOGIN ===");
console.error(error);

console.error("=== ERROR RESPONSE ===");
console.error(error.response);

console.error("=== STATUS ===");
console.error(error.response?.status);

console.error("=== DATA ===");
console.error(error.response?.data);

console.error("=== MESSAGE ===");
console.error(error.message);

console.error("=== API MESSAGE ===");
console.error(error.apiMessage);

return {
success: false,
error:
error.response?.data?.detail ||
error.response?.data?.message ||
error.apiMessage ||
error.message ||
'Erro ao realizar login',
};
}
},

// Obtém dados do usuário logado
// Requisição protegida com token de acesso
// Antes de executar, o interceptor de request vai interceptar a requisição e adicionar o token ao cabeçalho da requisição
// Interceptor implementado em api.js

getUserData: async () => {

try {

// executa a requisição de obter dados do usuário na API
const response = await api.get(AUTH.ME);

console.log("=== USER DATA ===");
console.log(response.data);

return response.data;

} catch (error) {

console.error("Erro ao obter usuário:", error);

return null;
}
},

// Logout do usuário
logout: () => {

// Limpar dados da sessão
sessionStorage.clear();

// Redirecionar para a página de login
window.location.href = '/login';
},

// Verificar se usuário está autenticado
isAuthenticated: () => {

const token = sessionStorage.getItem('access_token');
const expiresAt = sessionStorage.getItem('expires_at');

console.log("=== CHECK AUTH ===");
console.log("token:", token);
console.log("expiresAt:", expiresAt);

if (!token || !expiresAt) {
return false;
}

// Verificar se token não expirou
const now = new Date().getTime();

return now < parseInt(expiresAt);
},

// Verificar se token está próximo de expirar (5 minutos)
isTokenExpiringSoon: () => {

const expiresAt = sessionStorage.getItem('expires_at');

if (!expiresAt) return true;

const now = new Date().getTime();

const fiveMinutes = 5 * 60 * 1000; // 5 minutos em ms

return now > (parseInt(expiresAt) - fiveMinutes);
},
};

export default api;