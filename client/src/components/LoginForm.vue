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
  components: {
  },
  methods: {
    async submitForm() {
      try {
        if(await this.usernameAndPasswordIsValid) return true
      } catch (error) {
        console.log(error, "error")
      }
    }
  },
  computed: {
    async usernameAndPasswordIsValid() {
      return await axios.post("/auth/login",{
          email: this.form.username,
          password: this.form.password
      })
      .then((response)=>{
        localStorage.user = response.data.token
      })
      .catch(()=> {
        throw new Error("Invalid email or password")
      })
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
