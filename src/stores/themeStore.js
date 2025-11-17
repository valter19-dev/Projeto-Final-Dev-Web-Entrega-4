import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // 🔹 Carrega tema salvo no localStorage ao iniciar
  const loadTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      isDark.value = true;
    } else if (saved === "light") {
      isDark.value = false;
    } else {
      // tema padrão escuro
      isDark.value = true;
      localStorage.setItem("theme", "dark");
    }
    applyTheme();
  };

  // 🔹 Alterna entre claro e escuro
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    applyTheme();
    console.log("🌗 Tema trocado:", isDark.value ? "dark" : "light");
  };

  // 🔹 Aplica a classe correta ao <html>
  const applyTheme = () => {
    const html = document.documentElement;
    html.classList.remove("light-theme", "dark-theme");
    html.classList.add(isDark.value ? "dark-theme" : "light-theme");
  };

  // 🔹 Observa mudanças e reaplica automaticamente
  watch(isDark, () => applyTheme());

  // 🔹 Inicializa
  loadTheme();

  return { isDark, toggleTheme };
});
