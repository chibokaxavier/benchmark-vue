<template>
   <div class="w-[84.5%] pt-[10px]">
    <div class="font-bold text-[40px] flex justify-center text-gray-600">
      Users Posts
    </div>
    <div class="grid grid-cols-3">
      <div
        v-for="onepost in data"
        :key="onepost.id"
        class="bg-gray-200 m-2 p-[20px] break-words cursor-pointer rounded-md"
      >
       <div>
          <h2 class="font-semibold text-[20px] flex justify-center">
            {{ onepost.title }}
          </h2>
          <div class="flex justify-center my-10 ">
                <img :src="onepost.image" class="rounded-full h-[200px] w-[200px]" alt="">
              </div>
          <h3 class="mt-[5px] flex justify-center">{{ onepost.content }}</h3>
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
  export default defineComponent({
    inject: ["postsService", "authService"],
    data():{
    data: Post[] ,
    auth: any,
    id:string
  }  {
      return {
        data: [],
        auth: "",
        id: this.$route.params.id as string,
      };
    },
    computed: {
      ...mapStores(useAuthStore),
    },
    async created() {
      this.data = await this.postsService.getPersonalPosts(this.id);
    },
  });
  </script>
    
    <style>
  </style>