import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";

// Views
import LandingPage from "../views/LandingPageView.vue";
import LoginPage from "../views/LoginPageView.vue";
import RegisterPage from "../views/RegisterPageView.vue";
import DashboardPage from "../views/DashboardPageView.vue";
import CreateTaskPage from "../views/CreateTaskPageView.vue";
import EditTaskPage from "../views/EditTaskPageView.vue";
import TaskDetailsPage from "../views/TaskDetailsPageView.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-task",
    name: "CreateTask",
    component: CreateTaskPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-task/:id",
    name: "EditTask",
    component: EditTaskPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-details/:id",
    name: "TaskDetails",
    component: TaskDetailsPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de rota — exige login para páginas protegidas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
