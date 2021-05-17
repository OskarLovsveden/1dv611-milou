<template>
  <div class="home">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div v-if="isAuthenticated">
        <button @click="logout">Logout</button>
        <h1>{{this.user}}</h1>
        <Profile />
      </div>
      <div v-else>

        <div v-if="!registerUser">
          <h1>Milou Project</h1>
          <h3>Login existing user</h3>
          <LoginForm @logged-in="checkUser" />
          <span>New user? Register </span>
          <a @submit.prevent @click="flipRegisterUser" href="#">here</a>
        </div>
        
        <div v-else>
          <h1>Milou Project</h1>
          <h3>Register new user</h3>
          <RegisterForm @logged-in="checkUser" />
          <span>Already registered? Login </span>
          <a @submit.prevent @click="flipRegisterUser" href="#">here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import Profile from '../components/Profile.vue';

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();

import Cookie from '../helpers/Cookie';
const cookie = new Cookie('token');

@Options({
    components: {
        LoginForm,
        Profile,
        RegisterForm,
    },
    data() {
        return {
            user: '',
            loading: true,
            isAuthenticated: false,
            registerUser: false
        };
    },
    methods: {
        async checkUser() {
            const response = await axios.post('/auth/authenticate');
            this.user = response?.data?.authenticatedUser;
            this.isAuthenticated = response.status === 200;
        },
        flipIsAuthenticated() {
            this.isAuthenticated = !this.isAuthenticated;
        },
        flipRegisterUser() {
            this.registerUser = !this.registerUser;
        },
        logout() {
            cookie.delete();
            this.flipIsAuthenticated();
        }
    },
    async mounted() {
        if (cookie.get()) {
            await this.checkUser();
        }
    
        this.loading = false;
    }
})
export default class Home extends Vue {}
</script>
