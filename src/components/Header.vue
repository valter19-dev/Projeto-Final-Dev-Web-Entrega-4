<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <router-link to="/">
            <span class="logo-text">Dash</span>Pro+
          </router-link>
        </div>

        <div class="nav-actions">
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :title="isDark ? 'Modo claro' : 'Modo escuro'"
          >
            <span class="icon">{{ isDark ? "☀️" : "🌙" }}</span>
          </button>

          <button class="menu-toggle" @click="emitToggleMenu">☰</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { useThemeStore } from "../stores/themeStore";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();

const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => themeStore.toggleTheme();

// 🔥 Novo método — dispara evento global
const emit = defineEmits(["toggle-menu"]);

const emitToggleMenu = () => {
  emit("toggle-menu");
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--cor-sidebar);
  border-bottom: 3px solid var(--cor-borda);
  z-index: 1000;
  height: 60px;
}

.navbar {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--cor-cartao);
  padding: 10px 20px;
  width: 100%;
}

.logo a {
  color: var(--texto-principal);
  font-weight: bold;
  font-size: 1.4rem;
  text-decoration: none;
}

.logo-text {
  color: var(--cor-primaria);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Botão de tema */
.theme-toggle {
  background: transparent;
  border: none;
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Botão hambúrguer (menu retrátil) */
.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  color: var(--texto-principal);
  font-size: 1.8rem;
  cursor: pointer;
}

/* Responsividade: exibe o hambúrguer no mobile */
@media (max-width: 768px) {
  .menu-toggle {
    display: inline-block;
  }
}
</style>
