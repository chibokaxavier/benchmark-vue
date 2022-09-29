<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
export default defineComponent({
  inject: ["postsService", "authService"],
  data() {
    return {
      userName: "",
      auth: "",
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async logOut() {
      await this.authService.signOut();
      this.authStore.logout();
      this.$router.push("/login");
    },
  },
});
</script>

<template>
  <div class="md:p-2 flex md:block mt-5 md:mt-0 h-[50px] md:h-0" id="link">
    <router-link to="/profile">
      <div class="w-[130px] md:w-full">
        <span class="hidden md:block  md:pt-2 md:pl-2 font-semibold text-[20px] text-gray-700">{{
          authStore.user?.displayName
        }}</span>
          <span class=" md:hidden font-semibold text-[15px] ml-5 text-gray-700">{{
          authStore.user?.displayName
        }}</span>
      </div></router-link
    >
    <router-link to="/">
      <div class="flex md:my-10 rounded-md p-1">
        <span class="hidden md:block pl-2 pr-4 font-semibold text-[20px] link-name"
          >ALL BLOGS</span
        >
        <span class="md:hidden font-semibold text-[15px]  ml-5 link-name"
          >BLOGS</span
        >
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[30px] h-[30px] hidden md:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div></div
    ></router-link>
    <router-link to="/users">
      <div class="flex md:my-10 rounded-md p-1">
        <span class=" hidden md:block pl-2 pr-4 font-semibold text-[20px] link-name"
          >ALL USERS</span
        >
        <span class="md:hidden font-semibold text-[15px] ml-5 link-name"
          >USERS</span
        >
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[30px] h-[30px] hidden md:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        </div></div
    ></router-link>
    <router-link to="/profile/create">
      <div class="flex md:my-10 rounded-md p-1 w-[130px] md:w-full">
        <span class=" hidden md:block pl-2 pr-4 font-semibold text-[20px] link-name"
          >ADD POST</span
        >
        <span class="md:hidden  font-semibold text-[15px]  ml-5 link-name"
          >ADD POST</span
        >
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[30px] h-[30px] hidden md:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div></div
    ></router-link>
    <div class="md:flex py-10 md:relative hidden">
      <button
        @click="logOut"
        class="
          w-[150px]
          h-[50px]
          bg-yellow-900
          rounded-2xl
          text-white
          mt-[200px]
          ml-[10px]
        "
      >
        Log Out
      </button>
    </div>
  </div>
</template>


<style scoped>
 #link a.router-link-exact-active {
  color: rgb(113 63 18 )
  }
  .link-name{
    color: rgb(55 65 81)
  }
</style>