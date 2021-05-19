<template>
  <div class="login">
    <form @submit.prevent="login" autocomplete='off'>
      <div class="form-group">
        <input placeholder="E-mail" type="text" id="username" name="username" autocomplete="on" v-model="form.username" required>
      </div>

      <div class="form-group">
        <input placeholder="Password" type="password" id="password" name="password" autocomplete="off" v-model="form.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errors">
      <div v-for="(error, index) in errors" :key="index">
        <p>{{error}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();

import Cookie from '../helpers/Cookie';
const cookie = new Cookie('token');

@Options({
    methods: {
        async login() {
          try {
            const response = await axios.post('/auth/login', {
                email: this.form.username,
                password: this.form.password
            });
            this.$toast.success('Logged in!');
            cookie.set(response.data.token);
            await this.$store.dispatch('checkUser');
            
          } catch (error) {
             if (this.errors.indexOf(error.message) === -1) this.errors.push(error.message);
          }

        }
    },
    data() {
        return {
            form: 
        {
            username: null,
            password: null
        },
            errors: []
        };
    }
})
export default class LoginForm extends Vue {}
</script>

<style scoped>
  form input,
  form button{
    margin-bottom: 10px;
  }
</style>