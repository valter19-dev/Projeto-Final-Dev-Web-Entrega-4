<template>
  <div class="cartao-tarefa" :class="{ concluida: task.concluida }">
    <div class="cabecalho-cartao">
      <h3>{{ task.titulo }}</h3>
      <router-link
        :to="`/task-details/${task.id}`"
        class="icone-olho"
        title="Ver detalhes da tarefa"
      >
        <i class="bi bi-eye olho normal"></i>
        <i class="bi bi-eye-fill olho cheio"></i>
      </router-link>
    </div>
    <p>
      <strong style="color: var(--texto-principal)">Descrição:</strong>
      {{ task.descricao || "Sem descrição" }}
    </p>
    <div
      class="campo-detalhes status-tarefa"
      :class="{ concluida: task.concluida, pendente: !task.concluida }"
    >
      <label>Status:</label>
      <span>{{ task.concluida ? "Concluída" : "Pendente" }}</span>
    </div>
    <div class="acoes-tarefa">
      <button class="botao-editar" @click="goToEdit">Editar</button>
      <button class="botao-excluir" @click="deleteTask">Excluir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";
import { useNotificationStore } from "../stores/notificationStore";
import type { Task } from "../stores/taskStore";

const props = defineProps<{
  task: Task;
}>();

const router = useRouter();
const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const goToEdit = () => {
  router.push(`/edit-task/${props.task.id}`);
};

const deleteTask = () => {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    taskStore.deleteTask(props.task.id);
    notificationStore.addNotification("Tarefa removida!", "sucesso");
  }
};
</script>

<style scoped>
.cartao-tarefa {
  background: var(--cor-cartao);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  border: 2px solid var(--cor-borda);
  color: var(--texto-principal);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.cartao-tarefa:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.108);
}

.cartao-tarefa.concluida {
  opacity: 0.7;
  border-color: var(--cor-sucesso);
}

.cabecalho-cartao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cabecalho-cartao h3 {
  color: var(--texto-principal);
  margin: 0;
}

.icone-olho {
  font-size: 1.8rem;
  color: var(--texto-principal);
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.icone-olho .cheio {
  display: none;
}

.icone-olho:hover .normal {
  display: none;
}

.icone-olho:hover .cheio {
  display: inline;
}

.icone-olho:hover {
  color: var(--cor-primaria);
}

.cartao-tarefa p {
  color: var(--texto-secundario);
  margin-bottom: 15px;
  line-height: 1.4;
}

.acoes-tarefa {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.acoes-tarefa button {
  flex: 1;
  min-width: 100px;
  text-align: center;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.campo-detalhes {
  display: flex;
  align-items: flex-end;
  margin-bottom: 2px;
  gap: 8px; /* Espaço entre label e status */
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

/* Garante que em telas menores os botões ocupem a largura total */
@media (max-width: 500px) {
  .acoes-tarefa {
    flex-direction: column;
  }

  .acoes-tarefa button {
    width: 100%;
    min-width: unset;
  }
}

.botao-editar {
  background-color: var(--cor-secondary);
}

.botao-editar:hover {
  background-color: var(--cor-secondary-hover);
}

.botao-concluir {
  background-color: var(--cor-sucesso);
}

.botao-concluir:hover {
  background-color: var(--cor-sucesso-hover);
}

.botao-excluir {
  background-color: var(--cor-perigo);
}

.botao-excluir:hover {
  background-color: var(--cor-perigo-hover);
}

@media (max-width: 768px) {
  .cartao-tarefa {
    padding: 1.5rem; /* Ajuste para um padding intermediário */
  }
}
</style>
