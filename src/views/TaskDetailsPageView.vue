<template>
  <div class="task-details-page">
    <Header @toggle-menu="toggleSidebar" />
    <div class="dashboard-layout">
      <Sidebar :isOpen="isSidebarOpen" @openMessages="openMessages" />
      <main class="main-content">
        <div class="container">
          <div v-if="task" class="cartao-detalhes">
            <div class="titulo-status">
              <h2>{{ task.titulo }}</h2>
            </div>

            <div class="campo-detalhes">
              <label>ID:</label>
              <span>{{ task.id }}</span>
            </div>

            <div class="campo-detalhes">
              <label>Descrição:</label>
              <div class="descricao-completa">
                <p>{{ task.descricao || "Sem descrição" }}</p>
              </div>
            </div>

            <div
              class="campo-detalhes status-tarefa"
              :class="{ concluida: task.concluida, pendente: !task.concluida }"
            >
              <label>Status:</label>
              <span>{{ task.concluida ? "Concluída" : "Pendente" }}</span>
            </div>

            <div class="acoes-detalhes">
              <router-link
                :to="`/edit-task/${task.id}`"
                class="botao-editar-tarefa"
              >
                Editar
              </router-link>

              <button class="botao-excluir-tarefa" @click="deleteTask">
                Excluir
              </button>
              <router-link to="/dashboard" class="botao-voltar-lista"
                >Voltar</router-link
              >
            </div>
          </div>
          <div v-else class="sem-tarefas-container">
            <p class="sem-tarefas">Tarefa não encontrada.</p>
            <router-link to="/dashboard" class="botao-voltar-lista"
              >Voltar ao Dashboard</router-link
            >
          </div>
        </div>
      </main>
    </div>
    <Notification />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Notification from "../components/Notification.vue";
import { useTaskStore } from "../stores/taskStore";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const taskId = ref<number | null>(null);

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

const task = computed(() => {
  if (!taskId.value) return null;
  return taskStore.getTaskById(taskId.value);
});

onMounted(() => {
  const id = route.params.id as string;
  taskId.value = Number(id);
});

const toggleTask = () => {
  if (!taskId.value) return;
  taskStore.toggleTask(taskId.value);
  notificationStore.addNotification(
    task.value?.concluida
      ? "Tarefa desmarcada!"
      : "Tarefa marcada como concluída!",
    "sucesso"
  );
};

const deleteTask = () => {
  if (!taskId.value) return;
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    taskStore.deleteTask(taskId.value);
    notificationStore.addNotification("Tarefa removida!", "sucesso");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }
};
</script>

<style scoped>
.task-details-page {
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

.cartao-detalhes {
  background-color: var(--cor-cartao);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--sombra-cartao);
  border: 1px solid var(--cor-borda);
}

.titulo-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--cor-borda);
}

.status-tarefa span {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
}

.status-tarefa.concluida span {
  background-color: #d4f8d4; /* verde claro */
  color: #2e7d32; /* verde escuro */
}

.status-tarefa.pendente span {
  background-color: #ffe6c7; /* laranja claro */
  color: #e65100; /* laranja escuro */
}

.campo-detalhes {
  margin-bottom: 25px;
}

.campo-detalhes label {
  display: block;
  color: var(--texto-label);
  margin-bottom: 8px;
  font-weight: 600;
}

.campo-detalhes span {
  color: var(--texto-principal);
  font-size: 1.05em;
}

.descricao-completa {
  background-color: var(--cor-input);
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid var(--cor-primaria);
  border: 1px solid var(--cor-borda);
}

.descricao-completa p {
  margin: 0;
  color: var(--texto-principal);
  line-height: 1.6;
}

.acoes-detalhes {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.botao-editar-tarefa,
.botao-concluir,
.botao-excluir-tarefa,
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
@media (max-width: 600px) {
  .acoes-detalhes {
    flex-direction: column;
    gap: 10px;
  }

  .botao-editar-tarefa,
  .botao-concluir,
  .botao-excluir-tarefa,
  .botao-voltar-lista {
    width: 100%;
    min-width: unset;
  }
}

.botao-editar-tarefa {
  background-color: var(--cor-secondary);
  color: white;
}

.botao-editar-tarefa:hover {
  background-color: var(--cor-secondary-hover);
}

.botao-concluir {
  background-color: var(--cor-sucesso);
  color: white;
}

.botao-concluir:hover {
  background-color: var(--cor-sucesso-hover);
}

.botao-excluir-tarefa {
  background-color: var(--cor-perigo);
  color: white;
}

.botao-excluir-tarefa:hover {
  background-color: var(--cor-perigo-hover);
}

.botao-voltar-lista {
  background-color: var(--cor-primaria);
  color: white;
}

.botao-voltar-lista:hover {
  background-color: var(--cor-primaria-hover);
}

.sem-tarefas-container {
  text-align: center;
  padding: 60px 20px;
  background-color: var(--cor-cartao);
  border-radius: 8px;
  border: 1px dashed var(--cor-borda);
}

.sem-tarefas {
  color: var(--texto-secundario);
  font-size: 1.1em;
  margin-bottom: 20px;
}
</style>
