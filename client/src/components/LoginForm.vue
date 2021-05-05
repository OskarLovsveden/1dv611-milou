<template>
  <div class="login">
    <form @submit.prevent="submitForm" autocomplete='off'>
    <h3>Login</h3>
      <div class="form-group">
        <label for="username">Username: </label>
        <input type="text" id="username" name="username" v-model="form.username" required>
      </div>

      <div class="form-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" v-model="form.password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from "axios"

@Options({
  methods: {
    async submitForm() {
      try {
        this.login()
        this.$emit('logged-in')
      } catch (error) {
        console.log(error, "error")
      }
    },
    async login() {
      const response = await axios("/auth/login",{
        method: 'POST',
        data: {
          email: this.form.username,
          password: this.form.password
        }
      })

      localStorage.user = response.data.token
    }
  },
  data() {
    return {
      form: 
        {
          username: null,
          password: null
        },

    };
  }
})
export default class Home extends Vue {}
</script>
