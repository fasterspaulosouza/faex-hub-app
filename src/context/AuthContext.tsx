import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "@/services/api";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  foto?: string;
  telefone?: string;
  documento?: string;
  aniversario?: string;
  genero?: "MASCULINO" | "FEMININO";
};

export type CadastroPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  documento?: string;
  aniversario?: string; // ISO: YYYY-MM-DD
  genero?: "MASCULINO" | "FEMININO";
};

type AuthContextData = {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (dados: CadastroPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const TOKEN_KEY = "faex_token";
const USUARIO_KEY = "faex_usuario";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredAuth() {
      const [storedToken, storedUsuario] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USUARIO_KEY),
      ]);

      if (storedToken && storedUsuario) {
        setToken(storedToken);
        setUsuario(JSON.parse(storedUsuario));
        setAuthToken(storedToken);

        // Atualiza dados completos do usuário em background
        try {
          const { data } = await api.get("/auth/me");
          const usuarioAtualizado = data.usuario ?? data;
          setUsuario(usuarioAtualizado);
          await SecureStore.setItemAsync(
            USUARIO_KEY,
            JSON.stringify(usuarioAtualizado),
          );
        } catch {
          // Mantém os dados em cache se a requisição falhar
        }
      }

      setLoading(false);
    }

    loadStoredAuth();
  }, []);

  async function login(email: string, senha: string) {
    const { data } = await api.post("/auth/login", { email, senha });
    const { accessToken } = data;

    setAuthToken(accessToken);

    const { data: meData } = await api.get("/auth/me");
    const usuarioData = meData.usuario ?? meData;

    setToken(accessToken);
    setUsuario(usuarioData);

    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, accessToken),
      SecureStore.setItemAsync(USUARIO_KEY, JSON.stringify(usuarioData)),
    ]);
  }

  async function cadastrar(dados: CadastroPayload) {
    const { data } = await api.post("/auth/cadastro", dados);
    const { accessToken } = data;

    setAuthToken(accessToken);
    const { data: meData } = await api.get("/auth/me");
    const usuarioData = meData.usuario;

    setToken(accessToken);
    setUsuario(usuarioData);

    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, accessToken),
      SecureStore.setItemAsync(USUARIO_KEY, JSON.stringify(usuarioData)),
    ]);
  }

  async function logout() {
    setToken(null);
    setUsuario(null);
    setAuthToken(null);

    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USUARIO_KEY),
    ]);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, token, loading, login, cadastrar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
