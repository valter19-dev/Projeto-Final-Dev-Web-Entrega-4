<template>
  <div class="dashboard-page">
    <Header @toggle-menu="toggleSidebar" />
    <div class="dashboard-layout">
      <Sidebar :isOpen="isSidebarOpen" @openMessages="openMessages" />
      <main
        class="conteudo-principal"
        :class="{ 'sidebar-open': isSidebarOpen }"
      >
        <div class="cabecalho-dashboard">
          <h1>Minhas Tarefas</h1>
        </div>

        <div class="grade-tarefas">
          <div v-if="tasks.length === 0" class="sem-tarefas-container">
            <p class="sem-tarefas">
              Nenhuma tarefa cadastrada ainda. Adicione uma tarefa!
            </p>
            <router-link to="/create-task" class="botao-nova-tarefa">
              <i class="bi bi-plus-circle"></i> Nova Tarefa
            </router-link>
          </div>
          <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </main>
    </div>

    <MessageModal :isOpen="isModalOpen" @close="closeMessages" />
    <Notification />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import TaskCard from "../components/TaskCard.vue";
import MessageModal from "../components/MessageModal.vue";
import Notification from "../components/Notification.vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";

const taskStore = useTaskStore();
const userStore = useUserStore();

const isModalOpen = ref(false);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Adicionar um watcher para fechar a sidebar ao mudar de rota no mobile, se necessário.
// Por enquanto, a lógica de toggle é suficiente.

const tasks = computed(() => taskStore.getAllTasks);
const userName = computed(() => userStore.getCurrentUserName);

const openMessages = () => {
  isModalOpen.value = true;
};

const closeMessages = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: var(--cor-fundo);
  padding-top: 60px; /* Espaço para o header fixo */
}

.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 60px);
}

.conteudo-principal {
  flex: 1;
  padding: 20px;
  background-color: var(--cor-fundo);
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

/* Desktop: Sidebar visível, conteúdo principal deslocado */
@media (min-width: 769px) {
  .conteudo-principal {
    margin-left: 250px; /* Largura da sidebar */
  }
}

/* Mobile: Sidebar oculta, conteúdo principal ocupa 100% */
@media (max-width: 768px) {
  .conteudo-principal {
    margin-left: 0;
  }
}

.cabecalho-dashboard {
  display: flex;
  position: top;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: var(--cor-cartao);
  padding: 15px;

  gap: 15px;
}

.cabecalho-dashboard h1 {
  color: var(--texto-principal);
  margin: 0;
  border-left: 2px solid var(--cor-primaria);
  padding-left: 10px;
}

.cabecalho-dashboard span {
  color: var(--texto-secundario);
  font-size: 0.95em;
}

.grade-tarefas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.sem-tarefas-container {
  grid-column: 1 / -1;
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

.botao-nova-tarefa {
  display: inline-block;
  background-color: var(--cor-primaria);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.botao-nova-tarefa:hover {
  background-color: var(--cor-primaria-hover);
}

@media (max-width: 768px) {
  .cabecalho-dashboard {
    flex-direction: column;
    align-items: flex-start;
  }

  .grade-tarefas {
    grid-template-columns: 1fr;
  }
  .cabecalho-dashboard {
    flex-direction: column;
    align-items: flex-start;
  }

  .grade-tarefas {
    grid-template-columns: 1fr;
  }
}
</style>
