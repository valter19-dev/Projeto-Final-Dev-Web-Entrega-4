<template>
  <aside class="sidebar" :class="{ active: isOpen }">
    <nav class="menu-navegacao">
      <!-- Perfil no topo da sidebar -->
      <div class="perfil-sidebar">
        <img
          :src="currentUser.avatar || defaultAvatar"
          alt="Foto do usuário"
          class="perfil-sidebar-avatar"
        />
        <span class="perfil-sidebar-nome">Olá,{{ currentUser.name }}!</span>
      </div>

      <!-- Links -->
      <router-link
        to="/dashboard"
        class="nav-link"
        :class="{ active: isActive('/dashboard') }"
      >
        <i class="bi bi-list-task"></i>
        <span>Minhas Tarefas</span>
      </router-link>

      <router-link
        to="/create-task"
        class="nav-link"
        :class="{ active: isActive('/create-task') }"
      >
        <i class="bi bi-plus-circle"></i>
        <span>Nova Tarefa</span>
      </router-link>

      <a href="#" class="nav-link" @click.prevent="openMessages">
        <i class="bi bi-chat-dots"></i>
        <span>Mensagens</span>
        <span v-if="messageCount > 0" class="message-count">
          {{ messageCount }}
        </span>
      </a>

      <div @click="openProfile" class="nav-link">
        <i class="bi bi-gear"></i>
        <span>Configurações</span>
      </div>

      <!-- Logout -->
      <a href="#" class="nav-link logout-link" @click.prevent="confirmLogout">
        <i class="bi bi-box-arrow-right"></i>
        <span>Sair</span>
      </a>
    </nav>

    <!-- Modal do perfil -->
    <UserProfileModal
      :isOpen="isProfileOpen"
      :user="currentUser"
      @close="isProfileOpen = false"
      @logout="handleLogout"
      @edit="handleEditProfile"
    />
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotificationStore } from "../stores/notificationStore";
import { useUserStore } from "../stores/userStore";

import UserProfileModal from "./UserProfileModal.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Caminho correto da imagem fallback
const defaultAvatar = new URL(
  "../assets/img-profile/usuario.png",
  import.meta.url
).href;

// Emits
const emit = defineEmits(["openMessages", "toggle-menu"]);

// Stores
const notificationStore = useNotificationStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const isProfileOpen = ref(false);

// Usuário atual formatado
const currentUser = computed(() => ({
  name: userStore.currentUser?.nome ?? "Usuário",
  email: userStore.currentUser?.email ?? "email@exemplo.com",
  avatar: userStore.currentUser?.avatar ?? null,
}));

const messageCount = computed(() => notificationStore.messages.length);

const isActive = (path) => route.path === path;

const openMessages = () => emit("openMessages");

const openProfile = () => {
  isProfileOpen.value = true;
};

const handleLogout = () => {
  userStore.logout();
  isProfileOpen.value = false;
  router.push("/login");
};

const handleEditProfile = () => {
  isProfileOpen.value = false;
  router.push("/edit-profile");
};

const confirmLogout = () => {
  if (confirm("Deseja realmente sair?")) {
    userStore.logout();
    router.push("/login");
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  width: 250px;
  height: calc(100vh - 60px);
  background: linear-gradient(180deg, var(--cor-sidebar), var(--color-bg));
  border-right: 1px solid var(--cor-borda);
  box-shadow: var(--sombra-cartao);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  font-weight: bold;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow-y: hidden;
  z-index: 900;
}

/* Perfil no topo */
.perfil-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 35px;
  margin-top: 10px;
}

.perfil-sidebar-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  transition: 0.3s;
}

.perfil-sidebar-avatar:hover {
  transform: scale(1.06);
}

.perfil-sidebar-nome {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--texto-principal);
}

/* Menus */
.menu-navegacao {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  gap: 10px;
}

/* Links */
.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-info-dark);
  padding: 12px 20px;
  margin: 0 15px;
  border-radius: 10px;
  transition: 0.3s ease;
  text-decoration: none;
  position: relative;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-light);
}

.nav-link.active {
  background-color: var(--color-light);
  color: var(--color-primary);
  font-weight: 600;
}

/* ==== Contador de mensagens ==== */
.message-count {
  background: var(--color-danger);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 12px;
  padding: 2px 8px;
  margin-left: auto;
}

/* ==== Logout ==== */
.logout-link {
  margin-top: auto; /* empurra o botão pro fim da sidebar */
  margin-bottom: 25px;
  color: var(--texto-principal);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  font-weight: 200;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.logout-link i {
  font-size: 1.3rem;
}
.logout-link:hover {
  background-color: var(--color-danger);
  color: var(--color-white);
  transform: translateX(5px);
}
.logout-link:active {
  transform: scale(0.98);
}

/* Estilos de responsividade para Sidebar */ /* Mobile: Oculta a sidebar por padrão e usa transição para aparecer */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -250px; /* Esconde a sidebar fora da tela */
    transition: left 0.3s ease;
    z-index: 999; /* Garante que fique acima do conteúdo principal */
  }
  .sidebar.active {
    left: 0; /* Mostra a sidebar quando ativa */
  }
} /* Desktop: Sidebar sempre visível */
@media (min-width: 769px) {
  .sidebar {
    position: fixed;
    width: 250px;
    left: 0;
  }
}
</style>
