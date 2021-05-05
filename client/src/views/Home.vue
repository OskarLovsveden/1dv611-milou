<template>
  <div class="home">
    <h1>Milou Project</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from "../components/LoginForm.vue";

@Options({
  components: {
    LoginForm
  },
})
export default class Home extends Vue {}
</script>
