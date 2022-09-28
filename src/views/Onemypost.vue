<template>
  <div class="w-[84.5%] pt-[10px] flex justify-center border-2">
    <div>
      <h1 class="font-bold text-[40px] flex justify-center text-gray-600">
        {{ data.title }}
      </h1>

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
      title: string;
      content: string;
    };
    auth: string;
    id: string;
  } {
    return {
      data: {
        title:"",
        content:""
      },
      auth: "",
      id: this.$route.params.id as string,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  async created() {
    this.data = await this.postsService.getMySinglePost(
      this.authStore.user?.uid,
      this.id
    );
  },
});
</script>
    
    <style>
</style>