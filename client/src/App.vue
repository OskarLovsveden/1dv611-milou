<template>
  <div id="app-container">
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
    async mounted() {
      if (cookie.get()) {
        await this.$store.dispatch('checkUser');
      }
  
      this.loading = false;
    }
})

export default class App extends Vue {}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

body {
  margin: 0;
  padding: 0;
  background-image: url("../public/img/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px;
}

#app-container {
  display: flex;
  flex-direction: column;
  background-color: rgba(245, 245, 245, 0.942);
  width: fit-content;
  margin: 0 auto;
  padding: 20px 80px;
  border-radius: 20px;
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
    display: inline-block;
    color: #000;
    text-decoration: none;
    background-color: rgb(253, 253, 253);
    border: none;
    border-radius: 5px;
    padding: 8px;
}

button::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: red;
    transition: width .3s;
}
button:hover::after {
        width: 100%;
}

form input {
  border: none;
  border-radius: 5px;
  background-color: rgb(209, 209, 209);
  padding: 10px;

}

</style>
