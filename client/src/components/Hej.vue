<template>
    <div>
        <h2>Component</h2>
        <p>{{title}}</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props:{
      title: {
          type: String,
          required: true
      }
  }
})
export default class Hej extends Vue {}
</script>