<template>
  <div class="addwebpage">
    <h1>person@email.com</h1>

    <AddWebpageForm />
    <form>
      <select>
        <option>google.se</option>
        <option>facebook.se</option>
      </select>
    </form>
    <PageList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddWebpageForm from "../components/AddWebpageForm.vue";
import PageList from "../components/PageList.vue";

@Options({
  components: {
    AddWebpageForm,
    PageList
  },
  methods: {
    
  }
})

export default class Profile extends Vue {}
</script>
