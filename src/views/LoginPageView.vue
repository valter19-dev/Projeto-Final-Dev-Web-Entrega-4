<template>
  <div class="pagina-login">
    <main>
      <div class="container-login">
        <div class="caixa-formulario">
          <h2>Acesse sua conta</h2>

          <form @submit.prevent="fazerLogin">
            <!-- Campo de Email -->
            <div class="grupo-formulario">
              <label for="campo-email">Email:</label>
              <div class="campo-com-icone">
                <i class="bi bi-envelope icone-input"></i>
                <input
                  id="campo-email"
                  v-model="email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <!-- Campo de Senha -->
            <div class="grupo-formulario">
              <label for="campo-senha">Senha:</label>
              <div class="campo-com-icone">
                <i class="bi bi-lock icone-input"></i>
                <input
                  id="campo-senha"
                  v-model="senha"
                  :type="mostrarSenha ? 'text' : 'password'"
                  placeholder="Digite sua senha"
                />
                <i
                  class="bi icone-olho"
                  :class="mostrarSenha ? 'bi-eye-slash' : 'bi-eye'"
                  @click="alternarSenha"
                  title="Mostrar ou ocultar senha"
                ></i>
              </div>
            </div>

            <button type="submit" class="botao-entrar">Entrar</button>

            <p class="texto-login">
              Não tem conta?
              <router-link to="/register">Criar conta</router-link>
            </p>
          </form>
        </div>
      </div>
    </main>
    <Notification />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Notification from "../components/Notification.vue";
import { useUserStore } from "../stores/userStore";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const userStore = useUserStore();
const notificationStore = useNotificationStore();

const email = ref("");
const senha = ref("");
const erroEmail = ref("");
const erroSenha = ref("");
const mostrarSenha = ref(false);

const alternarSenha = () => {
  mostrarSenha.value = !mostrarSenha.value;
};

const fazerLogin = () => {
  // limpa mensagens de erro antigas
  erroEmail.value = "";
  erroSenha.value = "";

  // ✅ Verifica se todos os campos estão preenchidos
  if (!email.value || !senha.value) {
    notificationStore.addNotification(
      "Por favor, preencha todos os campos antes de continuar.",
      "erro"
    );
    return;
  }

  // ✅ Verifica tamanho mínimo da senha
  if (senha.value.length < 6) {
    erroSenha.value = "A senha deve ter pelo menos 6 caracteres.";
    notificationStore.addNotification(
      "A senha deve ter pelo menos 6 caracteres.",
      "erro"
    );
    return;
  }

  try {
    userStore.login(email.value, senha.value);
    notificationStore.addNotification(
      "Login realizado com sucesso!",
      "sucesso"
    );
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  } catch (erro) {
    notificationStore.addNotification(
      erro instanceof Error ? erro.message : "Erro ao fazer login",
      "erro"
    );
  }
};
</script>

<style scoped>
/* === Estrutura principal === */
.pagina-login {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--cor-sidebar), var(--color-bg));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.conteudo-principal {
  width: 100%;
}

.container-login {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.caixa-formulario {
  background: linear-gradient(360deg, var(--cor-sidebar), var(--color-bg));
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--sombra-form);
  border: 1px solid var(--cor-borda);
}

.caixa-formulario h2 {
  color: var(--texto-principal);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
}

/* === Campos de formulário === */
.grupo-formulario {
  margin-bottom: 1.2rem;
}

.grupo-formulario label {
  display: block;
  color: var(--texto-label);
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}

/* === Campo com ícones === */
.campo-com-icone {
  display: flex;
  align-items: baseline;
  border: 1px solid var(--cor-input-borda);
  border-radius: 8px;
  background-color: var(--cor-input);
  padding: 0 0.75rem; /* ajuste para alinhar o conteúdo */
  transition: all 0.3s ease;
  gap: 1.5rem; /* espaço entre ícone e texto */
  height: 50px; /* altura uniforme dos campos */
}

.campo-com-icone:focus-within {
  border-color: var(--cor-primaria);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

/* Ícones */
.icone-input {
  color: var(--texto-placeholder);
  font-size: 1.2rem;
  flex-shrink: 0; /* impede o ícone de encolher */
}

.icone-olho {
  color: var(--texto-placeholder);
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.icone-olho:hover {
  color: var(--cor-primaria);
}

/* Input */
.campo-com-icone input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--texto-principal);
  padding: 0; /* remove padding interno extra */
  height: 100%;
  line-height: 1.4rem;
}

.campo-com-icone input::placeholder {
  color: var(--texto-placeholder);
}

/* === Botão === */
.botao-entrar {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--cor-primaria);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}

.botao-entrar:hover {
  background-color: var(--cor-primaria-hover);
}

/* === Texto abaixo === */
.texto-login {
  text-align: center;
  margin-top: 1rem;
  color: var(--texto-principal);
  font-size: 0.9rem;
}

.texto-login a {
  color: var(--cor-primaria);
  font-weight: 600;
  text-decoration: none;
}

.texto-login a:hover {
  text-decoration: underline;
}

/* === Responsividade === */
@media (max-width: 480px) {
  .caixa-formulario {
    padding: 1.2rem;
    border-radius: 10px;
  }

  .caixa-formulario h2 {
    font-size: 1.3rem;
  }

  input,
  button {
    font-size: 0.9rem;
  }

  .texto-login {
    font-size: 0.85rem;
  }
}

/* Corrige cor azul clara de autofill no modo dark */
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:hover {
  -webkit-box-shadow: 0 0 0px 1000px var(--cor-fundo-input) inset !important;
  -webkit-text-fill-color: var(--cor-texto-input) !important;
  transition: background-color 9999s ease-in-out 0s;
}

/* === Remove o fundo azul padrão no foco === */
input:focus {
  background-color: var(--cor-fundo-input);
  color: var(--cor-texto-input);
  outline: none;
}
</style>
