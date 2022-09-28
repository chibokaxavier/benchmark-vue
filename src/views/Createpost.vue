<template>
  <div class="w-[84.5%] pt-[10px]">
    <div class="px-[21%]" v-if="!loading">
      <h1 class="font-bold text-3xl">Add a new Post</h1>
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
        <img :src="image" alt="" class="w-[100px] h-[100px] mt-10" />
        <input
          type="file"
          @change="onFileSelected"
          accept="image/*"
          class="hidden"
          ref="fileInput"
        />
        <button
          class="
            w-[100px]
            h-[35px]
            bg-gray-700
            mt-7
            rounded-md
            p-1
            text-white
            mr-4
          "
          @click.prevent="($refs.fileInput as HTMLInputElement).click()"
        >
          Select Image
        </button>
        <button
          v-on:click.prevent="submitPost"
          class="
            w-[100px]
            h-[35px]
            bg-yellow-700
            mt-7
            rounded-md
            p-1
            text-white
          "
        >
          Add Post
        </button>
      </form>

      <div class="my-[30px] border-2 p-2 rounded-md">
        <h2 class="text-lg font-semibold">Preview Post</h2>
        <p class="py-2">Post Title:{{ post.title }}</p>
        <p class="py-2">Post Content:{{ post.content }}</p>
      </div>
    </div>
    <div v-if="loading">
      <div class="flex justify-center">
        <!-- <img src="../../download.png" alt="" class="w-[30%] h-[30%]"> -->
      </div>
      <div class="flex justify-center">
        <p class="text-[60px] font-sans">LOADING !</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
import { app } from "../../firebase";
export default defineComponent({
  inject: ["postsService", "authService"],

  data(): {
    post: {
      title: string;
      content: string;
    };
    auth: any;
    selectedFile: any;
    image: string;
    rawFile: File | null;
    loading: boolean;
  } {
    return {
      post: {
        title: "",
        content: "",
      },
      auth: "",
      selectedFile: null,
      image: "",
      rawFile: null,
      loading: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async submitPost() {
      this.loading = true;
      await this.postsService.addPosts(
        {
          ...this.post,
          sender: this.authStore.user?.email,
          uid: this.authStore.user?.uid,
        },
        this.authStore.user?.uid,
        this.rawFile
      );
      this.post.title = "";
      this.post.content = "";
      setTimeout(() => this.$router.push("/"));
    },
    onFileSelected(e: any) {
      // this.selectedFile= e.target.files[0]
      const file: File = e.target.files[0];
      this.image = URL.createObjectURL(file);
      this.rawFile = file;
    },
  },
  created() {},
});
</script>

<style>
</style>