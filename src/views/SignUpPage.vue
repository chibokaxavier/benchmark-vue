<template>
  <div class="flex ml-[300px]">
    <div class="bg-white ml-[20px]">
      <h1 class="mt-[10px] text-[40px]">Please Sign Up</h1>
      <form action="" @submit="createUser">
        <div class="mt-[50px]">
          <div>
            <span class="font-bold">Name</span>
            <input
              type="text"
              class="
                outline-1 outline
                w-[500px]
                p-2
                block
                rounded-md
                bg-gray-200
              "
              placeholder="Name"
              v-model="signup.name"
              required
            />
          </div>
          <div class="mt-[40px]">
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
              v-model="signup.email"
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
              v-model="signup.password"
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
          Sign up
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  inject: ["postsService", "authService"],
  data() {
    return {
      signup: {
        name: "",
        email: "",
        password: "",
      },
      cred: "",
    };
  },
  methods: {
    async createUser(e:any) {
      e.preventDefault()
      await this.authService.createUser(
        this.signup.name,
        this.signup.email,
        this.signup.password
      );
      this.signup.name = "";
      this.signup.email = "";
      this.signup.password = "";
      setTimeout(() => this.$router.push("/login"), 1000);
    },
  },
});
</script>

<style>
</style>