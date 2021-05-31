<template>
  <div id="loader-container">
    <h3>Loading...</h3>
    <p>This may take up to one minute</p>
    <div id="loader"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class LoadingSpinner extends Vue {}
</script>

<style scoped>
#loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>