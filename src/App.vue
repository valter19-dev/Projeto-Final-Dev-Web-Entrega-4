<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "./stores/themeStore"; // ajuste caminho se necessário

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;

// opcional: debug para console
console.log("App mounted, theme isDark initial =", isDark.value);
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDark, 'light-theme': !isDark }">
    <router-view />
  </div>
</template>

<style>
/* botão <style>
/* botão */
.theme-toggle {
  margin-left: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

/* estilo claro */
body {
  background: #f5f5f5;
  color: #222;
}

/* ao aplicar class no <html> (documentElement) */
.dark-theme body {
  background: #121212;
  color: #eee;
}
</style>
