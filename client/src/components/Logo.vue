<template>
  <div id="logo-container">
    <img src="../../public/img/logo.png" alt="" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Logo extends Vue {}
</script>

<style scoped>
#logo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  width: 150px;
  height: 150px;
}
</style>