import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const currentUser = ref(null);

  // Carregar usuários do localStorage
  const loadUsers = () => {
    const saved = localStorage.getItem("usuarios");
    if (saved) {
      users.value = JSON.parse(saved);
    }
  };

  // Carregar usuário logado
  const loadCurrentUser = () => {
    const saved = localStorage.getItem("nome_usuario_logado");
    if (saved) {
      const user = users.value.find((u) => u.nome === saved);
      if (user) {
        currentUser.value = user;
      }
    }
  };

  // Salvar usuários no localStorage
  const saveUsers = () => {
    localStorage.setItem("usuarios", JSON.stringify(users.value));
  };

  // Registrar novo usuário
  const register = (nome, email, senha) => {
    if (users.value.some((u) => u.email === email)) {
      throw new Error("Email já cadastrado");
    }

    const newUser = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
    };

    users.value.push(newUser);
    saveUsers();
    return newUser;
  };

  // Login
  const login = (email, senha) => {
    const user = users.value.find(
      (u) => u.email === email && u.senha === senha
    );
    if (!user) {
      throw new Error("Email ou senha inválidos");
    }
    currentUser.value = user;
    localStorage.setItem("nome_usuario_logado", user.nome);
    return user;
  };

  // Logout
  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem("nome_usuario_logado");
  };

  // Verificar se está logado
  const isLoggedIn = computed(() => currentUser.value !== null);

  // Obter nome do usuário logado
  const getCurrentUserName = computed(
    () => currentUser.value?.nome || "Usuário"
  );

  // Inicialização
  loadUsers();
  loadCurrentUser();

  return {
    users,
    currentUser,
    loadUsers,
    loadCurrentUser,
    saveUsers,
    register,
    login,
    logout,
    isLoggedIn,
    getCurrentUserName,
  };
});
