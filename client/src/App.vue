<template>
  <div>
    <Logo />
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <Home />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from './components/Home.vue';
import Logo from './components/Logo.vue';

import Cookie from './helpers/Cookie';
const cookie = new Cookie('token');

@Options({
    components: {
        Home,
        Logo
    },
    data() {
        return {
            loading: true,
            registerUser: false
        };
    },
    methods: {
      async checkUser() {
        await this.$store.dispatch('checkUser');
      }
    },
    async mounted() {
      if (cookie.get()) {
        await this.checkUser();
      }
  
      this.loading = false;
    }
})

export default class App extends Vue {}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  color: white;
  background-color: #00ccff;
  border-radius: 10px;
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0);
  box-shadow: 2px 2px 5px 5px rgba(22, 21, 21, 0.05);
}

button:hover {
  background-color: #00a2ca;
  border-radius: 10px;
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0);
  box-shadow: 2px 2px 5px 5px rgba(22, 21, 21, 0.05);
  transition: 0.3s background-color;
}


</style>
