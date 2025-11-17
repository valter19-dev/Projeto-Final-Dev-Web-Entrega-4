<template>
  <div v-if="isOpen" class="modal ativo" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Configurações de perfil</h2>
        <button class="fechar-modal" @click="closeModal">&times;</button>
      </div>

      <div class="modal-body perfil-body">
        <div class="perfil-info">
          <img
            :src="user.avatar || defaultAvatar"
            alt="Avatar do usuário"
            class="perfil-avatar"
          />
          <h3 class="perfil-nome">{{ user.name }}</h3>
          <p class="perfil-email">{{ user.email }}</p>
        </div>

        <div class="perfil-acoes">
          <button class="botao-editar-perfil">
            <i class="bi bi-pencil-square"></i> Editar Perfil
          </button>
          <button class="botao-sair-perfil" @click="logout">
            <i class="bi bi-box-arrow-right"></i> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}>();

const emit = defineEmits<{
  close: [];
  logout: [];
}>();

import defaultAvatar from "../assets/img-profile/usuario.png"; // imagem padrão

const closeModal = () => emit("close");
const logout = () => emit("logout");
const editarPerfil = () => emit("edit");
</script>

<style scoped>
/* === Reaproveita base do modal de mensagens === */
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
  max-width: 450px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

/* === Corpo do perfil === */
.perfil-body {
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.perfil-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.perfil-nome {
  margin: 10px 0 5px;
  color: var(--texto-principal);
  font-size: 1.3rem;
  font-weight: 600;
}

.perfil-email {
  color: var(--texto-secundario);
  font-size: 0.95rem;
}

.perfil-acoes {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-top: 15px;
}

.botao-editar-perfil,
.botao-sair-perfil {
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.botao-editar-perfil {
  background-color: var(--cor-primaria);
  color: white;
}

.botao-editar:hover {
  background-color: var(--cor-primaria-hover);
}

.botao-sair-perfil {
  background-color: var(--cor-perigo);
  color: white;
}

.botao-sair:hover {
  background-color: var(--cor-perigo-hover);
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

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }
}
</style>
