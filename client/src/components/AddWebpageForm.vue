<template>
  <div>
    <form v-on:submit.prevent>
        <input type="url" v-model="url" :placeholder="placeholder" required>
        <button @click="submitUrl" type="submit">Register URL</button>
        <br/>
        <span>Test interval: </span>
        <input type="radio" name="interval" value="Daily" v-model="interval" required>
        <label for="daily">Daily</label>
        <input type="radio" name="interval" value="Weekly" v-model="interval">
        <label for="weekly">Weekly</label>
        <input type="radio" name="interval" value="Monthly" v-model="interval">
        <label for="monthly">Monthly</label>
    </form>
    <hr>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper()

@Options({
  data() {
    return {
      placeholder: 'http://example.com',
      url: '',
      interval: ''
    }
  },
  methods: {
    async submitUrl(){
      // console.log(new URL(this.url))

      if(this.interval){
        await axios.post('/pages', {address: this.url, testInterval: this.interval})
        this.url = ""
        this.$emit('added-page')
      }
    } 
  }
})

export default class AddWebpageForm extends Vue {}
</script>
