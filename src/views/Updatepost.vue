<template>
    <div v-if="!error && loaded" class="w-[84.5%] pt-[10px]">
      <div class="px-[21%]">
        <h1 class="font-bold text-3xl">Update Post</h1>
        <form action="" class="py-4">
          <label for="" class="">Post Title:</label>
          <input
            type="text"
            required
            class="border-2 rounded-md w-[100%] p-2"
            v-model.lazy="post.title"
          />
          <label for="" class="block">Post Content:</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            class="border rounded-md block w-[100%] p-2"
            v-model.lazy="post.content"
          ></textarea>
          <button
            v-on:click.prevent="submitPost"
            class="
              w-[150px]
              h-[45px]
              bg-yellow-700
              mt-7
              rounded-md
              p-1
              text-white
            "
          >
            Update Post
          </button>
        </form>

        <div class="my-[30px] border-2 p-2 rounded-md">
          <h2 class="text-lg font-semibold">Preview Post</h2>
          <p class="py-2">Post Title:{{ post.title }}</p>
          <p class="py-2">Post Content:{{ post.content }}</p>
        </div>
      </div>
    </div>
    <div v-if="error && loaded">
      <h2>404 not found</h2>
    </div>
  <div v-if="!loaded">Loading ...</div>
</template>
  
  <script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
import type { Post } from "types/Post";
export default defineComponent({
  inject: ["postsService", "authService"],

  data(): {
    post: Post;
    id: string;
    error: boolean;
    loaded: boolean;
  } {
    return {
      post: {
        title: "",
        content: "",
        sender: "",
      },
      id: this.$route.params.id as string,
      error: false,
      loaded: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async submitPost() {
      await this.postsService.updatePost(
        { ...this.post, sender: this.authStore.user?.email },
        this.authStore.user?.uid,
        this.id
      );
      this.post.title = "";
      this.post.content = "";
      this.$router.push("/")
    },
  },
  async created() {
    try {
      this.post = await this.postsService.getMySinglePost(
        this.authStore.user?.uid,
        this.id
      );
    } catch (err) {
      this.error = true;
    } finally {
      this.loaded = true;
    }
  },
});
</script>
  
  <style>
</style>