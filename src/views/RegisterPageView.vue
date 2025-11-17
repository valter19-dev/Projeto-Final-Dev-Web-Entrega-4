<template>
  <div class="pagina-registro">
    <main class="conteudo-principal">
      <div class="container-registro" :class="{ ativo: animar }">
        <div class="caixa-formulario">
          <h2>Criar Conta</h2>

          <form @submit.prevent="criarConta">
            <!-- Nome -->
            <div class="grupo-formulario">
              <label for="campo-nome">Nome:</label>
              <div class="campo-com-icone">
                <i class="bi bi-person icone-input"></i>
                <input
                  id="campo-nome"
                  v-model="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                />
              </div>
            </div>

            <!-- Email -->
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
              <span v-if="erroEmail" class="mensagem-erro">{{
                erroEmail
              }}</span>
            </div>

            <!-- Senha -->
            <div class="grupo-formulario">
              <label for="campo-senha">Senha:</label>
              <div class="campo-com-icone">
                <i class="bi bi-lock icone-input"></i>
                <input
                  id="campo-senha"
                  v-model="senha"
                  :type="mostrarSenha ? 'text' : 'password'"
                  placeholder="Crie uma senha"
                />
                <i
                  class="bi icone-olho"
                  :class="mostrarSenha ? 'bi-eye-slash' : 'bi-eye'"
                  @click="alternarSenha"
                  title="Mostrar ou ocultar senha"
                ></i>
              </div>
            </div>

            <!-- Confirmar Senha -->
            <div class="grupo-formulario">
              <label for="campo-confirmar-senha">Confirmar Senha:</label>
              <div class="campo-com-icone">
                <i class="bi bi-lock-fill icone-input"></i>
                <input
                  id="campo-confirmar-senha"
                  v-model="confirmarSenha"
                  :type="mostrarConfirmarSenha ? 'text' : 'password'"
                  placeholder="Confirme sua senha"
                />
                <i
                  class="bi icone-olho"
                  :class="mostrarConfirmarSenha ? 'bi-eye-slash' : 'bi-eye'"
                  @click="alternarConfirmarSenha"
                  title="Mostrar ou ocultar senha"
                ></i>
              </div>
              <span v-if="erroSenha" class="mensagem-erro">{{
                erroSenha
              }}</span>
            </div>

            <!-- Botão -->
            <button type="submit" class="botao-criar">Criar Conta</button>

            <p class="texto-login">
              Já tem conta?
              <router-link to="/login">Fazer login</router-link>
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

const nome = ref("");
const email = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const erroEmail = ref("");
const erroSenha = ref("");
const animar = ref(false);
const mostrarSenha = ref(false);
const mostrarConfirmarSenha = ref(false);

const alternarSenha = () => {
  mostrarSenha.value = !mostrarSenha.value;
};

const alternarConfirmarSenha = () => {
  mostrarConfirmarSenha.value = !mostrarConfirmarSenha.value;
};

const criarConta = () => {
  // limpa mensagens de erro antigas
  erroEmail.value = "";
  erroSenha.value = "";

  //  Verifica se todos os campos estão preenchidos
  if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
    notificationStore.addNotification(
      "Por favor, preencha todos os campos antes de continuar.",
      "erro"
    );
    return;
  }

  // Valida nome completo: mínimo 5 caracteres e deve conter ao menos um espaço
  const nomeLimpo = nome.value.trim();

  // Verifica se tem pelo menos 5 caracteres
  if (nomeLimpo.length < 5) {
    notificationStore.addNotification(
      "O nome deve ter pelo menos 5 caracteres.",
      "erro"
    );
    return;
  }

  // Verifica se contém espaço (nome + sobrenome)
  if (!nomeLimpo.includes(" ")) {
    notificationStore.addNotification(
      "Digite seu nome completo (nome e sobrenome).",
      "erro"
    );
    return;
  }

  //  Verifica se as senhas coincidem
  if (senha.value !== confirmarSenha.value) {
    erroSenha.value = "As senhas não conferem.";
    notificationStore.addNotification(
      "As senhas não conferem. Verifique e tente novamente.",
      "erro"
    );
    return;
  }

  //  Verifica tamanho mínimo da senha
  if (senha.value.length < 6) {
    erroSenha.value = "A senha deve ter pelo menos 6 caracteres.";
    notificationStore.addNotification(
      "A senha deve ter pelo menos 6 caracteres.",
      "erro"
    );
    return;
  }

  //  Tenta criar a conta
  try {
    userStore.register(nome.value, email.value, senha.value);
    notificationStore.addNotification(
      "Conta criada com sucesso! Faça login para continuar.",
      "sucesso"
    );

    // redireciona para login após 1.5s
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    if (error instanceof Error) {
      erroEmail.value = error.message;
      notificationStore.addNotification(error.message, "erro");
    } else {
      notificationStore.addNotification("Erro ao criar conta.", "erro");
    }
  }
};
</script>

<style scoped>
/* === Estrutura principal === */
.pagina-registro {
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

.container-registro {
  width: 100%;
  max-width: 480px;
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

/* === Campos === */
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

/* === Campo com ícone === */
.campo-com-icone {
  display: flex;
  align-items: center;
  border: 1px solid var(--cor-input-borda);
  border-radius: 8px;
  background-color: var(--cor-input);
  padding: 0 0.75rem;
  transition: all 0.3s ease;
  gap: 0.5rem;
  height: 45px;
}

.campo-com-icone:focus-within {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.icone-input {
  color: var(--texto-placeholder);
  font-size: 1.2rem;
  flex-shrink: 0;
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

.campo-com-icone input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--texto-principal);
}

.campo-com-icone input::placeholder {
  color: var(--texto-placeholder);
}

/* === Mensagem de erro === */
.mensagem-erro {
  color: #b91c1c;
  font-size: 0.85em;
  margin-top: 4px;
  display: block;
}

/* === Botão === */
.botao-criar {
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

.botao-criar:hover {
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
</style>
