<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/Sidebar.vue";
import { getAuth } from "@firebase/auth";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useAuthStore } from "./stores/auth";
import Sidebar from "./components/Sidebar.vue";
export default defineComponent({
    inject: ["authService"],
    computed: { ...mapStores(useAuthStore) },
    created() {
        // get user from cookie
        try {
            let user = this.authService.getUserFromCookie();
            this.authStore.login(user);
        }
        catch (err) {
            console.log(err);
            // user is not logged in
            this.authStore.logout();
        }
    },
    components: { Sidebar }
});
</script>

<template>
  <div class="flex ">
     <Sidebar />
     <!-- <div class="ml-[100px]"> -->
        <RouterView/>
     <!-- </div> -->
   
  </div>
</template>

<style scoped>
</style>
