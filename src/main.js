import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router"; // se tiver, ou remova se não usa
import App from "./App.vue";
import "./style.css"; // ou ./assets/main.css

const app = createApp(App);
app.use(createPinia());
if (router) app.use(router);
app.mount("#app");
