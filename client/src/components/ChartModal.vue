<template>
  <div class="modal">

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {
    }
  }
})

export default class ChartModal extends Vue {}
</script>

<style scoped>
  .modal {
    position: absolute;
    width: 100px; 
    height: 100px;
    top: 50%;
    left: 50%;
    background: blue;
  }
</style>