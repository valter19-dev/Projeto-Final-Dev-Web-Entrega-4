<template>
  <div class="notifications-container">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notificacao', notification.tipo, 'ativo']"
      >
        {{ notification.mensagem }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
  pointer-events: none;
}

.notificacao {
  position: relative;
  padding: 15px 20px;
  border-radius: 4px;
  color: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  min-width: 250px;
  max-width: 400px;
}

.notificacao.sucesso {
  background-color: #4caf50;
}

.notificacao.erro {
  background-color: #f44336;
}

.notificacao.alerta {
  background-color: #ff9800;
}

.notificacao.info {
  background-color: #2196f3;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {
  .notifications-container {
    right: 10px;
    left: 10px;
  }

  .notificacao {
    min-width: auto;
    max-width: none;
  }
}
</style>
