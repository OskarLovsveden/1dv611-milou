<template>
  <div id="direct-measure">
    <form @submit.prevent="submitForm" autocomplete='on'>
      <div class="form-group">
        <input placeholder="http://example.com" type="url" name="url" autocomplete="on" v-model="form.url" required>
      </div>
      <button type="submit">Measure page</button>

    </form>
      <div v-if="loader" id="loader"></div>
      <div v-if="measureResult" id="result">
        <div v-for="(item, index) in measureResult" :key="index">
          <p>Total score: {{item.totalScore}}</p>
          <div v-for="(category, index) in item.categories" :key="index">
            <p>{{category.id}}</p>
            <p>Score: {{category.score}}</p>
          </div>
        </div>
      </div>
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
        this.loader = true;
        const result = await axios.post("/gpsi/measure", { addresses: [this.form.url] })
        if (result) {
          this.loader = false
          this.measureResult = await result.data
        }
        
      },
    },
    data() {
    return {
      loader: false,
      measureResutl: null,
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
  }

  form {
    display: flex;
    flex-direction: row;
  }

  form input {
    margin-right: 10px;
  }
/* 
  #result {
    display: flex;
    position: absolute;
    top: 0%;
    left: 0;
    width: 400px;
    height: 800px;
  } */

  #loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>
