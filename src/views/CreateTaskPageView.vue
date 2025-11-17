<template>
  <div class="create-task-page">
    <Header @toggle-menu="toggleSidebar" />
    <div class="dashboard-layout">
      <Sidebar :isOpen="isSidebarOpen" @openMessages="openMessages" />
      <main class="main-content">
        <div class="container">
          <div class="formulario-tarefa">
            <h2>Nova Tarefa</h2>
            <form @submit.prevent="handleCreateTask">
              <div class="campo-formulario">
                <label for="titulo">Título:</label>
                <input
                  id="titulo"
                  v-model="titulo"
                  type="text"
                  placeholder="Título da tarefa"
                />
              </div>

              <div class="campo-formulario">
                <label for="descricao">Descrição:</label>
                <textarea
                  id="descricao"
                  v-model="descricao"
                  placeholder="Descrição da tarefa (opcional)"
                  rows="5"
                ></textarea>
              </div>

              <div class="acoes-detalhes">
                <button type="submit" class="botao-salvar-tarefa">
                  Salvar Tarefa
                </button>
                <router-link to="/dashboard" class="botao-voltar-lista"
                  >Voltar</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
    <MessageModal :isOpen="isModalOpen" @close="closeMessages" />
    <Notification />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import MessageModal from "../components/MessageModal.vue";
import Notification from "../components/Notification.vue";
import { useTaskStore } from "../stores/taskStore";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const titulo = ref("");
const descricao = ref("");
const erroTitulo = ref("");
const erroDescricao = ref("");

const isModalOpen = ref(false);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const openMessages = () => {
  isModalOpen.value = true;
};

const closeMessages = () => {
  isModalOpen.value = false;
};

const handleCreateTask = () => {
  erroTitulo.value = "";
  erroDescricao.value = "";

  // Verifica se todos os campos estão preenchidos
  if (!titulo.value && !descricao.value) {
    notificationStore.addNotification(
      "Por favor, preencha todos os campos antes de continuar.",
      "erro"
    );
    return;
  }

  if (titulo.value.length < 5) {
    notificationStore.addNotification(
      "O título deve ter pelo menos 5 caracteres.",
      "erro"
    );
    return;
  }

  if (descricao.value && descricao.value.length < 3) {
    notificationStore.addNotification(
      "A descrição deve ter pelo menos 3 caracteres, se preenchida.",
      "erro"
    );
    return;
  }

  taskStore.addTask(titulo.value, descricao.value);
  notificationStore.addNotification("Tarefa criada com sucesso!", "sucesso");

  setTimeout(() => {
    router.push("/dashboard");
  }, 1500);
};
</script>

<style scoped>
.create-task-page {
  min-height: 100vh;
  background-color: var(--cor-fundo);
  padding-top: 60px; /* Espaço para o header fixo */
}

.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 60px);
}

.main-content {
  flex: 1;
  padding: 40px 20px;
  background: linear-gradient(180deg, var(--cor-sidebar), var(--color-bg));
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

/* Desktop: Sidebar visível, conteúdo principal deslocado */
@media (min-width: 769px) {
  .main-content {
    margin-left: 250px; /* Largura da sidebar */
  }
}

/* Mobile: Sidebar oculta, conteúdo principal ocupa 100% */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.formulario-tarefa {
  background-color: var(--cor-cartao);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--sombra-cartao);
  border: 1px solid var(--cor-borda);
}

.formulario-tarefa h2 {
  color: var(--texto-principal);
  margin-bottom: 30px;
  text-align: center;
}

.campo-formulario {
  margin-bottom: 20px;
}

.campo-formulario label {
  display: block;
  color: var(--texto-label);
  margin-bottom: 8px;
  font-weight: 600;
}

.campo-formulario input[type="text"],
.campo-formulario textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--cor-input-borda);
  border-radius: 4px;
  background-color: var(--cor-input);
  color: var(--texto-principal);
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.campo-formulario input::placeholder,
.campo-formulario textarea::placeholder {
  color: var(--texto-placeholder);
}

.campo-formulario input:focus,
.campo-formulario textarea:focus {
  outline: none;
  border-color: var(--cor-primaria);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.campo-formulario textarea {
  resize: vertical;
  min-height: 100px;
}

.acoes-detalhes {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: space-between;
}

.botao-salvar-tarefa,
.botao-voltar-lista {
  flex: 1;
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: background 0.3s;
}

/* Responsividade para botões de ação */
@media (max-width: 500px) {
  .acoes-detalhes {
    flex-direction: column;
    gap: 10px;
  }

  .botao-salvar-tarefa,
  .botao-voltar-lista {
    width: 100%;
  }
}

.botao-salvar-tarefa {
  background-color: var(--cor-sucesso);
  color: white;
}

.botao-salvar-tarefa:hover {
  background-color: var(--cor-sucesso-hover);
}

.botao-voltar-lista {
  background-color: var(--cor-primaria);
  color: white;
}

.botao-voltar-lista:hover {
  background-color: var(--cor-primaria-hover);
}
</style>
