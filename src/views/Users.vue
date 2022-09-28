<template>
  <div class="w-[84.5%] pt-[10px]">
    <div class="font-bold text-[40px] flex justify-center text-gray-600">
      All Users
    </div>
    <div class="grid grid-cols-1">
      <div
        v-for="oneuser in data"
        :key="oneuser.id"
        class="
          bg-gray-200
          m-2
          p-[20px]
          w-fit
          min-w-[400px]
          break-words
          cursor-pointer
          rounded-md
          hover:bg-yellow-900 hover:text-white
          transition
          ease-in-out
          delay-150
        "
      >
        <router-link :to="{ name: 'Oneuser', params: { id: oneuser.id } }">
          <div>
            <h2 class="font-semibold text-[20px] flex justify-center">
              {{ oneuser.name }}
            </h2>
            <h3 class="mt-[5px] flex justify-center">{{ oneuser.email }}</h3>
          </div> </router-link
        >
          <div
            class=""
            v-if="
              authStore.user?.uid === admin.id
            "
          >
            <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-10 h-10 hover:bg-white p-2 rounded-full z-50"
                @click="deletePost(oneuser.id)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          
         
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
import type { Post } from "types/Post";
import type { User } from "types/User";
export default defineComponent({
  inject: ["postsService", "authService"],
  data():{
    data: User[],
    auth: any,
    admin: {
      name:string,
      id:string,
      email:string
    }
  } {
    return {
      data: [],
      auth: "",
      admin:{
        name: "",
        id: "",
        email: ""
      },
    };
  },
  methods:{
    async deletePost(id:string) {
      await this.postsService.deleteUser(id, this.authStore.user?.uid);
      this.data = await this.postsService.getUsers(this.authStore.user?.uid);
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  async created() {
    this.data = await this.postsService.getUsers(this.authStore.user?.uid);
    this.admin = await this.postsService.getAdmin(this.authStore.user?.uid);
  },
});
</script>
  
  <style>
</style>