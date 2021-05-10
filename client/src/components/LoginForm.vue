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
    submitForm() {
      try {
        this.login()
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

      if (response.status === 200) {
        this.setCookie('token', response.data.token)
        this.$emit('logged-in')
      }
    },
    setCookie(cname: string, cvalue: string) {
      const d: Date = new Date();
      d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
      const expires: string = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";secure;samesite=lax;";
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
