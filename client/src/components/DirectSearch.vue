<template>
  <div id="direct-measure">
    <form @submit.prevent="submitForm" autocomplete='on'>
      <div class="form-group">
        <input placeholder="http://example.com" type="url" name="url" autocomplete="on" v-model="form.url" required>
      </div>
      <button type="submit">Measure page</button>
    </form>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper()

@Options({
    components: {
    },
    methods: {
      async submitForm() {
        console.log(this.form.url)
        // axios.get("/pages")
      },
    },
    data() {
    return {
      form: 
        {
          url: null,
        },
        errors: []
    };
  }
})

export default class DirectSearch extends Vue {}
</script>

<style scoped>

  #direct-measure{
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }

  form {
    display: flex;
    flex-direction: row;
  }

  form input {
    margin-right: 10px;
  }

</style>