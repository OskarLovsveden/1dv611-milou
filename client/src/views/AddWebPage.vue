<template>
  <div class="addwebpage">
    <h1>Add web page</h1>
    <Hej title="iohasdjh"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Hej from "../components/Hej.vue"

@Options({
  components: {
    Hej
  },
})
export default class AddWebPage extends Vue {}
</script>
