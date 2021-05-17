<template>
  <div class="login">
    <form @submit.prevent="submitForm" autocomplete='off'>
      <div class="form-group">
        <input placeholder="E-mail" type="email" id="username" name="username" autocomplete="on" v-model="form.username" required>
      </div>

      <div class="form-group">
        <input placeholder="Password" type="password" id="password" name="password" autocomplete="off" v-model="form.password" required>
      </div>

      <div class="form-group">
        <input placeholder="Repeat Password" type="password" id="passwordRepeat" name="passwordRepeat" autocomplete="off" v-model="form.passwordRepeat" required>
      </div>

      <button type="submit">Register</button>
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
 
@Options({
    methods: {
        async submitForm() {
            if(this.form.password === this.form.passwordRepeat){
                await this.registerUser();
          
            } else {
                const message = 'Password and repeated password do not match';
                if (this.errors.indexOf(message) === -1) this.errors.push(message);
            }
        },
        async registerUser() {
            const response = await axios.post('/users', {
                email: this.form.username,
                password: this.form.password
            });
      
            if(response.status === 400){
                if(this.errors.indexOf(response.data.message.detail) === -1) this.errors.push(response.data.message.detail);
            }

            if(response.status === 201){
                this.login();
            }

        },
        async login() {
            const response = await axios.post('/auth/login',{
                email: this.form.username,
                password: this.form.password
            });

            if (response.status === 200) {
                this.setCookie('token', response.data.token);
                this.$emit('logged-in');
            }
        },
        setCookie(cname: string, cvalue: string) {
            const d: Date = new Date();
            d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
            const expires: string = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + ';' + expires + ';secure;samesite=lax;';
        }
    },
    data() {
        return {
            form: 
        {
            username: null,
            password: null,
            passwordRepeat: null
        },
            errors: []
        };
    }
})
export default class RegisterForm extends Vue {}
</script>
