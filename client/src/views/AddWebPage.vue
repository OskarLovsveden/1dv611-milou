<template>
  <div class="addwebpage">
    <h1>Add web page</h1>
    <AddWebpageForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddWebpageForm from "../components/AddWebpageForm.vue"

@Options({
  components: {
    AddWebpageForm
  },
})
export default class AddWebPage extends Vue {}
</script>
