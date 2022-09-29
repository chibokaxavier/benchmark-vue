<template>
  <div class="grid grid-cols-2 w-[84.5%] h-screen">
    <div class="bg-white ml-[20px]">
      <h1 class="mt-[10px] text-[40px]">Sign In</h1>
      <form action="" @submit="signIn">
        <div class="mt-[50px]">
          <div>
            <span class="font-bold">EMAIL</span>
            <input
              type="email"
              class="
                outline-1 outline
                w-[500px]
                p-2
                block
                rounded-md
                bg-gray-200
              "
              placeholder="Email"
              v-model="login.email"
              required
            />
          </div>
          <div class="mt-[40px]">
            <span class="font-bold">PASSWORD</span>
            <input
              type="password"
              class="
                outline-1 outline
                block
                w-[500px]
                p-2
                rounded-md
                bg-gray-200
              "
              placeholder="Password"
              required
              v-model="login.password"
            />
          </div>
        </div>
        <button
          type="submit"
          class="
            w-[500px]
            bg-yellow-900
            p-2
            mt-[70px]
            rounded-md
            text-white text-[20px]
            hover:bg-gray-200 hover:text-yellow-900
          "
        >
          Log In
        </button>
      </form>
    </div>
    <div
      class="
        flex
        justify-center
        text-white
        bg-[url('https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]
        bg-cover bg-no-repeat
      "
    >
      <div class="mt-[80px] text-gray-700">
        <h1 class="text-[40px]">Welcome to Login</h1>
        <h1 class="text-center mt-[60px] text-[20px]">
          Don't have an account Sign Up here
        </h1>
        <div class="flex justify-center mt-[60px]">
          <router-link to="/login/signup">
            <button
              class="
                outline
                hover:bg-white hover:text-black hover:outline-white
                rounded-[50px]
                h-[40px]
                w-[100px]
              "
            >
              Sign Upp
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
export default defineComponent({
  inject: ["postsService", "authService"],
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      cred: "",
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async signIn(e:any) {
      e.preventDefault()
      try {
        let user = await this.authService.login(
          this.login.email,
          this.login.password
        );
        this.authStore.login(user);
        this.$router.push("/");
      } catch (err) {
        // network err or incorrect password
        alert("incorrect password");
      }
    },
  },
  created() {},
});
</script>

<style>
</style>