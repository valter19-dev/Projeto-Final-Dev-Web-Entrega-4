<template>
  <div v-if="isOpen" class="modal ativo" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Mensagens</h2>
        <button class="fechar-modal" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div id="lista-mensagens">
          <div v-if="messages.length === 0" class="mensagem-vazia-modal">
            <p>Função em desenvolvimento volte em breve .</p>
          </div>
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['mensagem', msg.tipo]"
          >
            <p class="mensagem-texto">
              {{ msg.texto }}
              <small>({{ formatTime(msg.data) }})</small>
            </p>
            <button class="fechar-mensagem" @click="removeMessage(msg.id)">
              &times;
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          v-if="messages.length > 0"
          class="botao-limpar"
          @click="clearMessages"
        >
          Limpar Todas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNotificationStore } from "../stores/notificationStore";

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const notificationStore = useNotificationStore();
const messages = computed(() => notificationStore.messages);

const closeModal = () => {
  emit("close");
};

const removeMessage = (id: number) => {
  notificationStore.removeMessage(id);
};

const clearMessages = () => {
  if (confirm("Tem certeza que deseja limpar todas as mensagens?")) {
    notificationStore.clearMessages();
  }
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal.ativo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: var(--cor-cartao);
  border: 1px solid var(--cor-borda);
  border-radius: 8px;
  box-shadow: var(--sombra-form);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--cor-borda);
}

.modal-header h2 {
  margin: 0;
  color: var(--texto-principal);
}

.fechar-modal {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--texto-principal);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fechar-modal:hover {
  color: var(--cor-primaria);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

#lista-mensagens {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mensagem-vazia-modal {
  text-align: center;
  padding: 40px 20px;
  color: var(--texto-secundario);
}

.mensagem {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid;
}

.mensagem.sucesso {
  background-color: rgba(76, 175, 80, 0.1);
  border-left-color: #4caf50;
}

.mensagem.erro {
  background-color: rgba(244, 67, 54, 0.1);
  border-left-color: #f44336;
}

.mensagem.alerta {
  background-color: rgba(255, 152, 0, 0.1);
  border-left-color: #ff9800;
}

.mensagem-texto {
  margin: 0;
  color: var(--texto-principal);
  flex: 1;
}

.mensagem-texto small {
  color: var(--texto-secundario);
  font-size: 0.85em;
  margin-left: 10px;
}

.fechar-mensagem {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--texto-principal);
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fechar-mensagem:hover {
  color: var(--cor-perigo);
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid var(--cor-borda);
  display: flex;
  justify-content: flex-end;
}

.botao-limpar {
  background-color: var(--cor-perigo);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.botao-limpar:hover {
  background-color: var(--cor-perigo-hover);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }

  .modal-header {
    padding: 15px;
  }

  .modal-body {
    padding: 15px;
  }

  .modal-footer {
    padding: 10px 15px;
  }
}
</style>
