import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);

  // Carregar tarefas do localStorage
  const loadTasks = () => {
    const saved = localStorage.getItem("tarefas");
    if (saved) {
      tasks.value = JSON.parse(saved);
    }
  };

  // Salvar tarefas no localStorage
  const saveTasks = () => {
    localStorage.setItem("tarefas", JSON.stringify(tasks.value));
  };

  // Adicionar nova tarefa
  const addTask = (titulo, descricao) => {
    const newTask = {
      id: Date.now(),
      titulo,
      descricao,
      concluida: false,
      status: "pendente", // <-- status REAL (não emoji)
    };
    tasks.value.push(newTask);
    saveTasks();
    return newTask;
  };

  // Obter uma tarefa pelo ID
  const getTaskById = (id) => tasks.value.find((t) => t.id === id);

  // Atualizar tarefa (agora incluindo STATUS!)
  const updateTask = (id, titulo, descricao, status) => {
    const task = getTaskById(id);
    if (task) {
      task.titulo = titulo;
      task.descricao = descricao;

      if (status) {
        task.status = status;
        task.concluida = status === "concluida";
      }

      saveTasks();
    }
  };

  // Alternar concluída/pendente
  const toggleTask = (id) => {
    const task = getTaskById(id);
    if (task) {
      task.status = task.concluida ? "concluida" : "pendente";
      saveTasks();
    }
  };

  // Excluir tarefa
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    saveTasks();
  };

  // Listas prontas para filtros
  const getAllTasks = computed(() => tasks.value);
  const getPendingTasks = computed(() =>
    tasks.value.filter((t) => t.status === "pendente")
  );
  const getCompletedTasks = computed(() =>
    tasks.value.filter((t) => t.status === "concluida")
  );

  loadTasks();

  return {
    tasks,
    loadTasks,
    saveTasks,
    addTask,
    getTaskById,
    updateTask,
    toggleTask,
    deleteTask,
    getAllTasks,
    getPendingTasks,
    getCompletedTasks,
  };
});
