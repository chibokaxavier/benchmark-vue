import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "./assets/tailwind.css";
import { PostsService } from "./service/posts.service";
import { AuthService } from "./service/auth.service";
// import mitt from 'mitt'
import cookies from "vue-cookies";
import { useAuthStore } from "./stores/auth";
const app = createApp(App);
// const eventBus = mitt()

// app.config.globalProperties.eventBus = eventBus
app.use(createPinia());
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== "loginpage" && to.name !== "signup" && !authStore.loggedIn) next({ name: "loginpage" });
  else next();
});
app.use(router);
app.provide("postsService", new PostsService());
app.use(cookies, {
  expire: "3d",
});
app.provide("authService", new AuthService(app.$cookies));
app.mount("#app");
