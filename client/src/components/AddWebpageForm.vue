<template>
  <div>
    <form>
      <p>
        <input type="text" v-model="value" :placeholder="placeholder">
        <button @click="submitUrl" type="submit">Register URL</button>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {
      placeholder: 'enter an URL...',
      value: ''
    }
  }
})

export default class AddWebpageForm extends Vue {}
</script>
