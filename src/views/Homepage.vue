<script lang="ts">
import Sidebar from "../components/Sidebar.vue";
import { defineComponent } from "@vue/runtime-core";
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
// import { Post } from "types/Post";
import type { Post } from "types/Post";

export default defineComponent({
  inject: ["postsService", "authService"],
  data():{
    data: Post[],
    auth: any,
    admin: {
      name:string,
      id:string,
      email:string
    }
  } {
    return {
      auth: "",
      data: [],
      admin: {
        name: "",
        id: "",
        email: ""
      },
    };
  },
  methods: {
    async deletePost(id:string) {
      await this.postsService.deletePost(id, this.authStore.user?.uid);
      this.data = await this.postsService.getPosts();
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  async created() {
    this.data = await this.postsService.getPosts();
    this.admin = await this.postsService.getAdmin(this.authStore.user?.uid);
    console.log(this.admin);
  },
});
</script>

<template>
  <div class=" md:w-[84.5%] ">
    <div class="font-bold text-[30px] md:text-[40px] flex justify-center text-gray-600">
      All Blogs
    </div>
    <div class="md:grid md:grid-cols-3">
      <div></div>
      <div
        v-for="onepost in data"
        :key="onepost.id"
        class="
          bg-gray-200
          m-2
          p-[20px]
          break-words
          cursor-pointer
          rounded-md
          hover:bg-yellow-900 hover:text-white
          transition
          ease-in-out
          delay-150
          h-[350px]
          md:w-[370px]
          md:h-[370px]
          relative
          pb-[20px]
          flex justify-center
        "
      >
        <div class="">
          <router-link :to="{ name: 'Onepost', params: { id: onepost.id } }">
            <div>
              <h2 class="font-semibold text-[18px] md:text-[20px] flex justify-center">
                {{ onepost.title }}
              </h2>
              <div class="flex justify-center">
                <img
                  :src="onepost.image"
                  class="rounded-full h-[150px] w-[150px] md:h-[200px] md:w-[200px]"
                  alt=""
                />
              </div>

              <h3 class="mt-[20px] flex justify-center">
                {{ onepost.content }}
              </h3>
            </div>
          </router-link>
          <div
            class="absolute bottom-[10px] z-50"
            v-if="
              onepost.sender === authStore.user?.email ||
              authStore.user?.uid === admin.id
            "
          >
            <div class="flex gap-7">
              <router-link
                :to="{ name: 'Updatepost', params: { id: onepost.id } }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="black"
                  class="w-10 h-10 hover:bg-white p-2 rounded-full z-50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </router-link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-10 h-10 hover:bg-white p-2 rounded-full z-50"
                @click="deletePost(onepost.id as string)"
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
    </div>
  </div>
</template>
