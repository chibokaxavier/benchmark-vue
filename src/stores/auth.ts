import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@firebase/auth";
export const useAuthStore = defineStore("auth", {
  state(): {
    user: User | null;
    loggedIn: boolean;
  } {
    return {
      user: null,
      loggedIn: false,
    };
  },
  actions: {
    login(new_user: User) {
      this.user = new_user;
      this.loggedIn = true;
    },
    logout() {
      this.user = null;
      this.loggedIn = false;
    },
  },
});
