<template>
  <div class="home">
    <div v-if="isAuthenticated">
      <button @click="logout">Logout</button>
      <h1>{{ getUserEmail }}</h1>
      <Profile />
    </div>
    <div v-else>
      <div v-if="!registerUser">
        <h3>Login existing user</h3>
        <LoginForm />
        <span>New user? Register </span>
        <a @submit.prevent @click="flipRegisterUser" href="#">here</a>
      </div>
      <div v-else>
        <h3>Register new user</h3>
        <RegisterForm />
        <span>Already registered? Login </span>
        <a @submit.prevent @click="flipRegisterUser" href="#">here</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import LoginForm from "../components/forms/LoginForm.vue";
import RegisterForm from "../components/forms/RegisterForm.vue";
import Profile from "../components/Profile.vue";

import Cookie from "../helpers/Cookie";
const cookie = new Cookie("token");

@Options({
  components: {
    LoginForm,
    Profile,
    RegisterForm,
  },
  data() {
    return {
      registerUser: false,
    };
  },
  methods: {
    flipRegisterUser() {
      this.registerUser = !this.registerUser;
    },
    logout() {
      this.$toast.success("Logged out");
      cookie.delete();
      this.$store.commit("FLIP_IS_AUTHENTICATED");
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
    getUserEmail() {
      return this.$store.state.user.email;
    },
  },
})
export default class Home extends Vue {}
</script>
