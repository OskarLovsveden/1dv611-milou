<template>
  <div class="addwebpage">
    <AddWebpageForm @added-page="getPages" />
    <DomainSelector :pages="pages" />
    <PageList :pages="pages" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DomainSelector from "../components/DomainSelector.vue";
import AddWebpageForm from "../components/AddWebpageForm.vue";
import PageList from "../components/PageList.vue";

import AxiosHelper from "../helpers/AxiosHelper"
const axios = new AxiosHelper();

@Options({
  components: {
    DomainSelector,
    AddWebpageForm,
    PageList
  },
  data() {
    return {
      pages: []
    }
  },
  methods: {
    async getPages() {
      const response = await axios.get('/pages')
      this.pages = response.data
    }
  },
  mounted() {
    this.getPages()
  }
})

export default class Profile extends Vue {}
</script>
