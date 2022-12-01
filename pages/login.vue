<template>
  <div class="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 flex flex-col justify-center items-center h-screen w-screen">
    <!-- <h1 class="text-5xl my-8">Welcome to <span class="p-2 bg-blue-500 text-white font-bold">Action Point</span>!</h1> -->
    <img class="w-72 mb-12" src="~/assets/logo.png" alt="ActionPoint">
          
      
      <input type="text" v-model="username" placeholder="Username" class="m-2 px-4 border-none focus:ring-0 rounded-full" v-on:keyup.enter="attemptAuth({username: username, password: password})">
      <input type="password" v-model="password" placeholder="Password" class="m-2 px-4 border-none focus:ring-0 rounded-full" v-on:keyup.enter="attemptAuth({username: username, password: password})">
      <span v-if="errorStatus == 401" class="text-red-500 font-bold">Incorrect credentials.</span>
      <button @click="attemptAuth({username: username, password: password})" class="cursor-pointer bg-blue-500 text-white font-bold px-8 py-2 mx-2 mt-8 rounded-full">Login</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    ...mapActions({
      attemptAuth: 'auth/login'
    })
  },
  computed: {
    ...mapGetters({
      errorStatus: 'auth/errorStatus'
    })
  }
}
</script>

<style>

</style>