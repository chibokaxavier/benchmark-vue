<template>
  <div class="w-[84.5%] flex justify-center">
    <div class="">
      <div class="flex">
        <h1 class="font-bold text-[40px] flex justify-center text-gray-600">
          {{ data.title }}
        </h1>
        <div class="absolute right-0 top-2">
          <img
            :src="data.image"
            alt=""
            class="h-[50px] w-[50px] rounded-full"
          />
        </div>
      </div>

      <h2 class="font-semibold text-[20px] flex justify-center text-gray-600">
        {{ data.content }}
      </h2>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
export default defineComponent({
  inject: ["postsService", "authService"],
  data(): {
    data: {
      image: string;
      title: string;
      content: string;
    };
    id: string;
  } {
    return {
      data: {
        image: "",
        title: "",
        content: "",
      },
      id: this.$route.params.id as string,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  async created() {
    this.data = await this.postsService.getSinglePost(this.id);
  },
});
</script>
  
  <style>
</style>