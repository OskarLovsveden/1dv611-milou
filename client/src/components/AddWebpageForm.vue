<template>
  <div>
    <form v-on:submit.prevent>
        <input type="text" v-model="url" :placeholder="placeholder" required>
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
      placeholder: 'enter an URL...',
      url: '',
      interval: ''
    }
  },
  methods: {
    async submitUrl(){
      // console.log(this.value, typeof this.interval, 'hej')
      await axios.post('/pages', {address: this.url, testInterval: this.interval})
    } 
  }
})

export default class AddWebpageForm extends Vue {}
</script>
