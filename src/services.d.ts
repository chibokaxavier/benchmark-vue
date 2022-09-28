import Vue from "vue";
import { PostsService } from "./../service/posts.service";
import { AuthService } from "./service/auth.service";
import { Cookies } from './../types/Cookies';
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    postsService: PostsService;
    authService: AuthService;
  }
  interface App {
    $cookies: Cookies;
  }
}
