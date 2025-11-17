import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref([]);
  const messages = ref([]);

  // Carregar mensagens do localStorage
  const loadMessages = () => {
    const saved = localStorage.getItem("dashboard_mensagens");
    if (saved) {
      messages.value = JSON.parse(saved);
    }
  };

  // Salvar mensagens no localStorage
  const saveMessages = () => {
    localStorage.setItem("dashboard_mensagens", JSON.stringify(messages.value));
  };

  // Adicionar notificação temporária
  const addNotification = (mensagem, tipo = "info", duracao = 3000) => {
    const id = Date.now();
    const notification = {
      id,
      mensagem,
      tipo,
      duracao,
    };

    notifications.value.push(notification);

    if (duracao > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duracao);
    }

    return id;
  };

  // Remover notificação
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  // Adicionar mensagem persistente (no localStorage)
  const addMessage = (texto, tipo = "sucesso") => {
    const message = {
      id: Date.now(),
      texto,
      tipo,
      data: new Date().getTime(),
    };

    messages.value.push(message);
    saveMessages();
    return message;
  };

  // Remover mensagem
  const removeMessage = (id) => {
    messages.value = messages.value.filter((m) => m.id !== id);
    saveMessages();
  };

  // Limpar todas as mensagens
  const clearMessages = () => {
    messages.value = [];
    saveMessages();
  };

  // Inicializar ao criar a store
  loadMessages();

  return {
    notifications,
    messages,
    loadMessages,
    saveMessages,
    addNotification,
    removeNotification,
    addMessage,
    removeMessage,
    clearMessages,
  };
});
