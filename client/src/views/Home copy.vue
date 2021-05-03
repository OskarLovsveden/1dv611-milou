<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddWebPage from '../components/Hej.vue';

@Options({
  components: {
    AddWebPage,
  },
})
export default class Home extends Vue {}
</script>
