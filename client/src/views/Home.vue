<template>
  <div class="home">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div v-if="isAuthenticated">
        <button @click="logout">Logout</button>
        <Profile />
      </div>
      <div v-else>
        <h1>Milou Project</h1>
        <LoginForm @logged-in="flipIsAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from "../components/LoginForm.vue";
import Profile from "../components/Profile.vue";
import axios from 'axios';


@Options({
  components: {
    LoginForm,
    Profile,
  },
  data() {
    return {
      loading: true,
      isAuthenticated: false
    }
  },
  methods: {
    async checkUser() {
      try {
          const cookieValue = document?.cookie?.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1]
          const response = await axios("/auth/authenticate", {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + cookieValue
            }
          })
          
          this.isAuthenticated = response.status === 200;
      } catch (error) {
        console.log(error)
      }
    },
    flipIsAuthenticated() {
      this.isAuthenticated = !this.isAuthenticated
    },
    logout() {
      localStorage.removeItem("user")
      this.flipIsAuthenticated()
    }
  },
  async mounted() {
    await this.checkUser()
    this.loading = false;
  }
})
export default class Home extends Vue {}
</script>
