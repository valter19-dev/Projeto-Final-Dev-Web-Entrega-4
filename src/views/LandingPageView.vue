<template>
  <div class="pagina-inicial">
    <main class="conteudo-principal">
      <div class="cartao-landing">
        <!-- Texto superior -->
        <h1 class="titulo">Gerenciador de Tarefas</h1>
        <p class="subtitulo">Comece agora!</p>

        <!-- Ilustração -->
        <img
          class="ilustracao"
          :src="ilustracao"
          alt="Ilustração de organização"
        />

        <!-- Botões -->
        <div class="acoes">
          <router-link to="/login" class="botao botao-primario">
            Entrar
          </router-link>

          <router-link to="/register" class="botao botao-secundario">
            Criar Conta
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Ilustração (troque se quiser)
import ilustracao from "../assets/landing.imges/dashboard3.png";
</script>

<style scoped>
/* CONTAINER GERAL */
.pagina-inicial {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--cor-sidebar), var(--color-bg));
  display: flex;
  flex-direction: column;
}

/* CENTRALIZA A CARTA PRINCIPAL */
.conteudo-principal {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* CARTÃO BRANCO/ESCURO */
.cartao-landing {
  background: linear-gradient(360deg, var(--cor-sidebar), var(--color-bg));
  width: 100%;
  max-width: 420px;
  border-radius: 24px;
  padding: 30px 25px;
  box-shadow: var(--sombra-form);
  text-align: center;
  border: 1px solid var(--cor-borda);
}

/* TÍTULOS */
.titulo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--texto-principal);
  margin-bottom: 5px;
}

.subtitulo {
  font-size: 1.1rem;
  color: var(--texto-secundario);
  margin-bottom: 25px;
}

/* ILUSTRAÇÃO */
.ilustracao {
  width: 100%;
  max-width: 260px;
  margin: 0 auto 25px auto;
  display: block;
  filter: var(--filtro-imagem); /* adapta ao modo escuro */
}

/* BOTÕES */
.acoes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.botao {
  padding: 14px;
  width: 100%;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

/* BOTÃO PRINCIPAL */
.botao-primario {
  background-color: var(--cor-primaria);
  color: #fff;
}

.botao-primario:hover {
  background-color: var(--cor-primaria-hover);
  transform: translateY(-2px);
}

/* BOTÃO SECUNDÁRIO */
.botao-secundario {
  background-color: transparent;
  border: 2px solid var(--cor-primaria);
  color: var(--cor-primaria);
}

.botao-secundario:hover {
  background-color: var(--cor-primaria);
  color: #fff;
}

/* RESPONSIVIDADE MOBILE */
@media (max-width: 480px) {
  .cartao-landing {
    padding: 25px 18px;
  }

  .titulo {
    font-size: 1.8rem;
  }

  .subtitulo {
    font-size: 1rem;
  }

  .botao {
    font-size: 1rem;
  }
}
</style>
